import { PrismaClient } from "@prisma/client";
import { HttpResponseHandlder } from "../httpRes/handlerResponse.js";
export const ResponseHandler = new HttpResponseHandlder()

export const prisma = new PrismaClient()
