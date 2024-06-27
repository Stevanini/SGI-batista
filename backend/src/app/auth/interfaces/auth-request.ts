import { Request } from 'express';
import { Member } from '@app/member/entities/member.entity';

export interface AuthRequest extends Request {
  user: Member;
}
