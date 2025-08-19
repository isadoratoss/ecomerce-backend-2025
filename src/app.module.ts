import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-sa-east-1.pooler.supabase.com',
      port: +'6543',
      username: 'postgres.lcpgjklkizklkpuboyja',
      password: 'PRM_2025',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    BrandModule,
  ],
})
export class AppModule {}
