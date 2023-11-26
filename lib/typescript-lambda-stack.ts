import * as cdk from "aws-cdk-lib";
import { CronOptions } from "aws-cdk-lib/aws-events";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";
import { LambdaEvent } from "../src/lambdaHandler";

interface TypescriptLambdaStackProps extends cdk.StackProps {
  environment: Record<string, string>;
  events: {
    schedule: CronOptions;
    event: LambdaEvent;
  }[];
}

export class TypescriptLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: TypescriptLambdaStackProps) {
    super(scope, id, props);

    const typeScriptLambda = new NodejsFunction(this, `${id}Handler`, {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, "../src/lambdaHandler.ts"),
      handler: "handler",
      timeout: cdk.Duration.seconds(30),
      environment: props.environment,
    });

    props.events.forEach((event, i) => {
      const rule = new cdk.aws_events.Rule(this, `Rule${i}`, {
        schedule: cdk.aws_events.Schedule.cron(event.schedule),
      });

      rule.addTarget(
        new cdk.aws_events_targets.LambdaFunction(typeScriptLambda, {
          event: cdk.aws_events.RuleTargetInput.fromObject(event.event),
        })
      );
    });
  }
}
