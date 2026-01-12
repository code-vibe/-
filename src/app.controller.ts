import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'API is running successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Autochek Vehicle Valuation & Financing API is running!' },
        version: { type: 'string', example: '1.0.0' },
        timestamp: { type: 'string', example: '2024-01-12T10:00:00.000Z' },
      }
    }
  })
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Detailed health check' })
  @ApiResponse({
    status: 200,
    description: 'Detailed health status',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'healthy' },
        services: {
          type: 'object',
          properties: {
            database: { type: 'string', example: 'connected' },
            api: { type: 'string', example: 'running' },
          }
        },
        uptime: { type: 'number', example: 12345 },
        timestamp: { type: 'string', example: '2024-01-12T10:00:00.000Z' },
      }
    }
  })
  getHealth(): object {
    return this.appService.getHealth();
  }
}
