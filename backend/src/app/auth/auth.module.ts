import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { EnvironmentVariables } from '@config/env/validation';
import { LoginValidationMiddleware } from '@app/auth/middleware/login-validation.middleware';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entities/member.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Member]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory: (
                configService: ConfigService<EnvironmentVariables>,
            ) => {
                const privateKey = configService.get('JWT_PRIVATE_KEY', {
                    infer: true,
                });
                const publicKey = configService.get('JWT_PUBLIC_KEY', {
                    infer: true,
                });

                return {
                    privateKey: Buffer.from(privateKey, 'base64'),
                    publicKey: Buffer.from(publicKey, 'base64'),
                    signOptions: {
                        algorithm: 'RS256',
                        expiresIn: '1d',
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginValidationMiddleware).forRoutes('login');
    }
}
