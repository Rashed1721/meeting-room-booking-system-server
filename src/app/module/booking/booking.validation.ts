import z from "zod";

const createBookingValidationschema = z.object({
  body: z.object({
    room: z.string({ required_error: "room is required" }),
    slot: z.array(z.string({ required_error: "slot is required" })),
    user: z.string({ required_error: "user is required" }),
    date: z.string({ required_error: "date is required" }),
    totalAmount: z.number().optional(),
    isConfirmed: z
      .enum(["confirmed", "unconfirmed", "cancel"] as [string, ...string[]])
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateBookingValidationschema = z.object({
  body: z.object({
    room: z.string({ required_error: "room is required" }).optional(),
    slot: z.array(z.string({ required_error: "slot is required" })).optional(),
    user: z.string({ required_error: "user is required" }).optional(),
    date: z.string({ required_error: "date is required" }).optional(),
    totalAmount: z.number().optional(),
    isConfirmed: z
      .enum(["confirmed", "unconfirmed", "cancel"] as [string, ...string[]])
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const bookingValidations = {
  createBookingValidationschema,
  updateBookingValidationschema,
};
