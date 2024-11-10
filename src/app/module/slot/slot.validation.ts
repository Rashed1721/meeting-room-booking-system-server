import z from "zod";

const createSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string({ required_error: "room is required" }),
      date: z
        .string({ required_error: "date is required" })
        .refine(
          (date) => {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateRegex.test(date);
          },
          {
            message: "Invalid date format  ,expected like this 'YY:MM:DD'  ",
          }
        )
        .transform((date) => new Date(date)),
      startTime: z.string({ required_error: "startTime is required" }).refine(
        (time) => {
          const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return timeRegex.test(time);
        },
        {
          message:
            "Invalid Time format , Follow  24 hour time format ,expected like this 'HH:MM'  ",
        }
      ),
      endTime: z.string({ required_error: "endTime is required" }).refine(
        (time) => {
          const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return timeRegex.test(time);
        },
        {
          message:
            "Invalid Time format , Follow  24 hour time format ,expected like this 'HH:MM'  ",
        }
      ),
      isBooked: z
        .boolean({ required_error: "isBooked is required" })
        .optional(),
    })
    .refine(
      (body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}`);
        const endtTime = new Date(`1970-01-01T${body.endTime}`);

        return endtTime > startTime;
      },
      {
        message: "start time should be before  end time",
      }
    ),
});

export const slotValidations = {
  createSlotValidationSchema,
};
