## Start Dev Server

```javascript
node server // run <experiment001Root>/server/index.js as a node script
```

You don't have to call webpack via CLI. The server process hooks up via webpack's node api and create the compilers as the part of starting the server.

## Notes

- 2 compilers
- server webpack bundles the code for "render" request handler
  - need to transpile to server render the react tree (resolving imports, multiple type of loaders, jsx and other babel transpilation)
  - the server bundle `module.exports` a function that is used (currently via webpackHotServerMiddleware)
- compilers are instantiated in the server/index.js as part of creating & starting the server
  - server/index.js sets up the app server which mainly (currently) concerns about setting up webpack & webpack middlewares
  - server/render.js is the app server renderer entry that server renders react app and sends the entire http response body (html document) back to the client

* when server starts: create webpack compilers in scope, wire them to the server's handler

- for each request: ...

* configurations: ... why those fields

  - `__webpack_public_path__` : the public URL of the output directory when referenced in a browser. the value of this option ends with `/` in most cases: example `'https://cdn.example.com/assets/'`

* use HashedModuleIdsPlugin to keep production hash of vendor chunk stable if there's no change to it `new webpack.HashedModuleIdsPlugin()` https://webpack.js.org/plugins/hashed-module-ids-plugin/ https://webpack.js.org/guides/caching/

# References

- https://github.com/timkindberg/egghead-universal-component
- https://github.com/faceyspacey/universal-demo

# Compiler Stats

- for multicompilers, `compiler.hooks.done.tap` will return `multistats`
- not all hooks are available on multicompiler
  - only done, invalid, run, watchClose, watchRun are available on multicompiler instance
  - you need to access `compiler.compilers[i]` to tap to hooks like `emit`, etc
- `stats.toJson()` is a good way to get stats data rather than interacting with the Stats instance directly

# Compiler hook orders

emit -> afterEmit -> done

# Debugging

## Launch server/index.js

- ensure to set vscode launch.json `cwd` to `${workspaceFolder}/experiments/001`
  - or mount vscode workspace at `experiments/001` instead and use the configuration below

```json
// in .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug experiment 001",
  "program": "${workspaceFolder}/server/index.js",
  "cwd": "${workspaceFolder}/"
}
```

- this launch debugging session on the runtime node server that uses the bundled server/render.js - I haven't figured out how to get debugging source map to work to the source server/render.js
