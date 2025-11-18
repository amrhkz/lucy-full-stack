"use client";
import React, { useEffect, useState } from "react";
import "./banner.css";
import Modal, { ModalMenu, ModalToggle } from "../modal/modal";

function Banner() {
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const [uploadType, setUploadType] = useState(null);
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
      if (data.banner) setBanner(data.banner);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };
  fetchUser();
}, []);


  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) return alert("Upload failed!");

      const newFileUrl = `http://localhost:4000/uploads/${data.fileName}`;

      const field = uploadType === "banner" ? "banner" : "avatar";
      await fetch(`http://localhost:4000/api/user/${userId}/${field}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: newFileUrl }),
      });

      if (uploadType === "banner") setBanner(newFileUrl);
      else setAvatar(newFileUrl);

      alert(`✅ ${uploadType} uploaded & saved successfully!`);
      setFile(null);
      setUploadType(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Failed to upload image");
    }
  };

  return (
    <div className="banner">
      <div className="banner-bg">
        <img src={banner || "./img/banner-2.jpg"} alt="banner" />
        <Modal>
          <ModalToggle>
            <div className="select-img" onClick={() => setUploadType("banner")}>
              <i className="bx bx-dots-horizontal-rounded bx-md"></i>
            </div>
          </ModalToggle>
          <ModalMenu>
            <div className="upload-img">
              <form onSubmit={handleUpload}>
                <div className="title">Upload Your Banner</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">Upload</button>
              </form>
            </div>
          </ModalMenu>
        </Modal>
      </div>

      <Modal>
        <ModalToggle>
          <div className="banner-logo" onClick={() => setUploadType("avatar")}>
            <img src={avatar || "./img/banner-logo.jpg"} alt="avatar" />
            <div className="select-img">
              <i className="bx bx-camera bx-sm"></i>
            </div>
          </div>
        </ModalToggle>
        <ModalMenu>
          <div className="upload-img">
            <form onSubmit={handleUpload}>
              <div className="title">Upload Your Avatar</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit">Upload</button>
            </form>
          </div>
        </ModalMenu>
      </Modal>
    </div>
  );
}

export default Banner;
