import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(1000);
  console.log('API GATEWAY is running on: http://localhost:1000');
}
bootstrap();
