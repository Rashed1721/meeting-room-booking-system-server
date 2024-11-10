"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateErrorr = (err) => {
    const message = err.message;
    const regex = /"([^"]*)"/;
    const match = message.match(regex);
    const extractedMessage = match && match[1];
    const errorSource = [
        {
            path: "",
            message: `${extractedMessage} is already extists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: message,
        errorSource,
    };
};
exports.default = handleDuplicateErrorr;
