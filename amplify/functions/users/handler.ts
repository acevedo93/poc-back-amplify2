
import type { APIGatewayProxyHandler, APIGatewayEvent } from "aws-lambda"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: any) => {

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
      "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
    },
    body: JSON.stringify("HEllos users")
  }

}
