"use server";

import { questionsGetAll } from "@/app/(actions)/questionGetAll";

import { CollapseProps } from "antd";
import { clerkClient } from "@clerk/nextjs/server";
import ViewQuestions from "@/app/(components)/ViewQuestions";
export interface Question {
  id: string;
  titulo: string;
  descricao: string;
  author: string;
  areaAtuacao: string;
}

export default async function PageForGetNameUser() {
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "#fafafa",
    border: "none",
  };

  let items: CollapseProps["items"] | undefined = undefined;
  async function getAllQuestions() {
    const questions: Question[] = await questionsGetAll();
    console.log(questions);
    const formattedItems = await formatQuestionsToCollapseItems(questions);
    items = formattedItems;
  }

  const getUserDetails = async (userId: string) => {
    try {
      const user = await (await clerkClient()).users.getUser(userId);

      return `${user.firstName} ${user.lastName}`;
    } catch (error) {
      console.error("Erro ao obter detalhes do usuário:", error);
      return "Autor desconhecido";
    }
  };

  const formatQuestionsToCollapseItems = async (
    questions: Question[]
  ): Promise<CollapseProps["items"]> => {
    const items = await Promise.all(
      questions.map(async (question, index) => {
        const authorName = await getUserDetails(question.author);
        return {
          key: String(index + 1),
          label: question.titulo,
          children: <p>{question.descricao}</p>,
          extra: <span>{authorName}</span>,
          style: panelStyle,
          open: true,
        };
      })
    );
    return items;
  };
  await getAllQuestions();

  return (
    <>
      <ViewQuestions questions={items} />
    </>
  );
}
