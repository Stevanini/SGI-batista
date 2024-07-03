import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCashflowDto } from './dto/update-cashflow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../member/entities/member.entity';
import { CashFlow } from './entities/cashflow.entity';

@Injectable()
export class CashflowService {
    constructor(
        @InjectRepository(CashFlow)
        private cashFlowRepository: Repository<CashFlow>,
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
    ) {}

    async create(cashFlowData: Partial<CashFlow>): Promise<CashFlow> {
        const cashFlow = this.cashFlowRepository.create(cashFlowData);
        if (cashFlowData.member) {
            const member = await this.memberRepository.findOne({
                where: { id: cashFlowData.member.id },
            });
            if (member) {
                cashFlow.member = member;
            }
        }
        return await this.cashFlowRepository.save(cashFlow);
    }

    async findAll(): Promise<CashFlow[]> {
        return await this.cashFlowRepository.find({
            relations: ['category', 'member'],
        });
    }

    async findOne(id: string): Promise<CashFlow> {
        return await this.cashFlowRepository.findOne({ where: { id } });
    }

    async update(
        id: string,
        updateCashFlowDto: UpdateCashflowDto,
    ): Promise<CashFlow> {
        const cashFlow = await this.findOne(id);

        // Update simple fields
        Object.assign(cashFlow, updateCashFlowDto);

        // If member is being updated, fetch the new member
        if (updateCashFlowDto.memberId) {
            const member = await this.memberRepository.findOne({
                where: { id: updateCashFlowDto.memberId },
            });
            if (!member) {
                throw new NotFoundException(
                    `Member #${updateCashFlowDto.memberId} not found`,
                );
            }
            cashFlow.member = member;
        }

        return await this.cashFlowRepository.save(cashFlow);
    }

    async remove(id: number): Promise<void> {
        const result = await this.cashFlowRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`CashFlow #${id} not found`);
        }
    }

    async getBalance(): Promise<number> {
        const result = await this.cashFlowRepository
            .createQueryBuilder('cashFlow')
            .select('SUM(cashFlow.amount)', 'total')
            .getRawOne();
        return result.total || 0;
    }
}
