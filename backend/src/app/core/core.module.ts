import { Global, Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { PasswordService } from '@app/core/services/password.service';

@Global()
@Module({
    controllers: [CoreController],
    providers: [CoreService, PasswordService],
    exports: [PasswordService],
})
export class CoreModule {}
