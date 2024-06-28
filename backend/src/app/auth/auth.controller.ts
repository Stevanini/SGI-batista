import { Controller, Post, Req, UseGuards } from '@nestjs/common';

// import { IsPublic } from '@shared/decorators/is-public.decorator';
import { AuthService } from '@app/auth/auth.service';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { LoginRequestBody } from '@app/auth/dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Member } from '../member/entities/member.entity';
import { AuthRequest } from './interfaces/auth-request';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginRequestBody })
  async login(@Req() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
