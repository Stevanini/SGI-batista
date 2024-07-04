import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsArray, IsString } from 'class-validator';
import { CreateSgiFileDto } from './create-sgi-file.dto';

export class UploadSgiFileDto extends PartialType(CreateSgiFileDto) {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    sgiFileTag?: string;

    @IsString()
    @IsOptional()
    mimeType?: string;
}
