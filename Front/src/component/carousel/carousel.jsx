"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./carousel.css";
import { useEffect, useState } from "react";
import AddProduct from "../add-product/add-product";
import Modal, { ModalMenu, ModalToggle } from "../modal/modal";

export default function Carousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی گرفتن داده از سرور
    const fetchProducts = async () => {
      try {
        const fakeProducts = [
          {
            name: "کفش اسپرت نایک",
            desc: "مناسب برای پیاده‌روی و ورزش روزانه",
            price: 1850000,
          },
          {
            name: "ساعت هوشمند شیائومی",
            desc: "نمایش ضربان قلب و نوتیفیکیشن‌ها",
            price: 2250000,
          },
          {
            name: "هدفون بلوتوثی سونی",
            desc: "دارای نویز کنسلینگ و کیفیت صدای عالی",
            price: 3100000,
          },
          {
            name: "کوله‌پشتی لپ‌تاپ",
            desc: "ضدآب و سبک با جای لپ‌تاپ ۱۵ اینچ",
            price: 890000,
          },
          {
            name: "ماگ حرارتی طرح فانتزی",
            desc: "تغییر رنگ با دمای مایع داخل",
            price: 240000,
          },
          {
            name: "ماگ حرارتی طرح فانتزی",
            desc: "تغییر رنگ با دمای مایع داخل",
            price: 240000,
          },
          {
            name: "ماگ حرارتی طرح فانتزی",
            desc: "تغییر رنگ با دمای مایع داخل",
            price: 240000,
          },
        ];

        // به عنوان داده از سرور
        await new Promise((r) => setTimeout(r, 700)); // فقط برای شبیه‌سازی delay
        setProducts(fakeProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="shopping-list">
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="shopping-card">
              {product.img ? (
                <img src={product.img} alt={product.name} />
              ) : (
                <div className="no-image">📦 تصویر موجود نیست</div>
              )}

              <div className="detail">
                <div className="title">{product.name}</div>
                <div className="desc">{product.desc}</div>
                <div className="price">
                  {Number(product.price).toLocaleString("fa-IR")} تومان
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>
          <Modal>
            <ModalToggle>
              <button className="add-product">+</button>
            </ModalToggle>
            <ModalMenu>
              <form>
                <input
                  className="desc-input input"
                  type="text"
                  placeholder="Task Title"
                  name="title"
                  // value={title}
                  // onChange={handleTitleChange}
                />
                <input
                  className="desc-input input"
                  type="hidden"
                  placeholder="Task Slug"
                  name="slug"
                  // value={slug}
                  readOnly
                />
                <button className="create-btn">Create Task</button>
              </form>
            </ModalMenu>
          </Modal>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
