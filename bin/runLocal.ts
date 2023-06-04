import { config } from 'dotenv';
config();

import * as userCode from "../src/lambdaHandler";
import { Context } from 'aws-lambda';

const localEvent: userCode.LambdaEvent = {
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL!,
    DISCORD_WEBHOOK_USERNAME: "Local Test",
};

userCode.handler(localEvent, {} as Context, () => { });