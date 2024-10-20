import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContainerModule } from './modules/container/container.module';

@Module({
  imports: [
    MongooseModule.forRoot(''),
    ProductsModule,
    ContainerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
