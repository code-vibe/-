import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    logger.log('Creating NestJS application...');
    const app = await NestFactory.create(AppModule);

    logger.log('Setting up CORS...');
    app.enableCors({
      origin: true,
      credentials: true,
    });

    logger.log('Setting up global validation pipe...');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    logger.log('Setting up Swagger documentation...');
    const config = new DocumentBuilder()
      .setTitle('Autochek Vehicle Valuation & Financing API')
      .setDescription('Backend API for vehicle data ingestion, valuation, and loan processing services')
      .setVersion('1.0.0')
      .addTag('health', 'Application health monitoring')
      .addTag('vehicles', 'Vehicle data management')
      .build();
      
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    logger.log('Setting up global prefix...');
    app.setGlobalPrefix('api/v1');

    const port = process.env.PORT || 3001;
    
    logger.log('Starting server...');
    await app.listen(port);

    logger.log('Autochek Backend API running successfully!');
    logger.log(`Main API: http://localhost:${port}/api/v1`);
    logger.log(`API Documentation: http://localhost:${port}/api/docs`);
    logger.log(` Health Check: http://localhost:${port}/api/v1/health`);
    
  } catch (error) {
    logger.error(' Failed to start application:', error.message);
    logger.error(error.stack);
    process.exit(1);
  }
}

bootstrap();
