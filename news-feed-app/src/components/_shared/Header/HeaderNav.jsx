import Navbar from "../Navbar";

export default function HeaderNav() {
  const links = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Categories",
      path: "/categories",
    },

    {
      name: "For You",
      path: "/suggested",
    },

    {
      name: "Saved",
      path: "/saved",
    },
  ];

  return (
    <div className="translate-x-[-1000%] absolute xl:static xl:translate-none transition-all duration-500">
        <Navbar links={links} parentComponent="Header" />

        {/* <ul className="navbar-list flex list"> */}
        {/* <Link to="/">Home</Link> */}

        {/* <a
                      href="#"
                      className="active-link text-primary-color capitalized fs-16 fw-700 link relative after block transition"
                    >
                      {" "}
                      home{" "}
                    </a> */}

        {/* <a
            href="./suggested.html"
            className="text-primary-color capitalized fs-16 fw-700 link relative after block transition"
          >
            {" "}
            for you{" "}
          </a>

          <a
            href="./saved.html"
            className="text-primary-color capitalized fs-16 fw-700 link relative after block transition"
          >
            {" "}
            saved{" "}
          </a> */}
        {/* </ul> */}
    </div>
  );
}
