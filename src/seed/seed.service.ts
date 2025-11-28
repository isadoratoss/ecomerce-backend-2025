import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../cases/categories/category.entity';
import { Brand } from '../cases/brands/brand.entity';
import { Product } from '../cases/products/product.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  // -----------------------------
  // MÉTODO PRINCIPAL
  // -----------------------------
  async run() {
    console.log('Running seed...');

    await this.seedCategories();
    await this.seedBrands();
    await this.seedProducts();

    console.log('Seed finalizado!');
  }

  // -----------------------------
  // SEED CATEGORIAS
  // -----------------------------
  private async seedCategories() {
    const categories = [
      { name: 'Eletrônicos' },
      { name: 'Moda Feminina' },
      { name: 'Moda Masculina' },
      { name: 'Casa e Cozinha' },
      { name: 'Beleza e Saúde' },
    ];

    for (const c of categories) {
      const exists = await this.categoryRepo.findOne({
        where: { name: c.name },
      });

      if (!exists) {
        await this.categoryRepo.save(c);
      }
    }

    console.log('Categorias criadas!');
  }

  // -----------------------------
  // SEED MARCAS
  // -----------------------------
  private async seedBrands() {
    const brands = [
      { name: 'Apple' },
      { name: 'Samsung' },
      { name: 'Nike' },
      { name: 'Adidas' },
      { name: 'LG' },
    ];

    for (const b of brands) {
      const exists = await this.brandRepo.findOne({
        where: { name: b.name },
      });

      if (!exists) {
        await this.brandRepo.save(b);
      }
    }

    console.log('Marcas criadas!');
  }

  // -----------------------------
  // SEED PRODUTOS
  // -----------------------------
  private async seedProducts() {
    const categories = await this.categoryRepo.find();
    const brands = await this.brandRepo.find();

    if (categories.length === 0 || brands.length === 0) {
      console.error('Crie categorias e marcas antes de rodar produtos.');
      return;
    }

    const products = [
      {
        name: 'iPhone 15',
        price: 5500,
        stock: 10,
        category: categories.find(c => c.name === 'Eletrônicos'),
        brand: brands.find(b => b.name === 'Apple'),
      },
      {
        name: 'Tênis Nike Air',
        price: 499,
        stock: 30,
        category: categories.find(c => c.name === 'Moda Masculina'),
        brand: brands.find(b => b.name === 'Nike'),
      },
      {
        name: 'Geladeira LG Frost Free',
        price: 3100,
        stock: 5,
        category: categories.find(c => c.name === 'Casa e Cozinha'),
        brand: brands.find(b => b.name === 'LG'),
      },
    ];

    for (const p of products) {
      const exists = await this.productRepo.findOne({
        where: { name: p.name },
      });

      if (!exists) {
        await this.productRepo.save(p);
      }
    }

    console.log('Produtos criados!');
  }
}
