"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:4200'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Autochek Vehicle Valuation & Financing API')
        .setDescription('Backend API for vehicle data ingestion, valuation, and loan processing services')
        .setVersion('1.0')
        .addTag('vehicles', 'Vehicle data ingestion and management')
        .addTag('valuations', 'Vehicle valuation services')
        .addTag('loans', 'Loan applications and processing')
        .addTag('offers', 'Loan offers management')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    console.log(`🚀 Autochek Backend API running on: http://localhost:${port}`);
    console.log(`📖 API Documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map