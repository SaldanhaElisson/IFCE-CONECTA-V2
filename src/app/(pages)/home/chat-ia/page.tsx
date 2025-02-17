"use client";
import { UserOutlined } from "@ant-design/icons";
import {
  Bubble,
  BubbleProps,
  Sender,
  useXAgent,
  useXChat,
} from "@ant-design/x";
import { Flex } from "antd";
import React from "react";

const roles: Record<string, Partial<Omit<BubbleProps<string>, "content">>> = {
  ai: {
    placement: "start",
    avatar: { icon: <UserOutlined />, style: { background: "#fde3cf" } },
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 600,
    },
  },
  local: {
    placement: "end",
    avatar: { icon: <UserOutlined />, style: { background: "#87d068" } },
  },
};

const App = () => {
  const [content, setContent] = React.useState("");

  // Agent para chamada da API do Hugging Face
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onError }) => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ content: message }],
          }),
        });

        if (!response.body) {
          throw new Error("Resposta vazia da API");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";

        const readChunk = async () => {
          const { done, value } = await reader.read();

          if (done) return;

          const chunk = decoder.decode(value);
          accumulatedText += chunk;
          onSuccess(accumulatedText);

          await readChunk();
        };

        await readChunk();
      } catch (error) {
        onError(
          error instanceof Error ? error : new Error("Erro na requisição")
        );
      }
    },
  });

  // Configuração do chat
  const { onRequest, messages } = useXChat({
    agent,
    requestPlaceholder: "Digitando...",
    requestFallback: "Erro ao gerar resposta. Tente novamente.",
  });

  return (
    <Flex vertical gap="middle" style={{ maxWidth: 800, margin: "0 auto" }}>
      <Bubble.List
        roles={roles}
        style={{ height: "70vh", overflowY: "auto" }}
        items={messages.map(({ id, message, status }) => ({
          key: id,
          loading: status === "loading",
          role: status === "local" ? "local" : "ai",
          content: message,
        }))}
      />

      <Sender
        loading={agent.isRequesting()}
        value={content}
        onChange={setContent}
        onSubmit={(nextContent) => {
          onRequest(nextContent);
          setContent("");
        }}
        placeholder="Digite sua mensagem..."
      />
    </Flex>
  );
};

export default App;
