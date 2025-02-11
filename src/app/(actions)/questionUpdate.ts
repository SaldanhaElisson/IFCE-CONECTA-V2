
"use server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface FormData {
    id: string;
    titulo: string;
    descricao: string;
    areaAtuacao: string;
}

export const questionUpdate = async (formData: FormData) => {
    const {id, titulo, descricao,areaAtuacao} = formData;
    try {
        return await prisma.question.update(
            {
                where: {id: id},
                data: {
                    titulo: titulo,
                    descricao: descricao,
                    areaAtuacao: areaAtuacao,
                }
        });
    } catch (error) {
        console.log(error);
        console.error("Erro ao atualizar questão:", error);
        throw new Error("Erro ao atualizar questão");
    }
};