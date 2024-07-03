import { Module } from '@nestjs/common';
import { CashflowService } from './services/cashflow.service';
import { CashflowController } from './controllers/cashflow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFlow } from './entities/cashflow.entity';
import { CashFlowCategory } from './entities/cashflow-category.entity';
import { CashFlowCategoryController } from './controllers/cashflow-category.controller';
import { CashFlowCategoryService } from './services/cashflow-category.service';
import { CashFlowGroupCategory } from './entities/cashflow-group-category.entity';
import { CashFlowGroupCategoryController } from './controllers/cashflow-group-category.controller';
import { CashFlowGroupCategoryService } from './services/cashflow-group-category.service';
import { MemberModule } from '../member/member.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CashFlow,
            CashFlowGroupCategory,
            CashFlowCategory,
        ]),
        MemberModule,
    ],
    controllers: [
        CashflowController,
        CashFlowGroupCategoryController,
        CashFlowCategoryController,
    ],
    providers: [
        CashflowService,
        CashFlowGroupCategoryService,
        CashFlowCategoryService,
    ],
})
export class CashflowModule {}
