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
import {  FormDataDtos, PaginateDto } from '@dtos';
import { FormDataRepoInterface } from '@repositories';
import { Roles, pagination, repo } from '@nest-utils';
import { plainClass } from '@nest-utils';

@Controller('form_data')
@UseGuards(JwtAuthGuard) // Bảo vệ các yêu cầu bằng JWT
export class FormDataController {
  constructor(
    @Inject(repo(FormData)) private readonly repo: FormDataRepoInterface,
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
      const formDataDtos = plainClass(FormDataDtos.FormDataDto, items);
      
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
  async add(@Req() { user }, @Body() inputs: FormDataDtos.Create) {
    try {
      // Create a new FormMetadata entry using the repository
      const formData = await this.repo.createOrFail({
        ...inputs,
      });

      // Format the response with the created entry and user details
      return {
        formData: plainClass(FormDataDtos.FormDataDto, { ...formData, User: user, ReqUser: user }),
      };
    } catch (error) {
      throw new BadRequestException('Error creating form data');
    }
  }
}
