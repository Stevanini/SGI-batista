import { AppController } from '@app/app.controller';

import {
    applyDecorators,
    CustomDecorator,
    Logger,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
    PERMISSION_METADATA_KEY,
    ALL_PERMISSIONS_METADATA_KEY,
    API_DESCRIPTION_METADATA_KEY,
} from '@shared/constants/auth.constants';
import { PermissionGuard } from '@shared/guards/permission.guard';
import { Permissions } from '@shared/interfaces/permissions.interface';
const isLocal = process.env.NODE_ENV === 'local';

export const getAllPermissions = (): Array<Permissions> =>
    Reflect.getMetadata(ALL_PERMISSIONS_METADATA_KEY, AppController) || [];

export const getTargetPermission = (target: any): any =>
    Reflect.getMetadata(PERMISSION_METADATA_KEY, target) || null;

export const getTargetDescription = (target: any): string =>
    Reflect.getMetadata(API_DESCRIPTION_METADATA_KEY, target) || '';

export const addPermission = (permission: any, target: any) => {
    console.log('addPermission', permission, target);
    Reflect.defineMetadata(PERMISSION_METADATA_KEY, permission, target);
    Reflect.defineMetadata(
        ALL_PERMISSIONS_METADATA_KEY,
        [...getAllPermissions(), permission],
        AppController,
    );
};

export const SetPermissionName = (): CustomDecorator<string> => {
    const logger = new Logger('AdvancedSecurity');

    const decoratorFactory = (target: any, key?: any, descriptor?: any) => {
        if (descriptor) {
            const description = getTargetDescription(descriptor.value);
            const domainName = target.constructor.name
                .replace('Controller', '')
                .toLocaleLowerCase();

            const permissionMethod = {
                tag: `${domainName}:${key}`,
                description,
            };
            const permissionDomain = {
                tag: `${domainName}:*`,
                description: 'Acesso total ao modulo',
            };

            if (isLocal)
                logger.debug(
                    `Find module permission ${permissionDomain.tag} | ${permissionDomain.description}`,
                );
            if (isLocal)
                logger.debug(
                    `Find permission ${permissionMethod.tag} ${permissionMethod.description ? '|' : ''} ${permissionMethod.description}`,
                );

            addPermission(permissionMethod, descriptor.value);
            addPermission(permissionDomain, descriptor.value);
            return descriptor;
        }

        const domainName = target.name
            .replace('Controller', '')
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLocaleLowerCase();

        const permissionDomain = {
            tag: `${domainName}:*`,
            description: 'Acesso total ao modulo',
        };
        const methods = Object.getOwnPropertyNames(target.prototype);

        addPermission(permissionDomain, target);
        if (isLocal)
            logger.debug(
                `Find module permission ${permissionDomain.tag} | ${permissionDomain.description}`,
            );

        for (const method of methods) {
            if (method === 'constructor') continue;
            const description = getTargetDescription(target.prototype[method]);
            const permissionMethod = {
                tag: `${domainName}:${method}`,
                description,
            };

            if (isLocal)
                logger.debug(
                    `Find permission ${permissionMethod.tag} ${permissionMethod.description ? '|' : ''} ${permissionMethod.description}`,
                );
            addPermission(permissionMethod, target.prototype[method]);
        }

        return target;
    };

    decoratorFactory.KEY = PERMISSION_METADATA_KEY;

    console.log('SetPermissionName', decoratorFactory);

    return decoratorFactory;
};

export function AdvancedSecurity() {
    console.log('AdvancedSecurity');
    return applyDecorators(
        SetPermissionName(),
        UseGuards(PermissionGuard),
        ApiBearerAuth(),
        // ApiUnauthorizedResponse(ADMINISTRATOR_UNAUTHORIZED),
    );
}
