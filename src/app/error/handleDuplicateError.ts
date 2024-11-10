import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateErrorr = (err: any): TGenericErrorResponse => {
  const message = err.message;
  const regex = /"([^"]*)"/;
  const match = message.match(regex);

  const extractedMessage = match && match[1];

  const errorSource: TErrorSource = [
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

export default handleDuplicateErrorr;
