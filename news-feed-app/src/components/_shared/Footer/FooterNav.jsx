import Navbar from "../Navbar";

export default function FooterNav() {
  const links = [
    {
      name: "About",
      path: "/about",
    },

    {
      name: "Terms of Use",
      path: "/terms",
    },

    {
      name: "Privacy Policy",
      path: "/privacy",
    },

    {
      name: "Manage Cookies",
      path: "/cookies",
    },

    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="order-3 w-full xl:w-auto xl:order-2">
      <Navbar links={links} parentComponent="Footer" />
    </div>
  );
}
