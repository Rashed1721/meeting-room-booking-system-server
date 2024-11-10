import { Request, Response } from "express";
import { paymentService } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
  // console.log(req.query.transanctionId);
  const { transanctionId, status } = req.query;
  const result = await paymentService.confirmationService(
    transanctionId as string,
    status as string
  );

  res.send(result);
};

export const paymentController = { confirmationController };
