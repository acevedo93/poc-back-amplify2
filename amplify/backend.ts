import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myApiFunction } from './functions/example/resource';
import { usersFunction } from './functions/users/resource';
import { RestApi, LambdaIntegration, AuthorizationType } from 'aws-cdk-lib/aws-apigateway';
import { Cors } from 'aws-cdk-lib/aws-apigateway';
import { Policy, PolicyStatement, } from 'aws-cdk-lib/aws-iam';
import { Stack } from "aws-cdk-lib"



/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */

const backend = defineBackend({
  auth,
  data,
  myApiFunction,
  usersFunction
});

// create a new api stack
const apiStack = backend.createStack("api-stack")

//create a new restAPi

const raioApi = new RestApi(apiStack, "RAIO-API", {
  restApiName: "RAIO API",
  deploy: true,
  deployOptions: {
    stageName: "dev"
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
    allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
    allowHeaders: Cors.DEFAULT_HEADERS, // Specify only the headers you need to allow
  },

})

const lambdaIntegration = new LambdaIntegration(
  backend.myApiFunction.resources.lambda,
);
const lambdaUsersIntegration = new LambdaIntegration(
  backend.usersFunction.resources.lambda

)


const itemsPath = raioApi.root.addResource("items", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.IAM,
  },
});

const usersPath = raioApi.root.addResource("users", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.IAM,
  },
})

// add methods you would like to create to the resource path
itemsPath.addMethod("GET", lambdaIntegration);
itemsPath.addMethod("POST", lambdaIntegration);
itemsPath.addMethod("DELETE", lambdaIntegration);
itemsPath.addMethod("PUT", lambdaIntegration);


usersPath.addMethod("GET", lambdaUsersIntegration);
usersPath.addMethod("POST", lambdaUsersIntegration);
usersPath.addMethod("DELETE", lambdaUsersIntegration);
usersPath.addMethod("PUT", lambdaUsersIntegration);

// add a proxy resource path to the API
itemsPath.addProxy({
  anyMethod: true,
  defaultIntegration: lambdaIntegration,
});

usersPath.addProxy({
  anyMethod: true,
  defaultIntegration: lambdaUsersIntegration

})



// create a new IAM policy to allow Invoke access to the API
const apiRestPolicy = new Policy(apiStack, "RestApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: [
        `${raioApi.arnForExecuteApi("*", "/items", "dev")}`,
        `${raioApi.arnForExecuteApi("*", "/items/*", "dev")}`,
        `${raioApi.arnForExecuteApi("*", "/users", "dev")}`,
        `${raioApi.arnForExecuteApi("*", "/users/*", "dev")}`,
        `${raioApi.arnForExecuteApi("*", "/cognito-auth-path", "dev")}`,
      ],
    }),
  ],
});

// attach the policy to the authenticated and unauthenticated IAM roles
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  apiRestPolicy
);

// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      [raioApi.restApiName]: {
        endpoint: raioApi.url,
        region: Stack.of(raioApi).region,
        apiName: raioApi.restApiName,
      },
    },
  },
});



//
