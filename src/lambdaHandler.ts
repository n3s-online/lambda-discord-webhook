import { Handler } from 'aws-lambda';
import { Webhook } from 'discord-webhook-node';
import * as z from 'zod';

export const environmentSchema = z.object({
    DISCORD_WEBHOOK_URL: z.string(),
    DISCORD_WEBHOOK_USERNAME: z.string().optional(),
});

export type EnvironmentVariables = z.infer<typeof environmentSchema>;
const { DISCORD_WEBHOOK_URL, DISCORD_WEBHOOK_USERNAME } = environmentSchema.parse(process.env);

const hook = new Webhook(DISCORD_WEBHOOK_URL);
if (DISCORD_WEBHOOK_USERNAME) {
    hook.setUsername(DISCORD_WEBHOOK_USERNAME);
}

export const handler: Handler = async (event, context) => {

    await hook.send("Hello from Lambda!");

    return {
        statusCode: 200,
        body: "Message sent."
    };
};
