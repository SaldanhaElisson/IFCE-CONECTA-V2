import { MenuProps } from "antd";
import { SubMenuType } from "antd/es/menu/interface";

type MenuItem = Required<MenuProps>["items"][number];

const RESTRICTED_FOR_PROFESSOR: string = "org:professor_labs";

function isSubMenuType(menu: MenuItem): menu is SubMenuType {
  if (menu != null) {
    return "children" in menu && Array.isArray(menu.children);
  }
  return false;
}

export default function restricteMenus(
  permission: string | undefined,
  menus: MenuItem[]
) {
  if (permission == RESTRICTED_FOR_PROFESSOR) {
    const menusFiltred = menus.filter((menu) => {
      if (menu?.key == "user") {
        return;
      }

      if (menu?.key != "lab" && menu?.key != "question") {
        return menu;
      }

      if (isSubMenuType(menu)) {
        const subMenuFiltred = menu?.children.filter((subMenu) => {
          if (
            subMenu?.key == "lab:create-lab" ||
            subMenu?.key == "question:create-question" ||
            subMenu?.key == "question:view-questions"
          ) {
            return subMenu;
          }
        });

        menu.children = [];
        menu.children = subMenuFiltred;
        return menu;
      }

      return menu;
    });
    return menusFiltred;
  }
  return menus;
}
