import { z } from "zod";

export const GetBoardSchema = z.object({
  board_id: z.string().describe("Board ID or Productive.io board URL"),
});

export type GetBoardInput = z.infer<typeof GetBoardSchema>;
