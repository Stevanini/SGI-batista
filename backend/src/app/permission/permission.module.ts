import { Module, OnModuleInit } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Permission } from './entities/permission.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { synchronizedPermissions } from '../core/permissions/permissions.synchronized';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    controllers: [PermissionController],
    providers: [PermissionService],
})
export class PermissionModule implements OnModuleInit {
    constructor(
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>,
    ) {}

    async onModuleInit() {
        await synchronizedPermissions(this.permissionsRepository);
    }
}
