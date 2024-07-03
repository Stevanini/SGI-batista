import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvironmentVariables } from '@config/env/validation';
import { ConfigService } from '@nestjs/config';

import { MemberFromJwt } from '../interfaces/member-from-jwt';
import { MemberPayload } from '../interfaces/member-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService<EnvironmentVariables>) {
        const publicKey = configService.get('JWT_PUBLIC_KEY', { infer: true });

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Buffer.from(publicKey, 'base64'),
            algorithms: ['RS256'],
        });
    }

    async validate(payload: MemberPayload): Promise<MemberFromJwt> {
        // console.log('JwtStrategy');
        return {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            permissions: payload.permissions,
        };
    }
}
