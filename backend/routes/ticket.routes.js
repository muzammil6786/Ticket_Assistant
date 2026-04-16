const router = require("express").Router();
const c = require("../controllers/ticket.controller");

router.post("/tickets", c.createTicket);
router.get("/tickets", c.getTickets);
router.get("/tickets/:id", c.getTicket);
router.post("/tickets/:id/status", c.updateStatus);
router.post("/tickets/:id/reply", c.updateReply);
router.delete("/tickets/:id", c.deleteTicket);

module.exports = router;
