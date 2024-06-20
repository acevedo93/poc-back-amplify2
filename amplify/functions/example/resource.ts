import { defineFunction } from "@aws-amplify/backend";


export const sayHello = defineFunction({
  name: "sayHello",
  entry: "./handler.ts"
})
