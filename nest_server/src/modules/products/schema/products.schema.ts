import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  stock: number;

  @Prop()
  import_cost: number;

  @Prop()
  category: string;

  @Prop([String])
  keywords: string[];

  @Prop([String])
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
