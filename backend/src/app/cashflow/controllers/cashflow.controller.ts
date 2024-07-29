import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
} from '@nestjs/common';
import { CashflowService } from '../services/cashflow.service';
import { CreateCashflowDto, UpdateCashflowDto } from '../dto/cashflow.dto';
import { AdvancedSecurity } from '@/src/shared/decorators/security.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUserInterceptor } from '@/src/shared/interceptors/current-user.interceptors';
import { MemberFromJwt } from '../../auth/interfaces/member-from-jwt';

@ApiTags('Cashflows')
@Controller('cashflows')
@AdvancedSecurity()
@UseInterceptors(CurrentUserInterceptor)
export class CashflowController {
    constructor(private readonly cashflowService: CashflowService) {}

    @Post()
    @ApiBody({ type: CreateCashflowDto })
    create(@Body() dto: CreateCashflowDto & { member: MemberFromJwt }) {
        return this.cashflowService.create(dto, dto.member.name);
    }

    @Get()
    findAll() {
        return this.cashflowService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cashflowService.findOne(id);
    }

    @Patch(':id')
    @ApiBody({ type: UpdateCashflowDto })
    update(
        @Param('id') id: string,
        @Body() dto: UpdateCashflowDto & { member: MemberFromJwt },
    ) {
        return this.cashflowService.update(id, dto, dto.member.name);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cashflowService.remove(+id);
    }
}
