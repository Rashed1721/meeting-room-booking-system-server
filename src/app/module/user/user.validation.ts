import z from "zod";

const createUserschemaValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }),

    email: z
      .string({ required_error: "email is required" })
      .email({ message: "email is not valid" }),
    password: z.string({ required_error: "password is required" }),
    phone: z.string({ required_error: "phone number is required" }),
    address: z.string({ required_error: "address is required" }),
    role: z.enum(["admin", "user"] as [string, ...string[]]),
  }),
});

export const userValidations = {
  createUserschemaValidation,
};
