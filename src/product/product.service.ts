import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";

@Injectable()
export class ProductService {
  private readonly products: Product[] = [
    {id: 1, name: 'Mustard', price: 3.50},
    {id: 2, name: 'Ketchup', price: 4.00},
    {id: 3, name: 'Onion', price: 10.00},
    {id: 4, name: 'French fries', price: 10.00},
    {id: 5, name: 'Cheese ball', price: 15.00},
    {id: 6, name: 'Beer lager', price: 12.99},
    {id: 7, name: 'Beer pilsen', price: 10.99},
    {id: 8, name: 'Chocolate', price: 2.00}
  ];

  findOne(id: number) {
    return this.products.find( product => {
      return product.id === id
    });
  }
}