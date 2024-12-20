# Demo

<a href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Development server

Run `nx serve api` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Migrations
```bash
$ npm run migrate:generate ./database/migrations/[name]
$ npm run migrate:create ./database/migrations/[name]
$ npm run migrate:up
$ npm run migrate:down
```

DEV
1. run client
npx nx run back-end:serve   
2. run API
npx nx run api:serve

BUILD
1. run client
npx nx build back-end
2. run API
npx nx build api

DEPLOY
npm run deploy

show logs 
in container 
docker exec  -it copytrade-dashboard_c-node_1 sh

web 
http://103.173.228.175:8101/