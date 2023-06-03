import * as cdk from 'aws-cdk-lib';
import { CronOptions } from 'aws-cdk-lib/aws-events';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';

interface TypescriptLambdaStackProps extends cdk.StackProps {
  environment: Record<string, string>;
}

export class TypescriptLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: TypescriptLambdaStackProps) {
    super(scope, id, props);

    const typeScriptLambda = new NodejsFunction(this, "TypeScriptLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '../src/lambdaHandler.ts'),
      handler: 'handler',
      environment: props.environment
    });

    // 10:15PM in PST
    const cronRule: CronOptions = { minute: '18', hour: '5' };

    const rule = new cdk.aws_events.Rule(this, 'Rule', {
      schedule: cdk.aws_events.Schedule.cron(cronRule)
    });

    rule.addTarget(new cdk.aws_events_targets.LambdaFunction(typeScriptLambda));

  }
}
