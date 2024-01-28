import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import { isSuperAdmin } from "../middlewares/IsSuperAdmin";
import { isUser } from "../middlewares/isUser";

// -----------------------------------------------------------------------------

const router = express.Router();
const appointmentController= new AppointmentController();

router.get("/",isSuperAdmin, appointmentController.getAll);
router.get("/:id",auth, appointmentController.getById);
router.post("/", appointmentController.create);
router.patch("/:id", appointmentController.update);
router.delete("/:id", appointmentController.delete);
// router.get("/miscitas/:id", auth, isAdmin, appointmentController.getByArtistId);
// router.get("/miscitasuser/:id", auth, isUser, appointmentController.getByUserId);

export default router;