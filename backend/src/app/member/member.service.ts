import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '@app/member/entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) { }

  create(createMemberDto: CreateMemberDto): Promise<Member> {
    const { name, email } = createMemberDto;

    const newMember = new Member();
    newMember.id = uuidv4(); // Gerar UUID aleatório
    newMember.name = name;
    newMember.email = email;

    return this.membersRepository.save(newMember);
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
