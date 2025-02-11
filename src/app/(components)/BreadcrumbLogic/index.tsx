import React, { JSX } from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
interface BreadcrumbItem {
  title: JSX.Element | string;
  key: string;
}

export default function BreadcrumbLogic({ itens }: { itens: Array<string> }) {
  const currentKey = itens[itens.length - 1];

  const parts = currentKey.split(":");

  let accumulatedPath = "/home/";
  const itensWithBreadcrumbs: BreadcrumbItem[] = [
    {
      key: `home`,
      title: <Link href={accumulatedPath}>{"Home"}</Link>,
    },
  ];

  parts.forEach((part, index) => {
    accumulatedPath += `${part}/`;

    const displayName = part.charAt(0).toUpperCase() + part.slice(1);

    if (routesInvalid.find((value) => displayName == value)) {
      itensWithBreadcrumbs.push({
        key: `${index}-${part}`,
        title: displayName,
      });
      return;
    }

    itensWithBreadcrumbs.push({
      key: `${index}-${part}`,
      title: <Link href={accumulatedPath}>{displayName}</Link>,
    });
  });

  return <Breadcrumb items={itensWithBreadcrumbs} />;
}

const routesInvalid: string[] = ["User"];
