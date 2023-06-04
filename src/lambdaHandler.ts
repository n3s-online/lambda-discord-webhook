import { Handler } from 'aws-lambda';
import { Webhook } from 'discord-webhook-node';
import * as z from 'zod';

export const lambdaEventSchema = z.object({
    DISCORD_WEBHOOK_URL: z.string(),
    DISCORD_WEBHOOK_USERNAME: z.string().optional(),
});

export type LambdaEvent = z.infer<typeof lambdaEventSchema>;

export const handler: Handler = async (event, context) => {
    const { DISCORD_WEBHOOK_URL, DISCORD_WEBHOOK_USERNAME } = lambdaEventSchema.parse(event);

    const hook = new Webhook(DISCORD_WEBHOOK_URL);
    if (DISCORD_WEBHOOK_USERNAME) {
        hook.setUsername(DISCORD_WEBHOOK_USERNAME);
    }

    await hook.send("Hello from Lambda!");

    return {
        statusCode: 200,
        body: "Message sent."
    };
};
