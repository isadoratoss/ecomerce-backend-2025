import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Brand } from "../../brands/brand.entity";
import { Category } from "../../categories/category.entity";
import { Product } from "./product.entity";

@Entity('product-photo')
export class ProductPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  path: string;

  @ManyToOne(() => Product)
  product: Product;
}