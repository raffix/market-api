## Market-API
It's a NestJs project, to delivery consumer and products info. The application have 3 endpoints.

Server with be on `localhost:3000`
The endpoints:
`GET /customers/:id`
`GET /products/:id`
`GET /multiple?query`
to get more details about how use and responses, see the tests(`test/app.e2e-spec.ts`).
The `multiple` enpoint has a limit on 10 items per request. The pagination should be made by the requester.

To start the server `npm run start`
To run tests `npm run test:e2e`
For more scripts see `package.json`