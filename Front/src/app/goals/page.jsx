import Container from "@/component/container/container";
import GoalCard from "@/component/goal-card/goal-card";
import MainGoalLoading from "@/component/loading/main-goal-loading/main-goal-loading";
import { Suspense } from "react";

const GoalPage = () => {
  return (
    <>
      <Container>
        <Suspense fallback={<MainGoalLoading/>} >
          <GoalCard />
        </Suspense>
      </Container>
    </>
  );
};

export default GoalPage;
