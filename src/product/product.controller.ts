import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
}