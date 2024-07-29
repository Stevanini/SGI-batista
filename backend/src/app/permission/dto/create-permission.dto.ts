import { IsString, IsOptional, IsBoolean } from "class-validator";

export class CreatePermissionDto {
    @IsString()
    tag: string;

    @IsString()
    @IsOptional()
    description?: string;
}
