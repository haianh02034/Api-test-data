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


  @Patch(':form_id/edit')
  @UseGuards(JwtAuthGuard)
  async edit(
    @Req() { user },
    @Param('form_id') form_id: string,
    @Body() updatedFormData: FormDataDtos.Edit,
  ) {
    try {
      // Find the existing form data by form_id
      const formData = await this.repo.findOneByOrFail({
        where: { form_id },
      });

      // Update the existing data with new values
      const updatedFormMetadata = Object.assign(formData, updatedFormData);
      const result = await this.repo.save(updatedFormMetadata);

      return {
        successfully: true,
        data: updatedFormMetadata,
      };
    } catch (error) {
      return {
        successfully: false,
        error: 'Error occurred while updating form data.',
      };
    }
  }

  @Delete(':form_id/delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() { user }, @Param('form_id') form_id: string) {
    try {
      // Find the form data by form_id
      const formData = await this.repo.findOneByOrFail({
        where: { form_id },
      });

      // Remove the form data
      const result = await this.repo.remove(formData);

      if (!result) {
        return {
          successfully: false,
          message: 'Form data not found for deletion.',
        };
      }

      return {
        successfully: true,
        message: 'Form data deleted successfully.',
      };
    } catch (error) {
      return {
        successfully: false,
        error: 'Error occurred while deleting form data.',
      };
    }
  }
}
