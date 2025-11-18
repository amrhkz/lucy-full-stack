import "@/app/home.css";
import Banner from "@/component/banner/banner";
import Calendar from "@/component/calendar/calendar";
import Container from "@/component/container/container";
import EventTimerList from "@/component/event-timer/event-timer-list/event-timer-list";
import GoalCard from "@/component/goal-card/goal-card";
import MainGoalLoading from "@/component/loading/main-goal-loading/main-goal-loading";
import ShineList from "@/component/shine-list/shine-list";
import { Suspense, useContext } from "react";

export default function Home() {
  return (
    <Container>
      <Banner />
      <div className="flex p-[24px]">
        {/* <div className="row g-24">
          <Suspense fallback={<TopTasksLoading />}>
            <TopTasks />
          </Suspense>
          <CountdownTimer />
        </div> */}
        {/* <DayCard /> */}
        <div className="flex w-full justify-between">
          <div>
            <Suspense fallback={<MainGoalLoading />}>
              <GoalCard />
            </Suspense>
          </div>
          <div className="flex flex-col gap-[24px]">
            <EventTimerList />
            <ShineList />
          </div>
        </div>
      </div>
      <div className="flex p-[24px]">
        <Calendar />
      </div>
    </Container>
  );
}
