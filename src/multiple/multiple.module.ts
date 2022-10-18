import { Module } from "@nestjs/common";
import { MultipleController } from "./multiple.controller";
import { MultipleService } from "./multiple.service";

@Module({
  controllers: [MultipleController],
  providers: [MultipleService]
})

export class MultipleModule {}