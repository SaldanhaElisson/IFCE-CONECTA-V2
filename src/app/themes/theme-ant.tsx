"use client";

import * as React from "react";
import { ConfigProvider } from "antd";
import { green } from "@ant-design/colors";
import "@ant-design/v5-patch-for-react-19";

export function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: green[4],
          colorSuccess: green[5],
          colorLink: green[4],
          colorLinkHover: green[3],
          colorBorder: green[2],
          colorText: "#0d1a26",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
