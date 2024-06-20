import { Handler } from "aws-cdk-lib/aws-lambda";

export const handler: Handler = async (event: any, context: any) => {
  return "Hello world"
}
