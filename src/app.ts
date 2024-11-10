import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use(
  cors({ origin: ["https://room-ece-client.vercel.app/"], credentials: true })
);
//routes
app.use("/api/", router);

const test = async (req: Request, res: Response) => {
  res.send("hello world");
};

app.get("/", test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
