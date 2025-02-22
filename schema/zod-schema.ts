import { z } from 'zod';

export const CredentialSchema = z.object({
    serviceName: z.string().min(1, { message: "Service name is required" })
        .refine((value) => value !== "authConfirmed", { message: "This service name is not allowed" })
        .refine((value) => !value.includes(' '), { message: "Space is not allowed." })
        .refine((value) => /^[a-zA-Z0-9._-]+$/.test(value), { message: "Only alphanumeric, '.', '-', and '_' are allowed." }),
    login_id: z.string().min(1, { message: "Login ID is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});