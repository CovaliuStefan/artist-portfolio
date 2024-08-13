import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify which methods are allowed
    credentials: true, // Allow cookies to be sent
  };

  app.enableCors(corsOptions);

  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST || 'localhost';

  app.setGlobalPrefix('api');

  await app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}
bootstrap();
