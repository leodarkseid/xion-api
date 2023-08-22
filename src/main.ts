import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 4000);

  const corsOptions = {
    origin: '*',
    methods: 'GET',
    preflightContinue: false,
    
  };
  app.enableCors(corsOptions);
}
bootstrap();
