import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): object {
    return {
      message: 'Autochek Vehicle Valuation & Financing API is running!',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  getHealth(): object {
    return {
      status: 'healthy',
      services: {
        database: 'connected',
        api: 'running',
      },
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
