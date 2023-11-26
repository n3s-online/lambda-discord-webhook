import * as z from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
});

export type EnvironmentVariables = z.infer<typeof environmentSchema>;
