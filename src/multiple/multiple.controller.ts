import { Controller, Get, Query } from "@nestjs/common";
import { MultipleService } from "./multiple.service";

@Controller('multiple')
export class MultipleController {
  constructor(private multipleService: MultipleService) {}

  @Get()
  async show(@Query() query) {
    const responseData: any = {};
    for(const [key, url] of Object.entries(query)) {
      if(typeof url === 'string' && (url.includes('/products/') || url.includes('/customers/'))) {
        responseData[key] = await this.multipleService.find(url).then((responseApi) => {
          return responseApi;
        });
      }
    }

    return responseData;
  }
}