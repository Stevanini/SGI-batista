import { Logger } from '@nestjs/common';
import { getAllPermissions } from '@shared/decorators/security.decorator';
import { Permissions } from '@shared/interfaces/permissions.interface';

import { randomUUID } from 'crypto';
import { In, Repository } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';

export const synchronizedPermissions = async (
    permissionRepository: Repository<Permission>,
) => {
    // console.log('synchronizedPermissions');
    const permissionsGenerateTags = getAllPermissions();
    permissionsGenerateTags.push(<Permissions>{
        tag: '*',
        description: 'Acesso total',
    });

    const permissions = await permissionRepository.find({
        where: {
            tag: In(permissionsGenerateTags.map((p) => p.tag)),
        },
    });

    const permissionsToCreate = permissionsGenerateTags
        .filter(
            (p) => !permissions.some((existingP) => existingP.tag === p.tag),
        )
        .map(
            (p) =>
                ({
                    id: randomUUID(),
                    tag: p.tag,
                    description: p.description,
                    createdBy: '',
                    updatedBy: '',
                }) as Permission,
        );

    if (permissionsToCreate.length > 0) {
        await permissionRepository.save(permissionsToCreate);
    }

    // logger.log('Permissions Synchronized!!!!');
};
