import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('healthy')
  getHealthy(): string {
    return this.appService.getHealthy();
  }
}
