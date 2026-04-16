const Ticket = require("../models/ticket.model");
const { processTicket } = require("../services/ai.service");

exports.createTicket = async (req, res) => {
  try {
    const { name, email, description,category } = req.body;

    //  VALIDATION
    if (!name || !email || !description) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    if (description.length < 10) {
      return res.status(400).json({
        error: "Description must be at least 10 characters",
      });
    }

    const ai = await processTicket(description);

    const ticket = await Ticket.create({
      name,
      email,
      description,
      category: category|| ai.category,
      aiReply: ai.reply,
      confidence: ai.confidence,
    });

    res.json({
      ticketId: ticket._id,
      status: ticket.status,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
};

exports.getTicket = async (req, res) => {
  const t = await Ticket.findById(req.params.id);
  res.json(t);
};

exports.updateStatus = async (req, res) => {
  await Ticket.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ success: true });
};

exports.updateReply = async (req, res) => {
  const { reply } = req.body;

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { aiReply: reply },
    { new: true }
  );

  res.json({ success: true, ticket });
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
