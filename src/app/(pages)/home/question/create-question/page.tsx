"use client";

import { questionsRegister } from "@/app/(actions)/questionRegister";
import { useUser } from "@clerk/nextjs";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";

interface FormData {
  titulo: string;
  descricao: string;
  author: string;
  areaAtuacao: string;
}

export default function CreateQuestion() {
  const { user } = useUser();

  const onSubmit = async (data: FormData) => {
    try {
      if (user?.id === undefined) {
        throw new Error("Usuário não encontrado");
      }

      await questionsRegister({
        titulo: data.titulo,
        descricao: data.descricao,
        areaAtuacao: data.areaAtuacao,
        author: user.id,
      });

      toast.success("Questão cadastrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar questão.");
      console.error("Erro ao cadastrar questão:", error);
    }
  };
  return (
    <>
      <Form
        name="createLab"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onSubmit}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item<FormData>
          label="Titulo"
          name="titulo"
          rules={[{ required: true, message: "Por favor, insera um título" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<FormData>
          label="Área de Atuação"
          name="areaAtuacao"
          rules={[
            {
              required: true,
              message: "Por favor, insira uma área de atuação",
            },
          ]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 6 }}
        >
          <Select
            placeholder="Selecione uma área de atuação"
            allowClear
            style={{ width: "100%" }}
            options={[
              { value: "IA", label: "IA" },
              {
                value: "ENGENHARIA_DE_SOFTWARE",
                label: "Engenharia de Software",
              },
              { value: "PESQUISA", label: "Pesquisa" },
            ]}
          />
        </Form.Item>

        <Form.Item<FormData>
          label="Descrição"
          name="descricao"
          rules={[
            { required: true, message: "Por favor, insira uma descrição" },
          ]}
        >
          <TextArea
            rows={12}
            placeholder="Escreve a descrição do seu problema aqui"
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
