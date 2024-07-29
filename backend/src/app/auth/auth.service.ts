import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
    USER_LOGIN_RELEASED,
    USER_STATUS_LABEL,
} from '@shared/constants/user.constants';

import { UserToken } from './interfaces/user-token';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../member/entities/member.entity';
import { LoginRequestBody } from './dto/login.dto';
import { PasswordService } from '@app/core/services/password.service';
import { ConfigService } from '@nestjs/config';
import { MemberPayload } from './interfaces/member-payload';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Member)
        private readonly membersRepository: Repository<Member>,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
        private readonly configService: ConfigService,
    ) {}

    async login(body: LoginRequestBody): Promise<UserToken> {
        // console.log('login', body);
        await this.validateUser(body.email, body.password);

        const user = await this.findAuthUserByEmail(body.email);
        const email = user.email.toLowerCase();

        const allPermissionOfRoles = user.roles.map((role) =>
            role.permissions.map((permission) => permission.tag),
        );
        const allPermission = user.permissions.map(
            (permission) => permission.tag,
        );

        const mergedPermissions = Array.from(
            new Set(allPermissionOfRoles.concat(allPermission).flat()),
        );

        const payload: MemberPayload = {
            sub: user.id,
            email,
            name: user.name,
            permissions: mergedPermissions,
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
        };
    }

    async isTokenValid(token: string): Promise<boolean> {
        // console.log('isTokenValid');
        try {
            const decodedToken = this.jwtService.verify(token);
            return !!decodedToken;
        } catch (error) {
            return false;
        }
    }

    async validateUser(email: string, password: string) {
        // console.log('validateUser');
        const user = await this.findAuthUserByEmail(email);

        if (user) {
            this.validateSignStatus(user);
            const isPasswordValid = await this.passwordService.verify(
                password,
                user.password,
            );

            if (isPasswordValid)
                return {
                    ...user,
                    password: undefined,
                };
        }
        throw new UnauthorizedException([
            {
                property: 'login',
                error: ['Endereço de email ou senha inválidos'],
            },
        ]);
    }

    private validateSignStatus(user: Member) {
        // console.log('validateSignStatus');
        if (USER_LOGIN_RELEASED.includes(user.status)) return;
        throw new ForbiddenException([
            {
                property: 'status',
                error: [USER_STATUS_LABEL[user.status]],
            },
        ]);
    }

    async findAuthUserByEmail(email: string) {
        return await this.membersRepository.findOne({
            where: { email: email.toLowerCase() },
            relations: ['permissions', 'roles', 'roles.permissions'],
        });
    }
}
