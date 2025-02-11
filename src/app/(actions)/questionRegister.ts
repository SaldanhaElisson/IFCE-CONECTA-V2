"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface FormData {
  titulo: string;
  descricao: string;
  author: string;
  areaAtuacao: string;
}

export const questionsRegister = async (formData: FormData) => {
  const { titulo, descricao, author, areaAtuacao } = formData;
  try {
    return await prisma.question.create({
      data: { titulo, descricao, author, areaAtuacao },
    });
  } catch (error) {
    console.log(error);
    console.error("Erro ao cadastrar questão:", error);
    throw new Error("Erro ao cadastrar questão");
  }
};
