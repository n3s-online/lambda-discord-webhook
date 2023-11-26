#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CronOptions } from "aws-cdk-lib/aws-events";
import { config } from "dotenv";
import "source-map-support/register";
import { TypescriptLambdaStack } from "../lib/typescript-lambda-stack";
import { EnvironmentVariables, environmentSchema } from "../src/environment";
import { LambdaEvent } from "../src/lambdaHandler";
config();

const environment: EnvironmentVariables = environmentSchema.parse(process.env);

const app = new cdk.App();

const lambdaEvent: LambdaEvent = {
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL!,
  DISCORD_WEBHOOK_USERNAME: "Webby",
};
// Cron Rule is in UTC
const cronRule: CronOptions = {
  hour: "18",
  minute: "00",
};

new TypescriptLambdaStack(app, "TypescriptLambdaStack", {
  events: [{ event: lambdaEvent, schedule: cronRule }],
  environment,
});
