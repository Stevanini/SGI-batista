import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { IsPublic } from '@shared/decorators/is-public.decorator';
import { AuthService } from '@app/auth/auth.service';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { LoginRequestBody } from '@app/auth/dto/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginRequestBody })
  async login(@Req() req: LoginRequestBody) {
    console.log('req', req);
    // return this.authService.login(req);
  }
}
