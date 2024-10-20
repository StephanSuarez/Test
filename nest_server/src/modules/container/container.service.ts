
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Container } from './schema/container.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ContainerService {
  constructor(@InjectModel(Container.name) private containerModel: Model<Container>) {}

  async createContainer(containerData: any): Promise<Container> {
    const createdContainer = new this.containerModel(containerData);
    return createdContainer.save();
  }

  async getAllContainers(): Promise<Container[]> {
    return this.containerModel.find().exec();
  }

  async getContainerByCode(code: string): Promise<Container> {
    return this.containerModel.findOne({ code }).exec();
  }


  async addProductToContainer(containerCode: string, productData: { code: string; volume: number; ammount: number }) {
    const contenedor = await this.containerModel.findOne({ code: containerCode });
  
    if (!contenedor) {
      throw new NotFoundException(`Container with code ${containerCode} not found.`);
    }
  
    // Check if there's enough space in the container
    const newCurrentVolume = contenedor.currentVolume + productData.volume;
    if (newCurrentVolume > contenedor.maxVolume) {
      throw new Error('Not enough space in the container to add this product.');
    }
  
    // Add the product to the container
    contenedor.products.push({
      code: productData.code,
      volume: productData.volume,
      ammount: productData.ammount
    });
  
    // Update the current volume
    contenedor.currentVolume = newCurrentVolume;
    contenedor.markModified('products');
    try {
      // Save the updated container
      await contenedor.save();
    } catch (error) {
      // Handle any errors during saving
      console.error('Error saving container:', error);
      throw error; // Re-throw the error for further handling
    }
  
    // Return the updated container
    return contenedor;
  }

}
