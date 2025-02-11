import {
  ExperimentOutlined,
  HomeOutlined,
  SnippetsOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

export interface MenuComponent {
  display(): MenuItem;
}

export class MenuItemLeaf implements MenuComponent {
  constructor(
    private name: string,
    private icon: null | React.ReactNode,
    private label: string | React.ReactNode
  ) {}

  display(): MenuItem {
    return {
      key: this.name,
      icon: this.icon,
      label: this.label,
    };
  }
}

export class SubMenu implements MenuComponent {
  private children: MenuComponent[] = [];

  constructor(
    private name: string,
    private icon: null | React.ReactNode,
    private label: string | React.ReactNode
  ) {}

  add(component: MenuComponent): void {
    this.children.push(component);
  }

  remove(component: MenuComponent): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  display(): MenuItem {
    const childrenMenus = this.children.map((child) => child.display());

    return {
      key: this.name,
      icon: this.icon,
      label: this.label,
      children: childrenMenus,
    };
  }
}

const homeItem = new MenuItemLeaf(
  "home",
  <HomeOutlined />,
  <Link href="/home">Home</Link>
);

const createLabItem = new MenuItemLeaf(
  "lab:create-lab",
  null,
  <Link href="/home/lab/create-lab">Criar Laboratório</Link>
);

const labSubMenu = new SubMenu("lab", <ExperimentOutlined />, "Lab");

labSubMenu.add(createLabItem);

const createProfessorItem = new MenuItemLeaf(
  "user:create-professor",
  null,
  <Link href="/home/user/create-professor">Criar Professor</Link>
);

const questionSubMenu = new SubMenu(
  "question",
  <SnippetsOutlined />,
  "Questões"
);

const viewQuestions = new MenuItemLeaf(
  "question:view-questions",
  null,
  <Link href="/home/question/view-questions">Visualizar questões</Link>
);

const createQuestionItem = new MenuItemLeaf(
  "question:create-question",
  null,
  <Link href="/home/question/create-question">Criar Questão</Link>
);

questionSubMenu.add(createQuestionItem);
questionSubMenu.add(viewQuestions);

const userSubMenu = new SubMenu("user", <VideoCameraOutlined />, "Usuários");

userSubMenu.add(createProfessorItem);

const menuComponents: MenuComponent[] = [
  homeItem,
  labSubMenu,
  questionSubMenu,
  userSubMenu,
];

export const ItemsSideBar: MenuItem[] = menuComponents.map((component) =>
  component.display()
);
