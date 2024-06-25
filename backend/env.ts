import { z } from "zod";

const envSchema = z.object({
    DB_HOST: z.string(),
    DB_PORT: z.number(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.success == false) {
    console.error('Variáveis de ambiente inválidas', parsedEnv.error.flatten().fieldErrors);
    throw new Error('Variáveis de ambiente inválidas');
}

export const env = parsedEnv.data;