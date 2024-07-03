import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashFlowCategory } from '../entities/cashflow-category.entity';
import {
    CreateCashFlowCategoryDto,
    UpdateCashFlowCategoryDto,
} from '../dto/cashflow-category.dto';
import { CashFlowGroupCategory } from '../entities/cashflow-group-category.entity';

@Injectable()
export class CashFlowCategoryService {
    constructor(
        @InjectRepository(CashFlowCategory)
        private cashFlowCategoryRepository: Repository<CashFlowCategory>,
        @InjectRepository(CashFlowGroupCategory)
        private cashFlowGroupRepository: Repository<CashFlowGroupCategory>,
    ) {}

    async create(
        dto: CreateCashFlowCategoryDto,
        createdBy: string,
    ): Promise<CashFlowCategory> {
        const { name, description, groupId } = dto;

        const exits = await this.cashFlowCategoryRepository.findOneBy({
            name,
        });
        if (exits) {
            throw new BadRequestException('A categoria já existe.');
        }

        const groupsDb = await this.cashFlowGroupRepository.findOneBy({
            id: groupId,
        });

        if (!groupsDb) {
            throw new BadRequestException('O grupo não foi encontrado.');
        }

        const newEntity = new CashFlowCategory({
            name,
            description,
            createdBy,
            cashFlowGroupCategory: groupsDb,
            updatedBy: createdBy,
        });

        return await this.cashFlowCategoryRepository.save(newEntity);
    }

    async findAll(): Promise<CashFlowCategory[]> {
        return await this.cashFlowCategoryRepository.find({
            relations: ['cashFlowGroupCategory'],
        });
    }

    async findOne(id: string): Promise<CashFlowCategory> {
        return await this.cashFlowCategoryRepository.findOne({ where: { id } });
    }

    async update(
        id: string,
        dto: UpdateCashFlowCategoryDto,
        updatedBy: string,
    ): Promise<CashFlowCategory> {
        const category = await this.findOne(id);

        const { name, description, groupId } = dto;

        const groupDb = await this.cashFlowGroupRepository.findOneBy({
            id: groupId,
        });

        if (!groupDb) {
            throw new BadRequestException('O grupo não foi encontrado.');
        }

        category.name = name;
        category.description = description;
        category.cashFlowGroupCategory = groupDb;
        category.updatedBy = updatedBy;

        return await this.cashFlowCategoryRepository.save(category);
    }
}
