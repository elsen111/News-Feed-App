import MenuLink from "./MenuLink";

export default function Navbar({ links, parentComponent }) {
  return (
    <nav className={`
      flex xl:flex-row items-center h-full
      ${parentComponent === "Header" ? "flex-col pl-4 xl:p-0 items-start gap-0 xl:gap-4 xl:flex-row xl:justify-center " :  "gap-4 justify-center "}
    `}>

      {links.map((link, index) => {
        return <MenuLink key = {index} {...link} />;
      })}
    </nav>
  );
}
