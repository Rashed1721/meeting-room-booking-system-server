import z from "zod";

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }),
    roomNo: z.number({ required_error: "roomNois required" }),
    floorNo: z.number({ required_error: "floorNo is required" }),
    capacity: z.number({ required_error: "capacity is required" }),
    pricePerSlot: z.number({ required_error: "pricePerSlot is required" }),
    amenities: z.array(z.string()),
    isDeleted: z.boolean().optional(),
  }),
});
const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }).optional(),
    roomNo: z.number({ required_error: "roomNois required" }).optional(),
    floorNo: z.number({ required_error: "floorNo is required" }).optional(),
    capacity: z.number({ required_error: "capacity is required" }).optional(),
    pricePerSlot: z
      .number({ required_error: "pricePerSlot is required" })
      .optional(),
    amenities: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const roomValidations = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
