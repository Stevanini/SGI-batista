import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashFlow } from '../entities/cashflow.entity';
import { CreateCashflowDto, UpdateCashflowDto } from '../dto/cashflow.dto';
import { CashFlowCategory } from '../entities/cashflow-category.entity';
import { MemberService } from '../../member/member.service';

@Injectable()
export class CashflowService {
    constructor(
        @InjectRepository(CashFlow)
        private cashFlowRepository: Repository<CashFlow>,
        @InjectRepository(CashFlowCategory)
        private cashFlowCategoryRepository: Repository<CashFlowCategory>,
        private readonly memberService: MemberService,
    ) {}

    async create(dto: CreateCashflowDto, createdBy: string): Promise<CashFlow> {
        const { amount, date, description, categoryId, memberId, type } = dto;

        const memberDb = await this.memberService.findOne(memberId);

        if (!memberDb) {
            throw new BadRequestException('O membro não foi encontrado');
        }

        const categoryDb = await this.cashFlowCategoryRepository.findOne({
            where: { id: categoryId },
        });

        const newEntity = new CashFlow({
            amount,
            date,
            description,
            category: categoryDb,
            member: memberDb,
            type,
            createdBy,
            updatedBy: createdBy,
        });

        return await this.cashFlowRepository.save(newEntity);
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
        updatedBy: string,
    ): Promise<CashFlow> {
        const cashFlow = await this.findOne(id);

        cashFlow.updatedBy = updatedBy;

        // Update simple fields
        Object.assign(cashFlow, updateCashFlowDto);

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
