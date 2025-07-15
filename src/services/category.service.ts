import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(pagination: PaginationDto, filters: any = {}) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    // Apply filters
    if (filters.name) {
      queryBuilder.where('LOWER(category.name) LIKE :name', {
        name: `%${filters.name.toLowerCase()}%`,
      });
    }

    // Add any other filter conditions here
    if (filters.moduleId) {
      queryBuilder.andWhere('category.moduleId = :moduleId', {
        moduleId: filters.moduleId,
      });
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async create(createCategoryDto: any) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async update(id: string, updateCategoryDto: any) {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.categoryRepository.delete(id);
  }
}
