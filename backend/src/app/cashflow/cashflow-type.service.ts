import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashFlowCategory } from './entities/cashflow-category.entity';

@Injectable()
export class CashFlowCategoryService {
    constructor(
        @InjectRepository(CashFlowCategory)
        private cashFlowTypeRepository: Repository<CashFlowCategory>,
    ) {}

    async create(
        cashFlowTypeData: Partial<CashFlowCategory>,
    ): Promise<CashFlowCategory> {
        const cashFlowType =
            this.cashFlowTypeRepository.create(cashFlowTypeData);
        return await this.cashFlowTypeRepository.save(cashFlowType);
    }

    async findAll(): Promise<CashFlowCategory[]> {
        return await this.cashFlowTypeRepository.find();
    }

    async findOne(id: string): Promise<CashFlowCategory> {
        return await this.cashFlowTypeRepository.findOne({ where: { id } });
    }
}
