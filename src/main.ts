import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserAgentMiddleware } from './middleware/userAgent.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(UserAgentMiddleware)
  await app.listen(4000);
}
bootstrap();
