import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../cases/categories/category.entity';
import { Product } from '../cases/produtcs/product.entity';
import { Brand } from '../cases/brands/brand.entity';

import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product, Brand]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
