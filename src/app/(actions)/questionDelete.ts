"use server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const questionDelete = async (questionId: string) => {
    try {
        await prisma.question.delete({where: {id: questionId}});

    } catch (error) {
        console.log(error);
        console.error("Erro ao deletar questão:", error);
        throw new Error("Erro ao deletar questão");
    }
}

export default questionDelete;