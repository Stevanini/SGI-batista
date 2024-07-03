import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNumber,
    IsDate,
    IsOptional,
    IsString,
    IsUUID,
    IsInt,
    Max,
    Min,
} from 'class-validator';

export class CreateCashflowDto {
    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsOptional()
    @IsString()
    description?: string;

    @IsUUID()
    categoryId: string;

    @IsUUID()
    memberId?: string;

    @IsInt()
    @Min(0)
    @Max(1)
    type?: number;
}

export class UpdateCashflowDto extends PartialType(CreateCashflowDto) {
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    amount?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUUID()
    categoryId?: string;
}
