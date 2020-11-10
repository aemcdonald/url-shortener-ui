import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    //need to check that title & urlToShorten are NOT empty strings
    if (this.state.title !== '' && this.state.urlToShorten !== '') {
      const newURL = { long_url: this.state.urlToShorten, title: this.state.title }
      this.props.addNewURL(newURL)
    }
    e.preventDefault();
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button type='button' onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
