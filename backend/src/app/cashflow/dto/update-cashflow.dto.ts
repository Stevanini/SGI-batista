import { PartialType } from '@nestjs/swagger';
import { CreateCashflowDto } from './create-cashflow.dto';
import { Type } from 'class-transformer';
import {
    IsOptional,
    IsNumber,
    IsDate,
    IsString,
    IsUUID,
} from 'class-validator';

export class UpdateCashflowDto extends PartialType(CreateCashflowDto) {
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    amount?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @IsOptional()
    @IsUUID()
    memberId?: string;
}
