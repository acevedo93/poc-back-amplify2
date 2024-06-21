import { defineFunction } from "@aws-amplify/backend";


export const myApiFunction = defineFunction({
  name: "api-function",
  entry: "./handler.ts"
})
