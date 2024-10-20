import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/products.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async searchByKeyword(keyword: string): Promise<Product[]> {
    const regex = new RegExp(keyword, 'i'); 
    return this.productModel.find({ keywords: { $regex: regex } }).exec();
  }

  async searchByCode(code: string): Promise<Product[]> {
    return this.productModel.find({ code: code }).exec();
  }
  
}
