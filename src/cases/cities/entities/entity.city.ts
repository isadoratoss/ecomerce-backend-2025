import { Column,Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('city')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  name: string;

  @Column('text', {nullable: true})
  ibge: string;

  @Column('decimal', {nullable: false, precision: 10, scale: 2})
  acronym: number;

}