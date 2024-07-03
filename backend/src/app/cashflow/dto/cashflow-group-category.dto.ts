import { IsString, IsOptional } from 'class-validator';

export class CreateCashFlowGroupCategoryDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateCashFlowGroupCategoryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
