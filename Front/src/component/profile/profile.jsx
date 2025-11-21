import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/userContext";
import NewAuth from "./new-auth/new-auth";
import ShineList from "../shine-list/shine-list";
import Shine from "../shine/shine";
import ShineLoading from "../loading/shine-loading/shine-loading";
import ShineTab from "../shine-list/shine-tab/shine-tab";
import BankTab from "../bank-tab/bank-tab";
import HabbitTab from "../habbit-tab/habit-tab";
import HabitTab from "../habbit-tab/habit-tab";
import ShoppingTab from "../shopping-tab/shopping-tab";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("account");
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const { user, setUser, loading } = useContext(UserContext);
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

  async function registerUser({ name, email, password }) {
    try {
      await axios.post("/register", { name, email, password });
      alert("Registration complete! Now you can login.");
    } catch {
      alert("Registration failed. Try again later.");
    }
  }
  async function handleLoginSubmit({ email, password }) {
    try {
      await axios.post("/login", { email, password });
      const profileRes = await axios.get("/profile");
      setUser(profileRes.data);
      alert("Login Successful");
      setRedirect(true);
    } catch {
      alert("Login Failed!");
    }
  }
  if (redirect) {
    router.push("/");
  }
  if (loading) return <div>در حال بررسی وضعیت ورود...</div>;

  function logout() {
    axios.post("/auth/logout").then(() => {
      setUser(null);
    });
  }

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <>
            <div className="dash-title">Account</div>
            <div className="dash-row">
              <div className="flex gap-[20px]">
                <img src={avatar || "./img/banner-logo.jpg"} alt="Profile" />
                <div className="flex flex-col justify-center w-[250px] gap-[4px]">
                  <label
                    className="text-[12px]"
                    style={{ color: "rgba(255, 255, 255, 0.46)" }}
                    htmlFor=""
                  >
                    Preferred name
                  </label>
                  <input
                    className="text-[14px] rounded-[6px] cursor-text py-[4px] px-[10px] outline-0"
                    style={{ background: "rgba(255, 255, 255, 0.055)" }}
                    type="text"
                    value={user.name}
                  />
                </div>
              </div>
              <div className="text-[#2383e2] text-[14px] mt-[8px] cursor-pointer">
                Create your portrait
              </div>
            </div>
            <div className="dash-title">Account security</div>
            <div className="dash-row flex justify-between items-center">
              <div className="left">
                <div className="title">Email</div>
                <div className="desc">karimzade.ah@gmail.com</div>
              </div>
              <button>Change email</button>
            </div>
            <div className="dash-row flex justify-between items-center">
              <div className="left">
                <div className="title">Password</div>
                <div className="desc">
                  Set a permanent password to login to your account.
                </div>
              </div>
              <button>Add password</button>
            </div>
            <div className="dash-row flex justify-between items-center">
              <div className="left">
                <div className="title">2-step verification</div>
                <div className="desc">
                  Add an additional layer of security to your account during
                  login.
                </div>
              </div>
              <button disabled>Add verification method</button>
            </div>
            <div className="dash-row flex justify-between items-center">
              <div className="left">
                <div className="title">Passkeys</div>
                <div className="desc">
                  Securely sign-in with on-device biometric authentication.
                </div>
              </div>
              <button>Add passkey</button>
            </div>
            <div className="dash-title">Support</div>
            <div className="dash-row flex justify-between items-center">
              <div className="left">
                <div className="title">Support access</div>
                <div className="desc">
                  Grant Notion support temporary access to your account so we
                  can troubleshoot problems or recover content on your behalf.
                  You can revoke access at any time.
                </div>
              </div>
              <button className="toggle-btn">
                <i className="bx  bx-toggle-right bx-md"></i>
              </button>
            </div>
            <div className="dash-row flex justify-between items-center">
              <div className="left">
                <div className="title text-[#de5550]">Delete my account</div>
                <div className="desc">
                  Permanently delete the account and remove access from all
                  workspaces.
                </div>
              </div>
              <button className="toggle-btn">
                <i className="bx  bx-chevron-right bx-sm"></i>
              </button>
            </div>
            <div className="dash-title">Devices</div>
            <div className="dash-row flex justify-between items-center">
              <div className="left">
                <div className="title">Log out of all devices</div>
                <div className="desc">
                  Log out of all other active sessions on other devices besides
                  this one.
                </div>
              </div>
              <button>Log out of all devices</button>
            </div>
          </>
        );
      case "shines":
        return (
          <>
            <div className="dash-title">Shines</div>
            <ShineTab />
          </>
        );
      case "bankCards":
        return (
          <>
            <div className="dash-title">Bank Cards</div>
            <BankTab />
          </>
        );
      case "habits":
        return (
          <>
            <div className="dash-title">Habits</div>
            <HabitTab />
          </>
        );
      case "shopping":
        return (
          <>
            <div className="dash-title">Shopping List</div>
            <ShoppingTab />
          </>
        );
      case "connections":
        return <div className="dash-title">Connections</div>;
      case "general":
        return <div className="dash-title">General Settings</div>;
      default:
        return <div className="dash-title">Select a menu item</div>;
    }
  };
  if (user) {
    return (
      <div className="dashboard">
        <div className="dashboard-card">
          <div className="dashboard-nav">
            <div className="dash-nav-group">
              <div className="group-title text-[12px] text-[#ffffff75] h-[24px] flex items-center">
                Account
              </div>
              <div
                className={`dash-nav-item ${
                  activeSection === "account" ? "active" : ""
                }`}
                onClick={() => setActiveSection("account")}
              >
                <img src={avatar || "./img/banner-logo.jpg"} alt="Profile" />
                {user.name}
              </div>
              <div
                className={`dash-nav-item ${
                  activeSection === "shines" ? "active" : ""
                }`}
                onClick={() => setActiveSection("shines")}
              >
                <i className="bx  bx-slider-alt bx-xs"></i>
                Shines
              </div>
              <div
                className={`dash-nav-item ${
                  activeSection === "bankCards" ? "active" : ""
                }`}
                onClick={() => setActiveSection("bankCards")}
              >
                <i className="bx  bx-bell bx-xs"></i>
                Bank Cards
              </div>
              <div
                className={`dash-nav-item ${
                  activeSection === "habits" ? "active" : ""
                }`}
                onClick={() => setActiveSection("habits")}
              >
                <i className="bx  bx-link bx-xs"></i>
                Habits
              </div>
            </div>
            <div className="dash-nav-group">
              <div className="group-title text-[12px] text-[#ffffff75] h-[24px] flex items-center">
                Financial
              </div>
              <div
                className={`dash-nav-item ${
                  activeSection === "shopping" ? "active" : ""
                }`}
                onClick={() => setActiveSection("shopping")}
              >
                <i className="bx  bx-cart bx-xs"></i>
                Shopping
              </div>
              <div
                className={`dash-nav-item ${
                  activeSection === "bankCards" ? "active" : ""
                }`}
                onClick={() => setActiveSection("bankCards")}
              >
                <i className="bx  bx-credit-card-alt bx-xs"></i>
                Bank Cards
              </div>
              <div className="dash-nav-item">
                <i className="bx  bx-building-house bx-xs"></i>
                Teamspaces
              </div>
              <div className="seperator"></div>
              <div className="dash-nav-item">
                <i className="bx  bx-link bx-xs"></i>
                Notion AI
              </div>
              <div className="dash-nav-item">
                <i className="bx  bx-globe-alt bx-xs"></i>
                Public pages
              </div>
              <div className="dash-nav-item">
                <i className="bx  bx-wink-smile bx-xs"></i>
                Emoji
              </div>
              <div className="dash-nav-item">
                <i className="bx  bx-server bx-xs"></i>
                Connections
              </div>
              <div className="dash-nav-item">
                <i className="bx  bxs-arrow-to-bottom-stroke bx-xs"></i>
                Import
              </div>
              <div className="seperator"></div>
              <div className="dash-nav-item text-[#2383e2]">
                <i className="bx  bxs-arrow-up-stroke-circle bx-xs"></i>
                Upgrade plan
              </div>
            </div>
            <button className="dash-nav-item text-[#de5550]" onClick={logout}>
              <i className="bx  bx-turn-left bx-xs"></i>
              Logout
            </button>
          </div>
          <div className="dashboard-content">{renderContent()}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="profile-row">
      <NewAuth onLogin={(userData) => setUser(userData)} />
    </div>
  );
}

export default Profile;
