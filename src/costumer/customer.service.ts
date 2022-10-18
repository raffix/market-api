import { Injectable } from "@nestjs/common";
import { Customer } from "./customer.interface";

@Injectable()
export class CustomerService {
  private readonly customers: Customer[] = [
    {id: 1, name: 'Liam', age: 33},
    {id: 2, name: 'Noah', age: 27},
    {id: 3, name: 'Oliver', age: 22},
    {id: 4, name: 'Elijah', age: 29},
    {id: 5, name: 'Olivia', age: 31},
    {id: 6, name: 'Emma', age: 45},
    {id: 7, name: 'Charlotte', age: 47},
    {id: 8, name: 'Amelia', age: 60}
  ];

  findOne(id: number) {
    return this.customers.find( customer => {
      return customer.id === id
    });
  }
}