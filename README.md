# stripe-test

A simple Stripe store, using a serverless backend.

## Initial setup

After cloning the repository, you will first need to download the project dependancies.

```
npm install
```

### Configuring urls and keys

There are two config files you may need to modify

- `src/config.js` - contains the url for the Serverless server and your Stripe public key
- `serverless/config.js` - contains your Stripe secret key

## Developing and deploying the Serverless server

### Developing

To run the serverless servers locally:

```
cd serverless
npx serverless offline start
```

This will run a local Serverless server, complete with hot-reloading. By default, this should be located at `localhost:3000`. If it tells you otherwise at start, you will need to change the local serverless url in `src/config.js`. The endpoints for the server are located at `/fetch-products` and `/charge`

### Deploying

To deploy to AWS, you will first need to [set up an AWS Lambda account](https://docs.aws.amazon.com/lambda/latest/dg/setup.html) and [configure your AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/). Once that is complete, simply run

```
npx serverless deploy
```

from the `/serverless` directory to deploy.

## Testing and building the front-end

### Testing

To start a local development server for the frontend, run

```
npm run serve
```

from the main directory. Point your browser to `localhost:8080` (by default) to run the app.

You can also lint the project by running `npm run lint`.

### Building for deployment

```
npm run build
```

Will build a production-ready version of the front-end, saving the results to the `/dist` folder. To deploy, you'll need to host this folder, as-is, on a static host of your choice.
