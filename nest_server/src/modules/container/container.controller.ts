import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContainerService } from './container.service';
import { Container } from './schema/container.schema';

@Controller('container')
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Post()
  async createContainer(@Body() containerData: any): Promise<Container> {
    return this.containerService.createContainer(containerData);
  }

  @Get()
  async getAllContainers(): Promise<Container[]> {
    return this.containerService.getAllContainers();
  }

  @Get(':code')
  async getContainerByCode(@Param('code') code: string) {
    return this.containerService.getContainerByCode(code);
  }


  @Patch(':code/products')
  async addProduct(
      @Param('code') code: string,
      @Body() productData: { code: string; volume: number; ammount: number }
  ): Promise<Container> {
      return this.containerService.addProductToContainer(code, productData);
  }


}
