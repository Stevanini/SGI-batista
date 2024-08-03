import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>,
    ) {}

    create(
        createPermissionDto: CreatePermissionDto,
        createdBy: string,
    ): Promise<Permission> {
        const { tag, description } = createPermissionDto;

        const newPermission = new Permission();
        newPermission.id = uuidv4(); // Gerar UUID aleatório
        newPermission.tag = tag;
        newPermission.description = description;
        newPermission.createdBy = createdBy;
        newPermission.updatedBy = createdBy;
        return this.permissionsRepository.save(newPermission);
    }

    findAll(): Promise<Permission[]> {
        return this.permissionsRepository.find();
    }

    findOne(id: string): Promise<Permission> {
        return this.permissionsRepository.findOne({ where: { id } });
    }

    async update(
        id: string,
        updatePermissionDto: UpdatePermissionDto,
        updatedBy: string,
    ): Promise<Permission> {
        await this.permissionsRepository.update(id, {
            ...updatePermissionDto,
            updatedBy,
        });
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.permissionsRepository.delete(id);
    }
}
