import * as cdk from 'aws-cdk-lib';
import { CronOptions } from 'aws-cdk-lib/aws-events';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';

interface TypescriptLambdaStackProps extends cdk.StackProps {
  environment: Record<string, string>;
  cronRule: CronOptions;
}

export class TypescriptLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: TypescriptLambdaStackProps) {
    super(scope, id, props);

    const typeScriptLambda = new NodejsFunction(this, "TypeScriptLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '../src/lambdaHandler.ts'),
      handler: 'handler',
      environment: props.environment,
      timeout: cdk.Duration.seconds(30)
    });

    const rule = new cdk.aws_events.Rule(this, 'Rule', {
      schedule: cdk.aws_events.Schedule.cron(props.cronRule)
    });

    rule.addTarget(new cdk.aws_events_targets.LambdaFunction(typeScriptLambda));

  }
}
