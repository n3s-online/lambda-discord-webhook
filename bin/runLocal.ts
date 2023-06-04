import { config } from 'dotenv';
config();

import * as userCode from "../src/lambdaHandler";
import { Context } from 'aws-lambda';

userCode.handler({}, {} as Context, () => { });