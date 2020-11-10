import React, { Component } from 'react';
import './App.css';
import { getUrls, postNewURL } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount = async () => {
    try {
      const allURLs = await getUrls()
      this.setState({ urls: allURLs.urls})
    } catch(error) {
      this.setState({ error: 'Failed to retrieve URLs'})
    }
  }

  addNewURL = (newURL) => {
    postNewURL(newURL)
    this.setState({ urls: [...this.state.urls, newURL]})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addNewURL={this.addNewURL}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
