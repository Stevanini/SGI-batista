import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    enable?: boolean;
}
