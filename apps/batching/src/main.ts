import { NestFactory } from "@nestjs/core";
import { BatchingModule } from "./batching.module";
import { RmqService } from "@app/common";
import { DECISION_SERVICE } from "apps/orders/src/constants/services";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(BatchingModule);
  app.useGlobalPipes(new ValidationPipe());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(DECISION_SERVICE));
  await app.startAllMicroservices();
}
bootstrap();
