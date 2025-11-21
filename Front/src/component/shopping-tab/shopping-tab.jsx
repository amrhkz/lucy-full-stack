"use client";
import React, { useEffect, useState } from "react";
import "./shopping-tab.css";
import Modal, { ModalMenu, ModalToggle } from "../modal/modal";
import axios from "axios";

function ShoppingTab() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/products", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("price", price);
    fd.append("desc", desc);
    if (image) fd.append("file", image);

    try {
      const res = await axios.post("/products", fd);
      setTitle("");
      setPrice("");
      setDesc("");
      setImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shopping-tab">
      <div className="shopping-controls">
        <div className="filters">
          <div className="filter-item active">All</div>
          <div className="filter-item">Done</div>
          <div className="filter-item">Ongoing</div>
          <div className="filter-item">Archived</div>
        </div>

        <Modal>
          <ModalToggle>
            <div className="new-shopping">New Product</div>
          </ModalToggle>

          <ModalMenu>
            <div className="new-shopping-menu">
              <form onSubmit={addProduct}>
                <div className="title">Add New Product</div>

                <input
                  type="text"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <button disabled={isLoading}>
                  {isLoading ? (
                    <i className="bx bx-loader-alt bx-spin bx-xs"></i>
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </div>
          </ModalMenu>
        </Modal>
      </div>
      <div className="shopping-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="shopping-item" key={product._id}>
              <img
                src={`http://localhost:4000${product.image}`}
                alt={product.title}
              />
              <div className="details">
                <div className="title">{product.title}</div>
                <div className="price">
                  {Number(product.price).toLocaleString("fa-IR")} تومان
                </div>
              </div>
              <Modal>
                <ModalToggle>
                  <i className="bx bx-dots-horizontal-rounded bx-sm"></i>
                </ModalToggle>

                <ModalMenu>
                  <div className="update-product">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setIsLoading(true);

                        const fd = new FormData();
                        fd.append("title", e.target.title.value);
                        fd.append("price", e.target.price.value);
                        fd.append("desc", e.target.desc.value);
                        if (e.target.image.files[0]) {
                          fd.append("file", e.target.image.files[0]);
                        }

                        try {
                          const res = await fetch(
                            `http://localhost:4000/products/${product._id}`,
                            {
                              method: "PUT",
                              credentials: "include",
                              body: fd,
                            }
                          );

                          if (!res.ok)
                            throw new Error("Failed to update product");

                          const updated = await res.json();

                          setProducts((prev) =>
                            prev.map((p) =>
                              p._id === product._id ? updated : p
                            )
                          );

                          alert("✔️ Product updated successfully!");
                        } catch (err) {
                          console.error(err);
                          alert("❌ Failed to update");
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    >
                      <div className="title">Edit Product</div>

                      <input
                        type="text"
                        name="title"
                        defaultValue={product.title}
                        placeholder="Title"
                        required
                      />
                      <input
                        type="text"
                        name="desc"
                        defaultValue={product.desc}
                        placeholder="Description"
                      />

                      <input
                        type="number"
                        name="price"
                        defaultValue={product.price}
                        placeholder="Price"
                        required
                      />

                      <input type="file" name="image" accept="image/*" />

                      <div className="buttons">
                        <button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <i className="bx bx-loader-alt bx-spin"></i>
                          ) : (
                            "Update"
                          )}
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={async () => {
                            if (!confirm(`Delete "${product.title}" ?`)) return;
                            setIsLoading(true);

                            try {
                              const res = await fetch(
                                `http://localhost:4000/products/${product._id}`,
                                {
                                  method: "DELETE",
                                  credentials: "include",
                                }
                              );

                              if (!res.ok) throw new Error("Failed to delete");

                              setProducts((prev) =>
                                prev.filter((p) => p._id !== product._id)
                              );

                              alert("🗑️ Product deleted");
                            } catch (err) {
                              console.error(err);
                              alert("❌ Delete failed");
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                        >
                          {isLoading ? (
                            <i className="bx bx-loader-alt bx-spin"></i>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </ModalMenu>
              </Modal>
            </div>
          ))
        ) : (
          <p>Product is loading ...</p>
        )}
      </div>
    </div>
  );
}

export default ShoppingTab;
