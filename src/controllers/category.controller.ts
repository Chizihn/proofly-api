import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { PaginationDto } from '../dto/pagination.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(
    @Query() pagination: PaginationDto,
    @Query() filters: any,
  ) {
    return this.categoryService.findAll(pagination, filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  async create(@Body() createCategoryDto: any) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: any,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
