import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '@app/member/entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { USER_STATUS } from '@shared/constants/user.constants';
import { PasswordService } from '@app/core/services/password.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    private passwordService: PasswordService,
  ) {}

  async create(
    createMemberDto: CreateMemberDto,
    createdBy: string,
  ): Promise<Member> {
    const { name, email, password } = createMemberDto;

    const newMember = new Member();
    newMember.id = uuidv4(); // Gerar UUID aleatório
    newMember.name = name;
    newMember.email = email;
    newMember.status = USER_STATUS.WAITING_ID;
    newMember.password = await this.passwordService.hashPassword(password);

    newMember.createdBy = createdBy;
    newMember.updatedBy = createdBy;

    const m = await this.membersRepository.save(newMember);
    return {
      ...m,
      password: undefined,
    } as Member;
  }

  findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  findOne(id: string): Promise<Member> {
    return this.membersRepository.findOneBy({ id });
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<void> {
    await this.membersRepository.update(id, updateMemberDto);
  }

  async remove(id: string): Promise<void> {
    await this.membersRepository.delete(id);
  }
}
