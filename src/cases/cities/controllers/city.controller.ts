import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { City } from "src/cities/entities/city.entity";
import { CityService } from "src/cities/services/city.service";

@Controller('citys')
export class BrandController {

  constructor(private readonly service: CityService) {}

  @Get()
  findAll(): Promise<City []> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<City > {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return found;
  }
 
  @Post()
  create(@Body() : City) : Promise<City> {
    return this.service.save(city);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() city : City): Promise<City> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    city.id = id;

    return this.service.save(city);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return this.service.remove(id);
  }
}

