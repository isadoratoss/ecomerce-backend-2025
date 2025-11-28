import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { CustomerModule } from './cases/customers/customer.module';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './cases/cities/city.module';
import { ProductModule } from './cases/produtcs/product.module';
import { SeedService } from './seed/seed.service';
import { SeedModule } from './seed/seed.module';
import { SupabaseModule } from './cases/lib/supabase/supabase.module';
import { AuthModule } from './cases/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  ssl: {
    rejectUnauthorized: false,
  },

  extra: {
    max: 1, // PgBouncer exige conexões leves
  },

  autoLoadEntities: true,
  synchronize: true,
}),

    CategoryModule,
    BrandModule,
    ProductModule,
    CityModule,
    CustomerModule,
    SeedModule,

    SupabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
