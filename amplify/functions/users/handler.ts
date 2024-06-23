
import type { APIGatewayProxyHandler, APIGatewayEvent } from "aws-lambda"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: any, callback) => {

  console.log("EVENTO", event.httpMethod);

  const method = event.httpMethod;
  let response;

  switch (method) {
    case 'GET':
      response = handleGet(event);
      break;
    case 'POST':
      response = handlePost(event);
      break;
    case 'PUT':
      response = handlePut(event);
      break;
    case 'DELETE':
      response = handleDelete(event);
      break;
    default:
      response = {
        statusCode: 405,
        headers: {
          "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
          "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
        },
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
  }

  return response;
};

const handleGet = async (event: APIGatewayEvent) => {
  // Lógica para manejar GET
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({ message: "Hello users from GET" }),
  };
};

const handlePost = async (event: APIGatewayEvent) => {
  // Lógica para manejar POST
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({ message: "Hello users from POST" }),
  };
};

const handlePut = async (event: APIGatewayEvent) => {
  // Lógica para manejar PUT
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({ message: "Hello users from PUT" }),
  };
};

const handleDelete = async (event: APIGatewayEvent) => {
  // Lógica para manejar DELETE
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({ message: "Hello users from DELETE" }),
  };
};
