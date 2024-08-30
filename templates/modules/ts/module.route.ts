import { Router } from "express";
import { createTest, deleteTest, getTest, updateTest } from "./module.controller";

const testRouter = Router();

testRouter.post("/", createTest);

testRouter.get("/get/:id", getTest);

testRouter.put("/:id", updateTest);

testRouter.delete("/:id", deleteTest);

export default testRouter