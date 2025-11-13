import MenuLink from "./MenuLink";

export default function Navbar({ links }) {
  return (
    <nav className="flex flex-col gap-4 xl:flex-row items-center justify-center h-full">
      {links.map((link, index) => {
        return <MenuLink key = {index} {...link} />;
      })}
    </nav>
  );
}
