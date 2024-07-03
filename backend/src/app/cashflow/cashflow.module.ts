import { Module } from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { CashflowController } from './cashflow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFlow } from './entities/cashflow.entity';
import { CashFlowCategory } from './entities/cashflow-category.entity';
import { CashFlowCategoryController } from './cashflow-type.controller';
import { CashFlowCategoryService } from './cashflow-type.service';
import { Member } from '../member/entities/member.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CashFlow, CashFlowCategory, Member])],
    controllers: [CashflowController, CashFlowCategoryController],
    providers: [CashflowService, CashFlowCategoryService],
})
export class CashflowModule {}
