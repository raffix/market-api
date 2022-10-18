import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    const product = this.productService.findOne(id);
    if (product) return product;

    throw new HttpException('product does not exist', 404);
  }
}
