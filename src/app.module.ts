import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerModule } from './costumer/customer.module';
import { MultipleModule } from './multiple/multiple.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CustomerModule, HttpModule, MultipleModule, ProductModule],
})
export class AppModule {}
