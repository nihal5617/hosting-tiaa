import bidController from "../app/http/controllers/bidController.js";
import projectController from "../app/http/controllers/productController.js";
import updateStatusController from "../app/http/controllers/updateStatusController.js";
import userController from "../app/http/controllers/userController.js";
import adminController from "../app/http/controllers/adminController.js";
import imageUpload from "../app/middleware/multer.js";

const routes = (app) => {
  // User routes
  app.post("/user/login", userController().login);
  app.post("/user/register", userController().register);
  app.post("/user/verifyOtp", userController().verifyOtp);
  app.get("/user/:userId/products", userController().getUserProducts);
  app.get("/user/:userId/products/bought", userController().getBoughtProducts);
  app.get("/user/:userId/products/bided", userController().getBidedProducts);

  // Product routes
  app.post(
    "/product/create",
    imageUpload.single("image"),
    projectController().createProduct
  );
  app.get("/products", projectController().getProducts);
  app.get("/product/:productId", projectController().getProduct);
  app.get("/product", projectController().getAllTypesCount);

  // Bid routes
  app.post("/bid/create", bidController().createBid);

  // Update status routes
  app.get("/updateStatus", updateStatusController().updateStatus);

  // Admin routes
  app.get("/admin/products/sorted", adminController().getProuctsWithHighestBidInsortedOrder);
  app.get("/admin/products/maxBids", adminController().getProductsWithMaxBids);
  app.get("/admin/products/quickest", adminController().getQuickestRecurringBidsProducts);
};

export default routes;
