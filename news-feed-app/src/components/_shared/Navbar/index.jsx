import MenuLink from "./MenuLink";

export default function Navbar({ links, parentComponent }) {
  return (
    <nav className={`
      flex xl:flex-row items-center h-full
      ${parentComponent === "Header" ? "flex-col pl-4 xl:p-0 items-start gap-0 xl:gap-4 xl:flex-row xl:justify-center " :  "gap-4 justify-center"}
      ${parentComponent === "Footer" && "flex-col gap-y-0 sm:flex-row p-0 gap-x-6 sm:py-5"
}
    `}>

      {links.map((link, index) => {
        return <MenuLink key = {index} {...link} parentComponent={parentComponent} />;
      })}
    </nav>
  );
}
