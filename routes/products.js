const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");

router.route("/show").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
