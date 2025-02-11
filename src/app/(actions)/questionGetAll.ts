"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const questionsGetAll = async () => {
  try {
    return await prisma.question.findMany();
  } catch (error) {
    console.log(error);
    console.error("Erro ao pegar as  questão:", error);
    throw new Error("Erro ao pegar as questão");
  }
};
