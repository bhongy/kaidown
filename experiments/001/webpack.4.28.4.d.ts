declare namespace webpack {
  interface MultiStats {
    stats: Array<webpack.Stats>;
    hash: string;
  }
  interface Stats {
    compilation: Compilation;
    startTime: number;
    endTime: number;
    hash: string;
  }

  interface Compilation {
    _modules: Map<string /* absolute path of the module */, Module>;

    bail: undefined | unknown;
    chunkGroups: Array<Entrypoint | ChunkGroup>;
    chunks: Array<Chunk>;
    compiler: Compiler;
    entrypoints: Map<string /* entry key like "main" */, Entrypoint>;
    errors: Array<unknown>;
    fullHash: string;
    hash: string;
    hooks: {};
    inputFileSystem: InputFileSystem;
    name: undefined | string;
    options: {
      cache: boolean;
      context: string;
      devtool: string;
      entry: string;
      mode: 'developement' | 'production' | 'none';
      module: {
        defaultRules: Array<Config.Rule>;
        rules: Array<Config.Rule>;
      };
      node: {
        __dirname: boolean | 'mock';
        __filename: boolean | 'mock';
        Buffer: boolean | 'mock';
        console: boolean | 'mock';
        global: boolean | 'mock';
        process: boolean | 'mock';
        setImmediate: boolean | 'mock';
      };
      // ...
    };
    outputOptions: {
      chunkFilename: string;
      crossOriginLoading: boolean;
      filename: string;
      // library
      // libraryTarget
      path: string;
      pathinfo: boolean;
      publicPath: string;
    };
    performance: boolean;
    profile: undefined | unknown;
    warnings: Array<unknown>;
  }

  interface Entrypoint {}

  interface ToJsonStats {
    _showErrors: boolean;
    _showWarnings: boolean;
    assets: Array<{}>;
    assetsByChunkName: {
      // example for filename: "assets/js/[name]-[contenthash].js"
      //   main: "assets/js/main-659e0a70620de71b6acb.js"
      [chunkName: string]: string
    };
    builtAt: number;
    children: Array<unknown>;
    chunks: Array<unknown>;
    entrypoints: Array<unknown>;
    // errors
    filteredAssets: number;
    filteredModules: number;
    hash: string;
    modules: Array<unknown>;
    namedChunkGroups: {};
    outputPath: string;
    publicPath: string;
    time: number;
    // version
    // warnings
  }

  interface Module {}
}
