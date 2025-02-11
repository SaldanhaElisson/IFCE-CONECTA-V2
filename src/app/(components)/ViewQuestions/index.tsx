"use client";
import { Collapse, CollapseProps } from "antd";
import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { theme } from "antd";

export interface Question {
  id: string;
  titulo: string;
  descricao: string;
  author: string;
  areaAtuacao: string;
}

interface Props {
  questions: CollapseProps["items"] | undefined;
}

const ViewQuestions: React.FC<Props> = ({ questions }) => {
  const { token } = theme.useToken();

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
        width: "100%",
        margin: "auto",
      }}
      items={questions}
    />
  );
};

export default ViewQuestions;
