import { Controller, Post, Req } from '@nestjs/common';

import { AuthService } from '@app/auth/auth.service';
import { LoginRequestBody } from '@app/auth/dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthLoginRequest } from './interfaces/auth-request';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiBody({ type: LoginRequestBody })
    async login(@Req() req: AuthLoginRequest) {
        return this.authService.login(req.body);
    }
}
