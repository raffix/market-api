import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { MultipleService } from "./multiple.service";

@Controller('multiple')
export class MultipleController {
  constructor(private multipleService: MultipleService) {}

  @Get()
  show(@Query() query) {
    for(let key in query) {
      console.log(key)
      console.log(query[key])
    }
    return query
  }
}