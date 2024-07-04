import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSgiFileDto {
    @IsString()
    @IsOptional()
    sgiFileTag?: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
