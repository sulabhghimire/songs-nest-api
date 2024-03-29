import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('BootStrap')

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const PORT = 3000;
  await app.listen(PORT);

  logger.log(`The backend service is running at PORT:${PORT}.`);
}
bootstrap();
