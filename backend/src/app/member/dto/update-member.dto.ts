import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
    @IsString()
    name?: string;

    @IsEmail()
    email?: string;
}
