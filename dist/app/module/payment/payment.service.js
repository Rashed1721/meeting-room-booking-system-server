"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const booking_model_1 = require("../booking/booking.model");
const payment_utils_1 = require("./payment.utils");
const confirmationService = (transanctionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transanctionId);
    console.log(verifyResponse);
    let result;
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        result = yield booking_model_1.Booking.findOneAndUpdate({ transanctionId }, { paymentStatus: "Paid" });
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
});
exports.paymentService = {
    confirmationService,
};
