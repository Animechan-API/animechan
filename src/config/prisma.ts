import { PrismaClient, Prisma as PrismaCommand } from '@prisma/client';
export const prisma = new PrismaClient();
export const Prisma = PrismaCommand;
