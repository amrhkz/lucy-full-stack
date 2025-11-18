import { getPost } from "@/lib/data";
import "./single-goal.css";
import DeleteButton from "@/component/goal-card/sub-goal-card/delete-button/delete-button";
import SubGoalCard from "@/component/goal-card/sub-goal-card/sub-goal-card";
import BackButton from "@/component/goal-card/sub-goal-card/back-button/back-button";
import UpdateButton from "@/component/goal-card/sub-goal-card/update-button/update-button";
import { Suspense } from "react";
import GoalLoading from "@/component/loading/goal-loading/goal-loading";

const getData = async (slug) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(`http://localhost:4000/goals/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("SomeThing Went Wrong!");
  }
  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post =  await getData(slug);
  return {
    title: post.title,
    description: post.desc,
  };
};

const SingleGoalPage = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);
  return (
    <div className="section">
      <div className="detail-goal" key={post._id}>
        <div className="left">
          <div className="left-content">
            <div className="buttons">
              <div className="left">
                <BackButton />
              </div>
              <div className="right">
                {/* <DeleteButton id={post._id} onClick={(e) => e.stopPropagation()}/>
                <UpdateButton parentId={post.slug} goalId={post._id} /> */}
              </div>
            </div>
            <img src={`/img/${post.image}`} alt="" />
            <div className="title">
              {post.title}
              <span>{post.prog}%</span>
            </div>
            <div className="goal-card-progress">
              <span style={{ width: `${post.prog}%` }}></span>
            </div>
            <div className="desc">{post.desc}</div>
          </div>
        </div>
        <div className="right">
          <Suspense fallback={<GoalLoading />}>
            <SubGoalCard
              slug={post.slug}
              parentId={post._id}
              lastTask={post.lastSub}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SingleGoalPage;
