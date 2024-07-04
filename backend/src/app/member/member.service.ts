import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '@app/member/entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PasswordService } from '@app/core/services/password.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private membersRepository: Repository<Member>,
        private passwordService: PasswordService,
        private configService: ConfigService,
    ) {}

    async create(
        createMemberDto: CreateMemberDto,
        createdBy: string,
    ): Promise<Member> {
        const { name, email, password } = createMemberDto;

        const existingMember = await this.membersRepository.findOneBy({
            email,
        });
        if (existingMember) {
            throw new BadRequestException('Email já esta em uso');
        }

        const newMember = new Member({
            name,
            email,
            password: this.passwordService.encrypt(password),
            createdBy,
            updatedBy: createdBy,
        });

        const savedMember = await this.membersRepository.save(newMember);

        return this.omitPassword(savedMember);
    }

    private omitPassword(member: Member): Member {
        const { password, ...result } = member;
        return result as Member;
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
