import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @IsString()
    @IsOptional()
    tag?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    enable?: boolean;
}
