const mongoose = require("mongoose");
const Post = require("../models/goal");

exports.getGoals = async (req, res) => {
  try {
    const goals = await Post.find({ user: req.user.id }).sort({
      mindOrder: 1,
      order: 1,
    });

    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: "Failed to get goals" });
  }
};

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "") +
  "-" +
  Date.now();

exports.createGoal = async (req, res) => {
  try {
    const { parentId, title, isSibling } = req.body;

    // 🔹 مقدار والد نهایی
    let finalParentId;
    if (
      !parentId ||
      parentId === "dream-list-root" ||
      parentId === "000000000000000000000000"
    ) {
      finalParentId = new mongoose.Types.ObjectId("000000000000000000000000");
    } else {
      finalParentId = new mongoose.Types.ObjectId(parentId);
    }

    // 🔹 آیا هدف اصلی است؟
    const isMainGoal =
      parentId === "000000000000000000000000" ||
      parentId === "dream-list-root" ||
      !parentId;

    // 🔹 شمارش اهداف هم‌سطح برای ترتیب (order)
    const siblingCount = await Post.countDocuments({
      parentId: finalParentId,
      user: req.user.id,
    });

    // 🔹 ساخت هدف جدید
    const newGoalData = {
      title,
      desc: "No description yet",
      slug: slugify(title),
      parentId: finalParentId,
      order: siblingCount + 1, // ✅ میره آخر لیست
      mindOrder: Date.now(),
      mainGoal: isMainGoal,
      user: req.user.id,
    };

    const goal = await Post.create(newGoalData);

    console.log(
      `✅ Goal created: "${goal.title}" | mainGoal: ${goal.mainGoal} | parentId: ${goal.parentId} | order: ${goal.order}`
    );

    res.json(goal);
  } catch (err) {
    console.error("🔥 Error creating goal:", err);
    res.status(500).json({ error: "Failed to create goal" });
  }
};

exports.getGoalTree = async (req, res) => {
  try {
    const goals = await Post.find({ user: req.user.id }).lean(); // 👈 فقط هدف‌های این کاربر
    const ROOT_ID = "000000000000000000000000";

    const map = {};
    goals.forEach((g) => {
      map[g._id.toString()] = {
        ...g,
        id: g._id.toString(),
        children: [],
      };
    });

    const roots = [];
    goals.forEach((g) => {
      const parentId = g.parentId?.toString();
      if (parentId && parentId !== ROOT_ID) {
        if (map[parentId]) {
          map[parentId].children.push(map[g._id.toString()]);
        }
      } else {
        roots.push(map[g._id.toString()]);
      }
    });

    Object.values(map).forEach((node) => {
      node.children.sort((a, b) => a.order - b.order);
    });

    roots.sort((a, b) => a.order - b.order);

    const tree = [
      {
        id: "dream-list-root",
        title: "Dream List",
        children: roots,
      },
    ];

    res.json(tree);
  } catch (err) {
    console.error("Error building tree:", err);
    res.status(500).json({ error: "Failed to build tree" });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const objId = new mongoose.Types.ObjectId(id);

    const targetNode = await Post.findOne({ _id: objId, user: req.user.id });
    if (!targetNode) {
      return res.status(404).json({ error: "Goal not found or not yours" });
    }

    const deleteRecursively = async (nodeId) => {
      const children = await Post.find({ parentId: nodeId, user: req.user.id });
      for (const child of children) {
        await deleteRecursively(child._id);
      }
      await Post.findByIdAndDelete(nodeId);
    };

    await deleteRecursively(objId);

    res.json({ success: true, message: "Goal and its children deleted" });
  } catch (err) {
    console.error("🔥 Error deleting goal:", err);
    res.status(500).json({ error: "Failed to delete goal" });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const { title } = req.body;
    const goal = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // فقط هدف‌های خودش
      { title },
      { new: true }
    );
    if (!goal)
      return res.status(404).json({ error: "Goal not found or not yours" });
    res.json(goal);
  } catch (err) {
    console.error("🔥 Error updating goal:", err);
    res.status(500).json({ error: "Failed to update goal" });
  }
};

exports.getGoalBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const goal = await Post.findOne({ slug, user: req.user.id }); // 👈 محدود به یوزر
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.json(goal);
  } catch (err) {
    console.error("🔥 Error fetching goal:", err);
    res.status(500).json({ error: "Failed to fetch goal" });
  }
};

