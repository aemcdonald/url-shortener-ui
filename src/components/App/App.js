import React, { Component } from 'react';
import './App.css';
import { getUrls, postNewURL, deleteURL } from '../../apiCalls';
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

  addNewURL = async (newURL) => {
    await postNewURL(newURL)
    try {
      const allURLs = await getUrls()
      this.setState({ urls: allURLs.urls})
    } catch(error) {
      this.setState({ error: 'Failed to retrieve URLs'})
    }
  }

  deleteURL = async (urlID) => {
    try {
      deleteURL(urlID)
      //call delete url here
      const allURLs = await getUrls()
      const filteredURLs = this.state.urls.filter(url => url.id !== urlID)
      this.setState({ urls: filteredURLs})
    } catch(error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addNewURL={this.addNewURL}/>
        </header>

        <UrlContainer urls={this.state.urls} deleteURL={this.deleteURL}/>
      </main>
    );
  }
}

export default App;
