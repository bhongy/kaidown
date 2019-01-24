import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Home',
      greeting: '...',
    };
  }

  componentDidMount() {
    import(/* webpackPrefetch: true */ '../lib/log')
      .then(module => {
        this.log = module.default;
      })
      .then(() => this.log(`Selected content: ${this.state.selected}`));
  }

  _selectTab(selection) {
    this.log(`Select content: ${selection}`);
    this.setState({ selected: selection });
  }

  _loadLocale(locale) {
    import(/* webpackChunkName: 'locale' */
    `../locale/${locale}.json`).then(content => {
      this.log(`Load locale bundle for ${locale}`);
      this.setState({ greeting: content.greeting });
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.selected}</p>
        <button onClick={() => this._selectTab('Home')}>Home</button>
        <button onClick={() => this._selectTab('Foo')}>Foo</button>
        <button onClick={() => this._selectTab('Bar')}>Bar</button>

        <div>
          <p>{this.state.greeting}</p>
          <button onClick={() => this._loadLocale('en-US')}>en-US</button>
          <button onClick={() => this._loadLocale('de-DE')}>de-DE</button>
        </div>
      </div>
    );
  }
}
