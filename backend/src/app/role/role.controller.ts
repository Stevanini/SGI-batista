import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvancedSecurity } from '@/src/shared/decorators/security.decorator';
import { CurrentUserInterceptor } from '@/src/shared/interceptors/current-user.interceptors';
import { MemberFromJwt } from '../auth/interfaces/member-from-jwt';

@ApiTags('Roles')
@Controller('roles')
@AdvancedSecurity()
@UseInterceptors(CurrentUserInterceptor)
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @ApiBody({ type: CreateRoleDto })
    create(@Body() dto: CreateRoleDto & { member: MemberFromJwt }) {
        return this.roleService.create(dto, dto.member.name);
    }

    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(id);
    }

    @Patch(':id')
    @ApiBody({ type: UpdateRoleDto })
    update(
        @Param('id') id: string,
        @Body() dto: UpdateRoleDto & { member: MemberFromJwt },
    ) {
        return this.roleService.update(id, dto, dto.member.name);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(id);
    }
}
