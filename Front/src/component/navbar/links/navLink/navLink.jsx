"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState, useTransition } from "react";
import { UserContext } from "@/app/userContext";
import "./navLink.css";

const NavLink = ({ item }) => {
  const { user } = useContext(UserContext);
  const pathName = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [avatar, setAvatar] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user/me", {
          credentials: "include",
        });
        const data = await res.json();
        console.log("User data:", data);
        setUserId(data._id);
        if (data.avatar) setAvatar(data.avatar);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    startTransition(() => {
      router.push(item.path);
    });
  };

  return (
    <a
      href={item.path}
      onClick={handleClick}
      className={`nav-link ${pathName === item.path && "active"}`}
    >
      <span>{item.title}</span>
      {item.logged & (item.path === "/register") ? (
        <>
          <img
            src={avatar || "./img/banner-logo.jpg"}
            alt="Profile"
            className="nav-avatar"
          />
          {!!user && <div>{user.name}</div>}
        </>
      ) : isPending ? (
        <i className="bx bx-loader-alt bx-spin bx-sm"></i>
      ) : (
        <i className={`icon ${item.icon} bx-sm`}></i>
      )}
    </a>
  );
};

export default NavLink;
