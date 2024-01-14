import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";

// -----------------------------------------------------------------------------

const router = express.Router();
const appointmentController= new AppointmentController();

router.get("/", appointmentController.getAll);
router.get("/:id", appointmentController.getById);
router.post("/", appointmentController.create);
router.patch("/:id", appointmentController.update);
router.delete("/:id", appointmentController.delete);

export default router;