import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {
  const urlEls = props.urls.map((url, i) => {
    return (
      <div className="url"key={i}>
        <h3 data-testid='url-heading'>{url.title}</h3>
        <a data-testid='short-url' href={url.short_url} target="blank">{url.short_url}</a>
        <p data-testid='long-url'>{url.long_url}</p>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
