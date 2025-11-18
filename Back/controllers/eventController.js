const Event = require("../models/event");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to get Events!" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to update event!" });
  }
};
