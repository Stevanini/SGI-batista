import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@shared/constants/auth.constants';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from '@/src/config/env/validation';
import { ConfigService } from '@nestjs/config';
import { getTargetPermission } from '@shared/decorators/security.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService<EnvironmentVariables>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic =
            this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]) || false;
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        const payload = await this.jwtService.verifyAsync(
            token,
            this.optionsJwt(),
        );

        const memberPermissions = payload?.permissions ?? [];

        const accessPermission = getTargetPermission(context.getHandler());
        const isAllowed = this.validAdminPermissions(
            memberPermissions,
            accessPermission.tag,
        );

        if (memberPermissions.length == 0 || !isAllowed)
            throw new ForbiddenException([
                {
                    property: 'member',
                    error: [`Acesso negado`],
                    description: accessPermission.description,
                },
            ]);

        // console.log(
        //     'PermissionGuard',
        //     payload,
        //     accessPermission,
        //     memberPermissions,
        //     context,
        // );
        return true;
    }

    private validAdminPermissions(
        memberPermission: Array<string>,
        targetPermission: string,
    ) {
        console.log(
            'validAdminPermissions',
            memberPermission,
            targetPermission,
        );
        return memberPermission.reduce(
            (hasPermission, currentPermission) =>
                this.matchPermissions(currentPermission, targetPermission) ||
                hasPermission,
            false,
        );
    }

    private matchPermissions(
        memberPermission: string,
        targetPermission: string,
    ): boolean {
        console.log('matchPermissions', memberPermission, targetPermission);
        memberPermission = memberPermission
            .replace('*', '.*')
            .toLowerCase()
            .trim();
        targetPermission = targetPermission.toLowerCase().trim();

        const regex = new RegExp(`^${memberPermission}$`, 'g');

        return Boolean(targetPermission.match(regex));
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private optionsJwt() {
        const privateKey = this.configService.get('JWT_PRIVATE_KEY', {
            infer: true,
        });
        const publicKey = this.configService.get('JWT_PUBLIC_KEY', {
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
    }
}
