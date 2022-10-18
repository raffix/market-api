import { Injectable } from '@nestjs/common';

@Injectable()
export class MultipleService {
  private readonly BASE_URL = 'http://localhost:3000';

  async find(query: string) {
    const response = await fetch(this.BASE_URL + query, { method: 'GET' });
    return response.json();
  }
}