exports.reorderGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { direction } = req.body;

    const goal = await Post.findOne({ _id: id, user: req.user.id });
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    const filter = goal.parentId
      ? { parentId: goal.parentId, user: req.user.id }
      : { parentId: null, user: req.user.id };

    const siblings = await Post.find(filter).sort({ order: 1 });

    const currentIndex = siblings.findIndex((g) => g._id.toString() === id);
    if (currentIndex === -1)
      return res.status(404).json({ error: "Node not found in siblings" });

    let targetIndex =
      direction === "up"
        ? currentIndex - 1
        : direction === "down"
        ? currentIndex + 1
        : null;

    if (targetIndex < 0 || targetIndex >= siblings.length) {
      return res.status(400).json({ error: "Cannot move in that direction" });
    }

    const currentNode = siblings[currentIndex];
    const targetNode = siblings[targetIndex];

    const tempOrder = currentNode.order;
    currentNode.order = targetNode.order;
    targetNode.order = tempOrder;

    await currentNode.save();
    await targetNode.save();

    res.json({ success: true, message: "Goal reordered successfully" });
  } catch (err) {
    console.error("🔥 Error reordering goal:", err);
    res.status(500).json({ error: "Failed to reorder goal" });
  }
};

exports.liftGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const node = await Post.findOne({ _id: id, user: req.user.id });
    if (!node) return res.status(404).json({ error: "Node not found" });

    if (!node.parentId) {
      return res.status(400).json({ error: "Root node cannot be lifted" });
    }

    const parent = await Post.findOne({
      _id: node.parentId,
      user: req.user.id,
    });
    if (!parent) {
      return res.status(500).json({ error: "Parent node not found" });
    }

    const grandParentId = parent.parentId || null;

    const siblingCount = await Post.countDocuments({
      parentId: grandParentId,
      user: req.user.id,
    });

    node.parentId = grandParentId;
    node.order = siblingCount + 1;
    await node.save();

    res.json({ success: true, message: "Node lifted to higher level" });
  } catch (err) {
    console.error("🔥 Error lifting node:", err);
    res.status(500).json({ error: "Failed to lift node" });
  }
};

exports.sinkGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const node = await Post.findOne({ _id: id, user: req.user.id });
    if (!node) return res.status(404).json({ error: "Node not found" });

    const filter = node.parentId
      ? { parentId: node.parentId, user: req.user.id }
      : { parentId: null, user: req.user.id };

    const siblings = await Post.find(filter).sort({ order: 1 });

    const currentIndex = siblings.findIndex((n) => n._id.toString() === id);
    if (currentIndex <= 0) {
      return res
        .status(400)
        .json({ error: "No previous sibling to sink into" });
    }

    const previousNode = siblings[currentIndex - 1];

    const childCount = await Post.countDocuments({
      parentId: previousNode._id,
      user: req.user.id,
    });

    node.parentId = previousNode._id;
    node.order = childCount + 1;
    await node.save();

    res.json({
      success: true,
      message: "Node sunk to lower level (child of previous node)",
    });
  } catch (err) {
    console.error("🔥 Error sinking node:", err);
    res.status(500).json({ error: "Failed to sink node" });
  }
};

exports.getLeafGoals = async (req, res) => {
  try {
    const allGoals = await Post.find({ user: req.user.id }).lean();
    const parentIds = new Set(
      allGoals.map((g) => g.parentId?.toString()).filter(Boolean)
    );
    const leafGoals = allGoals.filter((g) => !parentIds.has(g._id.toString()));
    res.json(leafGoals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaf goals" });
  }
};

exports.toggleGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Post.findOne({ _id: id, user: req.user.id });
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    goal.status = goal.status?.toLowerCase() === "done" ? "todo" : "done";
    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error("🔥 Error toggling goal:", err);
    res.status(500).json({ error: "Failed to toggle goal" });
  }
};

exports.toggleCollapse = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Post.findOne({ _id: id, user: req.user.id });
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    goal.collapsed = !goal.collapsed;
    await goal.save();

    res.json({ success: true, collapsed: goal.collapsed });
  } catch (err) {
    console.error("🔥 Error toggling collapse:", err);
    res.status(500).json({ error: "Failed to toggle collapse" });
  }
};

exports.swapMindOrder = async (req, res) => {
  try {
    const { idA, idB } = req.body;
    if (!idA || !idB)
      return res.status(400).json({ error: "Both task IDs are required" });

    const taskA = await Post.findOne({ _id: idA, user: req.user.id });
    const taskB = await Post.findOne({ _id: idB, user: req.user.id });

    if (!taskA || !taskB)
      return res.status(404).json({ error: "One or both tasks not found" });

    // اگر mindOrder وجود ندارد، مقدار پیش‌فرض بده
    if (taskA.mindOrder == null) taskA.mindOrder = Date.now();
    if (taskB.mindOrder == null) taskB.mindOrder = Date.now() + 1;

    const temp = taskA.mindOrder;
    taskA.mindOrder = taskB.mindOrder;
    taskB.mindOrder = temp;

    await taskA.save();
    await taskB.save();

    console.log("✅ Updated mindOrders:", taskA.mindOrder, taskB.mindOrder);

    res.json({ success: true, message: "mindOrder swapped successfully" });
  } catch (err) {
    console.error("🔥 Error swapping mindOrder:", err);
    res.status(500).json({ error: "Failed to swap mindOrder" });
  }
};
