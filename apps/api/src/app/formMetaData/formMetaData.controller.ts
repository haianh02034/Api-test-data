import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Delete,
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


  @Patch(':name/edit')
  @UseGuards(JwtAuthGuard)
  async edit(
    @Req() { user },
    @Param('name') name: string,
    @Body() updatedFormData: FormMetaDataDtos.Edit,
  ) {
    try {
      // Find the existing form metadata by name
      const formMetadata = await this.repo.findOneByOrFail({
        where: { name },
      });

      // Update the existing data with new values
      const updatedFormMetadata = Object.assign(formMetadata, updatedFormData);
      const result = await this.repo.save(updatedFormMetadata);

      return {
        successfully: true,
        data: updatedFormMetadata,
      };
    } catch (error) {
      return {
        successfully: false,
        error: 'Error occurred while updating form metadata.',
      };
    }
  }

  @Delete(':name/delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() { user }, @Param('name') name: string) {
    try {
      // Find the form metadata by name
      const formMetadata = await this.repo.findOneByOrFail({
        where: { name },
      });

      // Remove the form metadata
      const result = await this.repo.remove(formMetadata);

      if (!result) {
        return {
          successfully: false,
          message: 'Form metadata not found for deletion.',
        };
      }

      return {
        successfully: true,
        message: 'Form metadata deleted successfully.',
      };
    } catch (error) {
      return {
        successfully: false,
        error: 'Error occurred while deleting form metadata.',
      };
    }
  }

}
