import { IsString, IsOptional } from 'class-validator';

export class CreateCashFlowCategoryDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateCashFlowCategoryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
