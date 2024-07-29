import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCashFlowCategoryDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUUID()
    groupId: string;
}

export class UpdateCashFlowCategoryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsUUID()
    groupId: string;
}
