import 'reflect-metadata';

async function testApp() {
  try {
    console.log('🔄 Starting Autochek Backend API...');
    
    // Test basic imports
    console.log('✅ Importing NestFactory...');
    const { NestFactory } = await import('@nestjs/core');
    
    console.log('✅ Importing AppModule...');
    const { AppModule } = await import('./app.module');
    
    console.log('✅ Creating application...');
    const app = await NestFactory.create(AppModule);
    
    console.log('✅ Enabling CORS...');
    app.enableCors({
      origin: ['http://localhost:3000', 'http://localhost:4200'],
      credentials: true,
    });
    
    console.log('✅ Setting global prefix...');
    app.setGlobalPrefix('api/v1');
    
    console.log('✅ Starting server...');
    await app.listen(3000);
    
    console.log('🚀 Autochek Backend API running on: http://localhost:3000');
    console.log('📖 API Documentation available at: http://localhost:3000/api/docs');
    
  } catch (error) {
    console.error('❌ Error starting application:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

testApp();
