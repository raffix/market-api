import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MultipleController } from "./multiple.controller";
import { MultipleService } from "./multiple.service";

@Module({
  imports: [HttpModule],
  controllers: [MultipleController],
  providers: [MultipleService]
})

export class MultipleModule {}