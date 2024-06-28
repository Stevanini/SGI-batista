import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@shared/constants/auth.constants';
// import { getTargetPermission } from '@shared/decorators/security.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // const permission = getTargetPermission(context.getHandler());
    // if (!permission)
    //   throw new HttpException(
    //     'Permissão não encontrada',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // const allAdminPermissions =
    //   context.switchToHttp().getRequest().member?.permissions ?? [];

    // const isAllowed = this.validAdminPermissions(
    //   allAdminPermissions,
    //   permission.tag,
    // );

    // console.log(
    //   'PermissionGuard',
    //   context.getHandler(),
    //   isPublic,
    //   permission,
    //   isAllowed,
    // );
    // if (!isAllowed)
    //   throw new ForbiddenException([
    //     {
    //       property: 'member',
    //       error: [`Acesso negado`],
    //       description: permission.description,
    //     },
    //   ]);

    return true;
  }

  private validAdminPermissions(
    memberPermission: Array<string>,
    targetPermission: string,
  ) {
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
    memberPermission = memberPermission.replace('*', '.*').toLowerCase().trim();
    targetPermission = targetPermission.toLowerCase().trim();

    const regex = new RegExp(`^${memberPermission}$`, 'g');

    return Boolean(targetPermission.match(regex));
  }
}
