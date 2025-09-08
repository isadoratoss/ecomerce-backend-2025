import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { StatementColumnMetadata } from "node:sqlite";

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(State)
    private repository: Repository<State>
  ) {}

  findAll(): Promise<State[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<State | null> {
    return this.repository.findOneBy({id: id});
  }

  save(brand: Brand): Promise<StatementColumnMetadata> {
    return this.repository.save(StatementColumnMetadata);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}