import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Container extends Document {
  @Prop({ required: true, unique: true })
  code: string; // Código único para el contenedor

  @Prop({ required: true })
  name: string; // Nombre del contenedor

  @Prop({ required: true })
  length: number; // Largo en cm

  @Prop({ required: true })
  width: number; // Ancho en cm

  @Prop({ required: true })
  height: number; // Alto en cm

  @Prop({ required: true })
  maxVolume: number; 

  @Prop({ type: Array, default: [] })
  products: { 
    code: string;
    volume: number; 
    ammount: number; 
  }[];

  @Prop({ default: 0 })
  currentVolume: number; 
}

export const ContainerSchema = SchemaFactory.createForClass(Container);
