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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(process.env.PAYMENT_URL, {
            store_id: process.env.STORE_ID,
            signature_key: process.env.SIGNATURE_KEY,
            tran_id: paymentData.transactionId,
            success_url: `http://localhost:5000/api/payment/confirmation?transanctionId=${paymentData.transactionId}&status=success`,
            fail_url: `http://localhost:5000/api/payment/confirmation?status=Failed`,
            cancel_url: "http://localhost:5173",
            amount: "10.0",
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: paymentData.customerName,
            cus_email: paymentData.customerEmail,
            cus_add1: paymentData.customerAddress,
            cus_add2: "N/A",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1206",
            cus_country: "Bangladesh",
            cus_phone: paymentData.customerPhone,
            type: "json",
        });
        return response.data;
    }
    catch (err) {
        throw new Error("payment initiation failed");
    }
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(process.env.PAYMENT_VERIFY_URL, {
            params: {
                store_id: process.env.STORE_ID,
                signature_key: process.env.SIGNATURE_KEY,
                type: "json",
                request_id: tnxId,
            },
        });
        return response.data;
    }
    catch (err) {
        throw new Error("payment validation failed");
    }
});
exports.verifyPayment = verifyPayment;
