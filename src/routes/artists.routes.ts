import express from "express";
import { ArtistController } from "../controllers/ArtistController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";
import { isAdmin } from "../middlewares/isAdmin";

// -----------------------------------------------------------------------------

const router = express.Router();
const artistController= new ArtistController();

router.get("/",auth, isSuperAdmin, artistController.getAll);
router.get("/:id", auth, artistController.getById);
router.post("/", artistController.create);
router.patch("/:id", auth, isSuperAdmin, artistController.update);
router.delete("/:id", auth, isSuperAdmin, artistController.delete);


export default router;
// auth, isSuperAdmin,