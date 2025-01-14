import { z } from 'zod';

export const CredentialSchema = z.object({
    serviceName: z.string().min(1, { message: "Service name is required" })
        .refine((value) => value !== "authConfirmed", { message: "This service name is not allowed" })
        .refine((value) => !value.includes(' '), { message: "Space is not allowed." }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});