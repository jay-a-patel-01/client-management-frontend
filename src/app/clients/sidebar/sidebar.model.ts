export class SidebarModel {
    linkText: string | undefined;
    parentLink: string | undefined;
    menu: boolean | undefined;
    submenu: { childtext: string; link: string; }[] | undefined;
  }
  