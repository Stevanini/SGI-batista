import { Type } from 'class-transformer';
import {
    IsNumber,
    IsDate,
    IsOptional,
    IsString,
    IsUUID,
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
}
