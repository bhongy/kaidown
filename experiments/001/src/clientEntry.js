import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const render = App => {
  // webpack just works - adding a sync import of this
  // will include it in the bundle as expect and the chunk will not be split
  // anywhere from the tree because it's already included in the parent bundle
  import(/* webpackChunkName: 'log' */ './lib/log').then(module => {
    module.default('Render App');
  });
  return ReactDOM.hydrate(<App />, document.getElementById('root'));
};

render(App);
