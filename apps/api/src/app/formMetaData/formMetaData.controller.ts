import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@guards';
import {  FormMetaDataDtos, PaginateDto } from '@dtos';
import { FormMetadataRepoInterface } from '@repositories';
import { Roles, pagination, repo } from '@nest-utils';
import { plainClass } from '@nest-utils';
import { FormMetadata } from '@entity';

@Controller('form_metadata')
@UseGuards(JwtAuthGuard) // Bảo vệ các yêu cầu bằng JWT
export class FormMetaDataController {
  constructor(
    @Inject(repo(FormMetadata)) private readonly repo: FormMetadataRepoInterface
  ) {}

  @Get()
  async index(
    @Req() req, 
    @Query() paginate: PaginateDto, 
    @Query() filters: any
  ) {
    try {
      // Lọc dữ liệu dựa trên các filter (nếu có)
      const where = this.repo.findWhere(filters);

      // Paginate dữ liệu
      const [items, total] = await this.repo.paginate(paginate, { where });

      // Chuyển các entity thành DTO
      const formDataDtos = plainClass(FormMetaDataDtos.FormMetadataDto, items);
      
      // Trả về kết quả phân trang
      return {
        paginate: pagination(formDataDtos, total, paginate.page, paginate.perPage),
      };
    } catch (error) {
      throw new BadRequestException('Lỗi khi lấy dữ liệu');
    }
  }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async add(@Req() { user }, @Body() inputs: FormMetaDataDtos.Create) {
    try {
      // Create a new FormMetadata entry using the repository
      const formMetadata = await this.repo.createOrFail({
        ...inputs,
      });

      // Format the response with the created entry and user details
      return {
        formMetadata: plainClass(FormMetaDataDtos.FormMetadataDto, { ...formMetadata, User: user, ReqUser: user }),
      };
    } catch (error) {
      throw new BadRequestException('Error creating form metadata');
    }
  }

}
