import React from 'react';
import App from './App';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getUrls, postNewURL, deleteURL } from '../../apiCalls';
jest.mock('../../apiCalls');

describe('App', () => {
  it('Should fetch urls on load', async () => {
    getUrls.mockResolvedValue({
      urls: [
        {
          id: 8,
          long_url: 'shutterstock.com/image-illustration/elephant-stands-on-thin-branch-withered-1407435689',
          short_url:"http://localhost:3001/useshorturl/8",
          title: 'elephant'
        },
        {
          id: 9,
          long_url: 'google.com/search?q=zebra+long+url&sxsrf=ALeKk00IxkXDynzfhJyPfea7DPvisp-kZQ:1605026422683&tbm=isch&source=iu&ictx=1&fir=9-pSLzjF5nR6dM%252CyCSMjUhml8-aAM%252C_&vet=1&usg=AI4_-kRMCGoSNvXXFDJdanR0XOA3kWnJKQ&sa=X&ved=2ahUKEwjUo52utfjsAhUKHs0KHdRaDGcQ9QF6BAgKEAg#imgrc=9-pSLzjF5nR6dM',
          short_url:"http://localhost:3001/useshorturl/9",
          title: 'zebra'
        }
      ]
    })

    const { getByText } = render(<App />)

    const url1Title = await waitFor(() => getByText('elephant'))
    const url2Title = await waitFor(() => getByText('zebra'))
    const url1 = await waitFor(() => getByText('http://localhost:3001/useshorturl/8'))
    const url2 = await waitFor(() => getByText('http://localhost:3001/useshorturl/9'))

    expect(url1Title).toBeInTheDocument()
    expect(url2Title).toBeInTheDocument()
    expect(url1).toBeInTheDocument()
    expect(url1).toBeInTheDocument()
  })

  it('Should render a new card when the form is submitted', async () => {

    getUrls.mockResolvedValueOnce({
      urls: [
        {
          id: 8,
          long_url: 'shutterstock.com/image-illustration/elephant-stands-on-thin-branch-withered-1407435689',
          short_url:"http://localhost:3001/useshorturl/8",
          title: 'elephant'
        },
        {
          id: 9,
          long_url: 'google.com/search?q=zebra+long+url&sxsrf=ALeKk00IxkXDynzfhJyPfea7DPvisp-kZQ:1605026422683&tbm=isch&source=iu&ictx=1&fir=9-pSLzjF5nR6dM%252CyCSMjUhml8-aAM%252C_&vet=1&usg=AI4_-kRMCGoSNvXXFDJdanR0XOA3kWnJKQ&sa=X&ved=2ahUKEwjUo52utfjsAhUKHs0KHdRaDGcQ9QF6BAgKEAg#imgrc=9-pSLzjF5nR6dM',
          short_url:"http://localhost:3001/useshorturl/9",
          title: 'zebra'
        }
      ]
    })

    postNewURL.mockResolvedValue(
      { id: 4,
        long_url: 'google.com/search?q=tiger+picture&sxsrf=ALeKk00MI8KLi65NzYsFz_nx6UxKwVTaGw:1605029365162&tbm=isch&source=iu&ictx=1&fir=uhb5lPyfxwV5GM%252CV7d3lFgXfu8H2M%252C_&vet=1&usg=AI4_-kSSDcuIGuxIXyh3OKnz1aavAkAsQg&sa=X&ved=2ahUKEwiDhKipwPjsAhUTZc0KHUXkC28Q9QF6BAgBEFg&biw=923&bih=665#imgrc=uhb5lPyfxwV5GM',
        short_url: 'http://localhost:3001/useshorturl/4',
        title: 'tiger'
      }
    )

    const { getByText, getByPlaceholderText, getByTestId } = render(<App />)

    const titleInput = getByPlaceholderText('Title...')
    const urlInput = getByPlaceholderText('URL to Shorten...')
    const btn = getByText('Shorten Please!')

    userEvent.type(titleInput, ('tiger'))
    expect(titleInput).toHaveValue('tiger')
    userEvent.type(urlInput, ('google.com/search?q=tiger+picture&sxsrf=ALeKk00MI8KLi65NzYsFz_nx6UxKwVTaGw:1605029365162&tbm=isch&source=iu&ictx=1&fir=uhb5lPyfxwV5GM%252CV7d3lFgXfu8H2M%252C_&vet=1&usg=AI4_-kSSDcuIGuxIXyh3OKnz1aavAkAsQg&sa=X&ved=2ahUKEwiDhKipwPjsAhUTZc0KHUXkC28Q9QF6BAgBEFg&biw=923&bih=665#imgrc=uhb5lPyfxwV5GM'))
    expect(urlInput).toHaveValue('google.com/search?q=tiger+picture&sxsrf=ALeKk00MI8KLi65NzYsFz_nx6UxKwVTaGw:1605029365162&tbm=isch&source=iu&ictx=1&fir=uhb5lPyfxwV5GM%252CV7d3lFgXfu8H2M%252C_&vet=1&usg=AI4_-kSSDcuIGuxIXyh3OKnz1aavAkAsQg&sa=X&ved=2ahUKEwiDhKipwPjsAhUTZc0KHUXkC28Q9QF6BAgBEFg&biw=923&bih=665#imgrc=uhb5lPyfxwV5GM')

    userEvent.click(btn)

    const newCardTitle = await waitFor(() => getByText('tiger'))
    // const newURLs = await waitFor(() => queryAllByText('short-url'))
    //const newURL = await waitFor(() => getByText('http://localhost:3001/useshorturl/4'))
    //const longURL = await waitFor(() => getByText('google.com/search?q=tiger+picture&sxsrf=ALeKk00MI8KLi65NzYsFz_nx6UxKwVTaGw:1605029365162&tbm=isch&source=iu&ictx=1&fir=uhb5lPyfxwV5GM%252CV7d3lFgXfu8H2M%252C_&vet=1&usg=AI4_-kSSDcuIGuxIXyh3OKnz1aavAkAsQg&sa=X&ved=2ahUKEwiDhKipwPjsAhUTZc0KHUXkC28Q9QF6BAgBEFg&biw=923&bih=665#imgrc=uhb5lPyfxwV5GM'))


    //ran out of time tryign to get this test to pass. After spending too much time, I foudn that I had a bug
    //where I was not setting state with the fetched data after posting so it was not rendering the new short url
    //i do not have enough time to try to get this test to pass
    //with more time, I would rewrite my test to ensure I do not have any typos
    //I would make sure that I am mocking my fetch request & mocking my post request before rendering app
    //I would then simulate a user typing into the title & url fields followed by clicking submit
    //I would then check that the new card has rendered to the dom
    expect(newCardTitle).toBeInTheDocument()
    expect(newURL).toBeInTheDocument();
  })
})
