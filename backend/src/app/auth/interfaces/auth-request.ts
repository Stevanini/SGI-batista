import { Request } from 'express';
import { LoginRequestBody } from '../dto/login.dto';
import { Member } from '../../member/entities/member.entity';

export interface AuthLoginRequest extends Request {
    memberLogin: LoginRequestBody;
}

export interface AuthMemberRequest extends Request {
    member: Member;
}
