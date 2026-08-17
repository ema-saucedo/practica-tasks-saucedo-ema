import express from "express";
import { startDB } from "./src/config/database.js";
import { router as userRouter } from "./src/router/userRouter.js";
import { router as taskRouter } from "./src/router/taskRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor listo http://localhost:${PORT}`);
});