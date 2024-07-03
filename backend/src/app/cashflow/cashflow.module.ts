import { Module } from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { CashflowController } from './cashflow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFlow } from './entities/cashflow.entity';
import { CashFlowCategory } from './entities/cashflow-category.entity';
import { CashFlowCategoryController } from './cashflow-category.controller';
import { Member } from '../member/entities/member.entity';
import { CashFlowCategoryService } from './cashflow-category.service';

@Module({
    imports: [TypeOrmModule.forFeature([CashFlow, CashFlowCategory, Member])],
    controllers: [CashflowController, CashFlowCategoryController],
    providers: [CashflowService, CashFlowCategoryService],
})
export class CashflowModule {}
