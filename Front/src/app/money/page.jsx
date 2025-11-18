"use client";
import React, { useEffect, useState } from "react";
import "@/app/money/money.css";
import Container from "@/component/container/container";
import MoneyCell from "@/component/money-cell/money-cell";
import Income from "@/component/money-cell/income/income";
import ShoppingList from "@/component/shopping-list/shopping-list";
import Carousel from "@/component/carousel/carousel";
import { Tab, TabItem, TabMenu, TabPanel } from "@/component/tab/tab";
import BankCard from "@/component/bank-card/bank-card";
import ShoppingTab from "@/component/shopping-tab/shopping-tab";

const page = () => {
  const [moneys, setMoneys] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchMoneys = async () => {
      try {
        const res = await fetch("http://localhost:4000/moneys", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setMoneys(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMoneys();
  }, []);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("http://localhost:4000/banks", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setBanks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanks();
  }, []);

  return (
    <>
      <Container>
        <Tab>
          <TabMenu defaultActive={0}>
            <TabItem index={0} icon="bx-dollar">
              Money Management
            </TabItem>
            <TabItem index={1} icon="bx-cart">
              Shopping List
            </TabItem>
            <TabItem index={2} icon="bx-donate-heart">
              Debts
            </TabItem>
            <TabItem index={3} icon="bx-credit-card-alt">
              Cards
            </TabItem>
          </TabMenu>
          <TabPanel index={0}>
            <div className="flex p-[24px] w-full">
              <Income />
            </div>
            <div className="flex p-[24px] w-full justify-between">
              {moneys.map((money) => (
                <div key={money._id} className="money-section">
                  <MoneyCell
                    title={money.title}
                    prog={(
                      (money.currentMoney / money.targetMoney) *
                      100
                    ).toFixed(2)}
                    target={money.targetMoney}
                    current={money.currentMoney}
                  />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel index={1}>
            <ShoppingTab />
          </TabPanel>
          <TabPanel index={2}>
            {moneys.map((money) => (
              <div key={money._id}>
                {money.financeTask && money.financeTask.length > 0 && (
                  <div className="finance-task-list">
                    {money.financeTask
                      .filter((task) => task.done !== "Done")
                      .map((task, index) => (
                        <div key={index} className="finance-task">
                          <div className="title">{task.title}</div>
                          <div className="price">
                            {task.price.toLocaleString()} تومان
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </TabPanel>
          <TabPanel index={3}>
            <div className="flex justify-around">
              {banks.length > 0 ? (
                banks.map((bank) => (
                  <BankCard
                    key={bank._id}
                    id={bank._id}
                    bank={bank.bank}
                    balance={bank.balance}
                    cardNum={bank.cardNum}
                    cvv={bank.cvv}
                    expiry={bank.expiry}
                    owner={bank.owner}
                    iban={bank.iban}
                  />
                ))
              ) : (
                <p>Bank is loading ...</p>
              )}
            </div>
          </TabPanel>
        </Tab>
      </Container>
    </>
  );
};

export default page;
