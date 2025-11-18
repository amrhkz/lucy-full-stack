const Money = require("../models/money");

exports.getMoney = async (req, res) => {
  try {
    const userId = req.user.id;
    let moneys = await Money.find({ user: userId });

    // اگر هیچ money برای کاربر وجود نداشت → پیش‌فرض‌ها ساخته می‌شن
    if (moneys.length === 0) {
      const baseDefaults = [
        { title: "Storage", slug: "storage" },
        { title: "Charity", slug: "charity" },
        { title: "Investing", slug: "investing" },
        { title: "Shopping", slug: "shopping" },
      ];

      const userSlugSuffix = userId.toString().slice(0, 4); // ← ۴ رقم اول آیدی کاربر

      const userDefaults = baseDefaults.map((item) => ({
        ...item,
        slug: `${item.slug}-${userSlugSuffix}`, // ← شخصی‌سازی slug
        user: userId,
        targetMoney: 0,
        currentMoney: 0,
        financeTask: [],
      }));

      // ساختن همه‌ی پیش‌فرض‌ها برای این کاربر
      await Money.insertMany(userDefaults);
      moneys = await Money.find({ user: userId });
    }

    res.json(moneys);
  } catch (err) {
    console.error("🔥 Error in getMoney:", err);
    res.status(500).json({ error: "Failed to get moneys" });
  }
};

exports.allocateIncome = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id; // از توکن گرفته میشه

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Amount is required and must be a number" });
    }

    // درصدها
    const percentages = {
      storage: 0.2,
      charity: 0.1,
      investing: 0.2,
      shopping: 0.5,
    };

    const slugSuffix = userId.slice(0, 4);

    const categories = ["storage", "charity", "investing", "shopping"];

    // برای هر دسته، افزایش targetMoney
    for (const key of categories) {
      const slug = `${key}-${slugSuffix}`;
      const money = await Money.findOne({ user: userId, slug });

      if (money) {
        money.targetMoney += amount * percentages[key];
        await money.save();
      } else {
        console.warn(`⚠️ No money found for ${slug}, skipping`);
      }
    }

    console.log("✅ Income allocated successfully");
    res.json({ success: true });
  } catch (error) {
    console.error("🔥 Error allocating income:", error);
    res.status(500).json({ error: "Failed to allocate income" });
  }
};