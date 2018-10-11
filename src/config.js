export const SERVERLESS_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://pw7qlnw947.execute-api.us-east-1.amazonaws.com/dev/";

export const STRIPE_PUBLIC_KEY = "pk_test_QUiEFibAIKom4xN84kLqbPJv";
