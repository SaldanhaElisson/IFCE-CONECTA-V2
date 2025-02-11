"use client";

import React, { useState } from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { UserButton, SignedIn, useUser } from "@clerk/nextjs";
import BreadcrumbLogic from "@/app/(components)/BreadcrumbLogic";

import restricteMenus from "@/app/utils/restrictMenus";
import { ToastContainer } from "react-toastify";
import { ItemsSideBar } from "@/app/(components)/MenuComponent/MenuComponentInterface";

const { useToken } = theme;

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token } = useToken();
  const [itemNavigation, setItemNavigation] = useState([""]);
  const { user } = useUser();

  const onClick: MenuProps["onClick"] = (e) => {
    setItemNavigation([e.key]);
  };

  const roleCurrent: string | undefined = user?.organizationMemberships[0].role;
  const ItemsSideBarFilted = restricteMenus(roleCurrent, ItemsSideBar);

  return (
    <Layout style={{ minHeight: "100vh", height: "100%" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          className="demo-logo-vertical"
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "inherit",
            padding: "10px",
          }}
        >
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    margin: "auto",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={ItemsSideBarFilted}
          onClick={onClick}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <BreadcrumbLogic itens={itemNavigation} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <ToastContainer />
      </Layout>
    </Layout>
  );
}
