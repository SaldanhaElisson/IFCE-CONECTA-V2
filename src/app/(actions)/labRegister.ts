"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface FormData {
  nome: string;
  alunos: string[];
  areaAtuacao: string;
  descricao: string;
  contato: string;
  responsavel: string;
}

export const labRegister = async (formData: FormData) => {
  const { nome, alunos, areaAtuacao, contato, responsavel, descricao } =
    formData;
  try {
    return await prisma.laboratorio.create({
      data: { nome, alunos, areaAtuacao, descricao, contato, responsavel },
    });
  } catch (error) {
    console.log(error);
    console.error("Erro ao cadastrar laboratorio:", error);
    throw new Error("Erro ao cadastrar laboratorio");
  }
};
