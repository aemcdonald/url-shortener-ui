import React from 'react';
import UrlContainer from './UrlContainer';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
//import {  } from '../../apiCalls';
//jest.mock('../../apiCalls');

describe('UrlContainer', () => {
  it('Should render the title & the long & short urls', () => {
    const mockUrls = [
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

    const { getByTestId, getByText } = render(<UrlContainer urls={mockUrls}/>)
    //When passed an array of url objects,
    //make sure that headings and anchor tags get rendered appropriately

    const title1 = getByText('elephant');
    const shortUrl1 = getByText('http://localhost:3001/useshorturl/8');
    const longUrl1 = getByText('shutterstock.com/image-illustration/elephant-stands-on-thin-branch-withered-1407435689');

    const title2 = getByText('zebra');
    const shortUrl2 = getByText('http://localhost:3001/useshorturl/9');
    const longUrl2 = getByText('google.com/search?q=zebra+long+url&sxsrf=ALeKk00IxkXDynzfhJyPfea7DPvisp-kZQ:1605026422683&tbm=isch&source=iu&ictx=1&fir=9-pSLzjF5nR6dM%252CyCSMjUhml8-aAM%252C_&vet=1&usg=AI4_-kRMCGoSNvXXFDJdanR0XOA3kWnJKQ&sa=X&ved=2ahUKEwjUo52utfjsAhUKHs0KHdRaDGcQ9QF6BAgKEAg#imgrc=9-pSLzjF5nR6dM');

    expect(title1).toBeInTheDocument()
    expect(shortUrl1).toBeInTheDocument()
    expect(longUrl1).toBeInTheDocument();

    expect(title2).toBeInTheDocument()
    expect(shortUrl2).toBeInTheDocument()
    expect(longUrl2).toBeInTheDocument();

  })
})
