const asyncHandler = require("../middleware/async");
const Item = require("../models/Item");

// @desc    Get items
// @route   GET /api/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user.id });

  res.status(200).json(items);
});

// @desc    Get item
// @route   GET /api/items/:id
// @access  Private
const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  res.status(200).json(item);
});

// @desc    Get item
// @route   GET /api/items/:id
// @access  Private
const updateStatus = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  item.status = !item.status;

  await item.save();

  res.status(200).json(item);
});

// @desc    add Item
// @route   POST /api/item
// @access  Private
const addItem = asyncHandler(async (req, res) => {
  const { title, price, desc } = req.body;

  if (!title || !price || !desc) {
    res.status(400);
    throw new Error("Please provide all  text fields");
  }

  const item = await Item.create({
    title,
    price,
    desc,
    user: req.user.id,
  });

  res.status(200).json(item);
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the item user
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedTodo = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the item user
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await item.remove();

  res.status(200).json({ id: item._id });
});

module.exports = {
  addItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
  updateStatus,
};
