import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { CustomerService } from "./customer.service";

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }
}