"use client";

import { labRegister } from "@/app/(actions)/labRegister";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";

interface FormData {
  nome: string;
  alunos: string[];
  areaAtuacao: string;
  descricao: string;
  contato: string;
  responsavel: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export default function CreateProfessor() {
  const { user } = useUser();

  const onSubmit = async (data: FormData) => {
    try {
      if (user?.id === undefined) {
        throw new Error("Usuário não encontrado");
      }

      await labRegister({
        nome: data.nome,
        alunos: data.alunos,
        areaAtuacao: data.areaAtuacao,
        descricao: data.descricao,
        contato: data.contato,
        responsavel: user.id,
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
        style={{ height: "50%" }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 12 }}
        onFinish={onSubmit}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item<FormData>
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Por favor, insira um nome" }]}
          style={{ width: "90%" }}
        >
          <Input />
        </Form.Item>

        <Form.List
          name="alunos"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error("No mínimo 2 alunos"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  key={field.key}
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Alunos" : ""}
                  required={false}
                  wrapperCol={{ span: 12 }}
                  labelCol={{ span: index === 0 ? 24 : 0 }}
                >
                  <Form.Item
                    key={field.key}
                    name={field.name}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Por favor, insera o nome do aluno ou remova este campo",
                      },
                    ]}
                    style={{
                      width: "90%",
                      display: "inline-block",
                      marginRight: 8,
                    }}
                  >
                    <Input placeholder="Aluno" />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

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
            placeholder="Escreva a descrição do laboratorio aqui"
          />
        </Form.Item>

        <Form.Item<FormData>
          label="Contato"
          name="contato"
          rules={[{ required: true, message: "Por favor, insira um contato" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
