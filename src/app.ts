import express, { Application } from "express";
import router from "./router";
import cors  from 'cors';

// -----------------------------------------------------------------------------

const app: Application = express();
app.use(cors({ origin: true, methods: ["GET", "POST", "PATCH", "UPDATE", "DELETE"]}));
// Middlewares
app.use(express.json());


// Rutas
app.use(router)


export default app;
