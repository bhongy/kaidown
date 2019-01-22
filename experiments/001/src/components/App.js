import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 'Home' };
  }

  render() {
    return (
      <div>
        <p>{this.state.selected}</p>
        <button onClick={() => this.setState({ selected: 'Home' })}>
          Home
        </button>
        <button onClick={() => this.setState({ selected: 'Foo' })}>Foo</button>
        <button onClick={() => this.setState({ selected: 'Bar' })}>Bar</button>
      </div>
    );
  }
}
