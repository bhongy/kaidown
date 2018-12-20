import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';

const Homepage = () => (
  <main>
    <Header>Homepage Title</Header>
    <p>some more content</p>
  </main>
);

const mountNode = document.getElementById('application-root');
if (mountNode) {
  ReactDOM.render(<Homepage />, mountNode);
}
