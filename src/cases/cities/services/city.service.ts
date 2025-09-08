import { Repository } from "typeorm";
import { City } from "src/cities/entities/city.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Brand } from "src/cases/brands/brand.entity";

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(City)
    private repository: Repository<City>
  ) {}

  findAll(): Promise<City[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<City | null> {
    return this.repository.findOneBy({id: id});
  }

  save(City: City): Promise<Brand> {
    return this.repository.save(city);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}