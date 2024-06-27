import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;
  private readonly logger = new Logger(PasswordService.name);

  async hashPassword(password: string): Promise<string> {
    this.logger.debug(`Hashing password`);
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    this.logger.debug(`Password hashed, length: ${hash.length}`);
    return hash;
  }

  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    this.logger.debug(`Validating password`);
    this.logger.debug(
      `Plain text password length: ${plainTextPassword.length}`,
    );
    this.logger.debug(`Hashed password length: ${hashedPassword.length}`);

    // Método 1: bcrypt.compare
    const isMatchBcrypt = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    this.logger.debug(`bcrypt.compare result: ${isMatchBcrypt}`);

    // Método 2: Comparação manual
    const [, salt] = hashedPassword.split('$');
    const manualHash = await bcrypt.hash(plainTextPassword, salt);
    const isMatchManual = manualHash === hashedPassword;
    this.logger.debug(`Manual comparison result: ${isMatchManual}`);

    // Método 3: Usando crypto para timing-safe comparison
    const isMatchCrypto = crypto.timingSafeEqual(
      Buffer.from(manualHash),
      Buffer.from(hashedPassword),
    );
    this.logger.debug(`Crypto timing-safe comparison result: ${isMatchCrypto}`);

    return isMatchBcrypt || isMatchManual || isMatchCrypto;
  }
}
