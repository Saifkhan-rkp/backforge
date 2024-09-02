import { Router } from "express";
import { createTest, deleteTest, getTest, updateTest } from "./module.controller";

const testRouter = Router();

testRouter.post("/create", createTest);

testRouter.get("/get/:id", getTest);

testRouter.put("/update/:id", updateTest);

testRouter.delete("/delete/:id", deleteTest);

export default testRouter