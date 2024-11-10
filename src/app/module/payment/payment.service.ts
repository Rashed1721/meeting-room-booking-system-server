import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transanctionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transanctionId);
  console.log(verifyResponse);

  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await Booking.findOneAndUpdate(
      { transanctionId },
      { paymentStatus: "Paid" }
    );
  }

  return `
    <div style="
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      background-color: #f0f2f5; 
      padding: 20px; 
      text-align: center;
    ">
      <h1 style="
        font-family: Arial, sans-serif; 
        color: #4CAF50; 
        font-size: 2.5rem; 
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1); 
        padding: 20px; 
        border-bottom: 2px solid #4CAF50;
        max-width: 90%;
      ">
        Payment ${status}
      </h1>
    </div>
  `;
};

export const paymentService = {
  confirmationService,
};
