const router = require("express").Router();
const {
  getItem,
  getItems,
  updateItem,
  addItem,
  deleteItem,
  updateStatus,
} = require("../controllers/items");
const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getItems).post(addItem);
router.route("/status/:id").put(updateStatus);
router.route("/:id").get(getItem).put(updateItem).delete(deleteItem);

module.exports = router;
