import express from "express";
import { UserController } from "../controllers/UserController";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";
import { auth } from "../middlewares/auth";
import { ProfileController } from "../controllers/ProfileControler";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll);
//router.get("/:id", auth, userController.getById);
router.get("/profile", auth, userController.userProfile); 
router.post("/", userController.create);
router.patch("/:id", auth, userController.update);
router.delete("/:id", auth, isSuperAdmin, userController.delete);
router.get("/profile2", auth, ProfileController.userProfile); 
export default router;
