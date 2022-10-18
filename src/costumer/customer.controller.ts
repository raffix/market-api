import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Customer } from './customer.interface';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number): Customer {
    const customer = this.customerService.findOne(id);
    if (customer) return customer;

    throw new HttpException('customer does not exist', 404);
  }
}
