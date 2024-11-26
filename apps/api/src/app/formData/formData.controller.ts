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
      const where = this.repo.findWhere(filters);
      const [items, total] = await this.repo.paginate(paginate, { where });
      const formDataDtos = plainClass(FormDataDtos.FormDataDto, items);
            return {
        paginate: pagination(formDataDtos, total, paginate.page, paginate.perPage),
      };
    } catch (error) {
      throw new BadRequestException('Lỗi khi lấy dữ liệu');
    }
  }

  @Get(':meta_id/view')
  async view(
    @Param('meta_id') meta_id: string,
    @Query() paginate: PaginateDto  
  ) {
    try {
            const config = await this.repo.findOneBy({ meta_id });
      // console.log('Fetched config:', config);
      if (!config) {
        throw new BadRequestException(`Form metadata with meta_id ${meta_id} not found.`);
      }
      if (!config.data) {
        throw new BadRequestException('Form data is missing.');
      }
      let items = [];
      if (Array.isArray(config.data)) {
        items = config.data;
      } else {
        items.push(config.data);
      }
      // console.log('Raw items before transformation:', items);
      const transformedItems = items.map(item => {
        return {
          _id: config._id ? config._id.toString() : '',  // Handle undefined _id
          form_id: config.form_id ? config.form_id.toString() : '',  // Handle undefined form_id
          meta_id: config.meta_id || '',  // Handle undefined meta_id
          data: item,  // The form data       
        };
      });
      console.log('Transformed form data:', transformedItems);
      const total = transformedItems.length;
      const resultCount = transformedItems.length;
      const paginatedItems = transformedItems.slice((paginate.page - 1) * paginate.perPage, paginate.page * paginate.perPage);
      return {
        paginate: {
          page: paginate.page,
          perPage: paginate.perPage,
          total,
          resultCount,
          items: paginatedItems,  
        },
      };
    } catch (error) {
      console.error('Error occurred while fetching form metadata:', error);
            throw new BadRequestException('Error occurred while fetching form metadata: ' + error.message);
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
