console.log('Starting basic test...');

try {
  console.log('Node.js is working');
  console.log('  TypeScript compilation is working');
  
  // Test basic import
  import('reflect-metadata').then(() => {
    console.log('  reflect-metadata imported');
    
    import('@nestjs/core').then(({ NestFactory }) => {
      console.log('  NestJS Core imported');
      
      import('./app.module').then(({ AppModule }) => {
        console.log('  AppModule imported');
        
        NestFactory.create(AppModule).then((app) => {
          console.log('  NestJS app created successfully');
          
          app.setGlobalPrefix('api/v1');
          
          app.listen(3000).then(() => {
            console.log('   Server started on http://localhost:3000');
          }).catch((error) => {
            console.error('   Error starting server:', error.message);
          });
          
        }).catch((error) => {
          console.error('   Error creating app:', error.message);
          console.error(error.stack);
        });
        
      }).catch((error) => {
        console.error('   Error importing AppModule:', error.message);
      });
      
    }).catch((error) => {
      console.error('   Error importing NestJS:', error.message);
    });
    
  }).catch((error) => {
    console.error('   Error importing reflect-metadata:', error.message);
  });
  
} catch (error) {
  console.error('   Synchronous error:', error.message);
}
