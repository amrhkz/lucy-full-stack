"use client";
import "./links.css";
import NavLink from "./navLink/navLink";

const Links = ({ session }) => {
  
  const links = [
    {
      title: "Register",
      path: "/register",
      icon: "bx bxs-user",
      logged: true,
    },
    {
      title: "Homepage",
      path: "/",
      icon: "bx bxs-home-alt-2",
    },
    {
      title: "Tree Chart",
      path: "/tree-chart",
      icon: "bx bx-network-chart",
    },
    {
      title: "Mind Map",
      path: "/mind-map",
      icon: "bx bx-git-branch",
    },
    {
      title: "Money",
      path: "/money",
      icon: "bx bx-dollar",
    },
    {
      title: "Marjan",
      path: "/marjan",
      icon: "bx bxs-heart",
    },
  ];

  function darkMode() {
    document.querySelector("body")?.classList.toggle("dark");
  }
  return (
    <div className="navbar-links">
      
      {links.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
      <button className="dark-mode" onClick={darkMode}>
        <i className="moon bx bxs-moon bx-sm"></i>
        <i className="sun bx bxs-sun bx-sm"></i>
      </button>
    </div>
  );
};

export default Links;
