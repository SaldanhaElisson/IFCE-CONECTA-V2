"use client";
import "@ant-design/v5-patch-for-react-19";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { theme } from "antd";
import { SignIn } from "@clerk/nextjs";

const { useToken } = theme;

export default function SignInPage() {
  const { token } = useToken();

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(./peak_background.svg)",
        backgroundSize: "cover",
      }}
    >
      <Content
        style={{
          padding: "0.5rem",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            variables: {
              colorPrimary: token.colorPrimary,
            },
          }}
        />
      </Content>
    </Layout>
  );
}
