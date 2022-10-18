import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MultipleService {
  private readonly BASE_URL = 'http://localhost:3000';
  constructor(private readonly httpService: HttpService) {}

  async find(query: string): Promise<any> {
    const response = await this.httpService.get(this.BASE_URL+query).toPromise();
    return response.data;
  }
}