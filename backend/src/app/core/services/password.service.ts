import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
    private algorithm = 'aes-256-cbc';

    constructor(private configService: ConfigService) {}

    getKey(): Buffer {
        return crypto.scryptSync(
            this.configService.get<string>('CRYPTO_KEY'),
            'salt',
            32,
        );
    }

    encrypt(text: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.getKey(), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }

    decrypt(encryptedText: string): string {
        const [ivHex, encrypted] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.getKey(),
            iv,
        );
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    verify(original: string, encrypted: string): boolean {
        return this.decrypt(encrypted) === original;
    }
}
