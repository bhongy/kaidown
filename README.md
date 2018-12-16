# Kaidown ไข่ดาว

## Current workflow

- `yarn`
- follow [this article](https://fettblog.eu/typescript-node-visual-studio-code/) to set up vscode to build & debug node in typescript
- launch the `.ts` file in vscode debugging
- code change does **not** restart the server - hit "refresh" button of the debugger to restart server


## Todo

focus on dev story for now

### Stage 1: Everything on host machine

[X] Typescript node server
[X] Debug with Visual Studio Code
[ ] Auto-restart server on code change
[ ] JIT Webpack compilation each web page (server request) - webpack only to create client bundles
[ ] Server-side render React components
[ ] Handle React/JSX client-side bundle
[ ] Handle css files (and images)
[ ] ? HMR

```json
// .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug main.ts in Node.js",
  "program": "${workspaceFolder}/src/main.ts",
  "cwd": "${workspaceFolder}",
  "preLaunchTask": "tsc: build - tsconfig.json",
  "outFiles": [
    "${workspaceFolder}/dist/**/*.js"
  ]
}
```


### Stage 2: Dockerized

[ ] Run completely in Docker
[ ] yarn.lock change causes Docker image rebuild / container restart
[ ] Typescript node server (auto-compile in Docker)
[ ] Debug with Visual Studio Code with Docker
[ ] Auto-restart server on code change
    code change doesn't restart container - but restart the server
[ ] JIT Webpack compilation each web page (server request) - webpack only to create client bundles

```
Docker
------
Node & Yarn (build)
------
Node runtime
```