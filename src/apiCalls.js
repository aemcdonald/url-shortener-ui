export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postNewURL = (newURL) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newURL)
  })
  .then(response => response.json())
  // .then(data => data)
  .then(data => console.log('success'))
  .catch(err => console.log('failed', err.message))
}

export const deleteURL = (urlID) => {
    return fetch(`http://localhost:3001/api/v1/urls/${urlID}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) throw Error
    })
    .catch(err => console.log('failed', err.message));
}
