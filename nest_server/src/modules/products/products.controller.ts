import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schema/products.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get('search')
  async searchByKeyword(@Query('keyword') keyword: string): Promise<Product[]> {
    return this.productsService.searchByKeyword(keyword);
  }

  @Get('searchByCode')
  async searchByCode(@Query('code') code: string): Promise<Product[]> {
    return this.productsService.searchByCode(code);
  }
}
