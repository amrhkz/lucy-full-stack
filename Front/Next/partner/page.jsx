"use client";
import Container from "@/component/container/container";
import React from "react";
import "./partner.css";
import Modal, { ModalMenu, ModalToggle } from "@/component/modal/modal";

const partners = [
  {
    id: 1,
    firstName: "Soheila",
    lastName: "Khezerlou",
    age: 28,
    job: "Police",
    height: "---",
    weight: "---",
    footSize: "---",
    footBeauty: "---",
    education: "---",
    status: "---",
    wealth: "---",
    neighbourhood: "---",
    religious: "---",
    cooking: "---",
    bodyShape: "---",
    image: "/img/partner-1.jpg",
  },
  {
    id: 2,
    firstName: "Marjan",
    lastName: "Sadeghian",
    age: "---",
    job: "Trader",
    height: "---",
    weight: "---",
    footSize: "---",
    footBeauty: "---",
    education: "---",
    status: "---",
    wealth: "---",
    neighbourhood: "---",
    religious: "---",
    cooking: "---",
    bodyShape: "---",
    image: "/img/partner-4.jpg",
  },
  {
    id: 3,
    firstName: "Fatemeh",
    lastName: "Mahmoudlou",
    age: "---",
    job: "Structor",
    height: "---",
    weight: "---",
    footSize: "---",
    footBeauty: "---",
    education: "---",
    status: "---",
    wealth: "---",
    neighbourhood: "---",
    religious: "---",
    cooking: "---",
    bodyShape: "---",
    image: "/img/partner-3.jpg",
  },
  {
    id: 4,
    firstName: "Tina",
    lastName: "Habibi",
    age: 24,
    job: "---",
    height: "---",
    weight: "---",
    footSize: "---",
    footBeauty: "---",
    education: "Bachelor's Degree",
    status: "---",
    wealth: "---",
    neighbourhood: "---",
    religious: "---",
    cooking: "---",
    bodyShape: "---",
    image: "/img/partner-2.jpg",
  },
  {
    id: 5,
    firstName: "Somayyeh",
    lastName: "Nobakht",
    age: "---",
    job: "Teacher",
    height: "---",
    weight: "---",
    footSize: "---",
    footBeauty: "---",
    education: "Bachelor's Degree",
    status: "---",
    wealth: "---",
    neighbourhood: "---",
    religious: "---",
    cooking: "---",
    bodyShape: "---",
    image: "/img/partner-5.jpg",
  },
  {
    id: 6,
    firstName: "Reyhaneh",
    lastName: "Gharebaghi",
    age: "---",
    job: "---",
    height: "---",
    weight: "---",
    footSize: "---",
    footBeauty: "---",
    education: "Bachelor's Degree",
    status: "---",
    wealth: "---",
    neighbourhood: "---",
    religious: "---",
    cooking: "---",
    bodyShape: "---",
    image: "/img/partner-6.jpg",
  },
  {
    id: 7,
    firstName: "Kimia",
    lastName: "Karimzadeh",
    age: 21,
    job: "Photographer",
    height: "---",
    weight: "---",
    footSize: "---",
    footBeauty: 6,
    education: "Bachelor's Degree",
    status: "---",
    wealth: "---",
    neighbourhood: "---",
    religious: "---",
    cooking: "---",
    bodyShape: "---",
    image: "/img/partner-7.jpg",
  },
  {
    id: 8,
    firstName: "Marzieh",
    lastName: "Yazdani",
    age: 25,
    job: "No Job",
    height: "---",
    weight: "---",
    footSize: 38,
    footBeauty: 8,
    education: "Bachelor's Degree",
    status: "---",
    wealth: "---",
    neighbourhood: "---",
    religious: "---",
    cooking: "---",
    bodyShape: "---",
    image: "/img/partner-8.jpg",
  },
];

function Page() {
  return (
    <Container>
      <div className="partner-list">
        {partners.map((partner) => (
          <Modal>
            <ModalToggle>
              <div key={partner.id} className="partner-card">
                <img
                  src={partner.image}
                  alt={`${partner.firstName} ${partner.lastName}`}
                />
                <div className="content">
                  <div className="name">
                    <div className="f-name">{partner.firstName}</div>
                    <div className="l-name">{partner.lastName}</div>
                    <svg
                      className="w-[16px]"
                      dataTestid="icon-verified"
                      viewBox="0 0 22 22"
                      fill="var(--primary)"
                    >
                      <path d="M20.396 11a3.49 3.49 0 0 0-2.008-3.062 3.47 3.47 0 0 0-.742-3.584 3.474 3.474 0 0 0-3.584-.742A3.47 3.47 0 0 0 11 1.604a3.46 3.46 0 0 0-3.053 2.008 3.47 3.47 0 0 0-1.902-.14c-.635.13-1.22.436-1.69.882a3.461 3.461 0 0 0-.734 3.584A3.49 3.49 0 0 0 1.604 11a3.496 3.496 0 0 0 2.017 3.062 3.471 3.471 0 0 0 .733 3.584 3.49 3.49 0 0 0 3.584.742A3.49 3.49 0 0 0 11 20.396a3.48 3.48 0 0 0 3.062-2.007 3.335 3.335 0 0 0 4.326-4.327A3.49 3.49 0 0 0 20.396 11M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                    </svg>
                  </div>
                  <div className="flex gap-[24px]">
                    <div className="age">
                      Age:{" "}
                      <span className="text-(--second)">{partner.age}</span>
                    </div>
                    <div className="job">
                      Job:{" "}
                      <span className="text-(--second)">{partner.job}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ModalToggle>
            <ModalMenu>
              <div className="partner-detail">
                <img src={partner.image} alt={partner.firstName} />
                <div className="details">
                  <div className="item">
                    <div className="title">Name :</div>
                    <div className="desc">
                      {partner.firstName} {partner.lastName}
                    </div>
                  </div>
                  <div className="item">
                    <div className="title">Age :</div>
                    <div className="desc">{partner.age}</div>
                  </div>
                  <div className="item">
                    <div className="title">Job:</div>
                    <div className="desc">{partner.job}</div>
                  </div>
                  <div className="item">
                    <div className="title">Education :</div>
                    <div className="desc">{partner.education}</div>
                  </div>
                  <div className="item">
                    <div className="title">Foot Size :</div>
                    <div className="desc">{partner.footSize}</div>
                  </div>
                  <div className="item">
                    <div className="title">Foot Beauty :</div>
                    <div className="desc">{partner.footBeauty} / 10</div>
                  </div>
                  <div className="item">
                    <div className="title">Cooking :</div>
                    <div className="desc">{partner.cooking}</div>
                  </div>
                  <div className="item">
                    <div className="title">Body Shape :</div>
                    <div className="desc">{partner.bodyShape}</div>
                  </div>
                </div>
              </div>
            </ModalMenu>
          </Modal>
        ))}
      </div>
    </Container>
  );
}

export default Page;
