import React from 'react';
import UrlForm from './UrlForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
//import {  } from '../../apiCalls';
//jest.mock('../../apiCalls');

describe('UrlForm', () => {
  const mockAddNewURL = jest.fn()
  it('Should render a form with input boxes & a button ', () => {
    const { getByPlaceholderText, getByText } = render(<UrlForm addNewURL={mockAddNewURL}/>)

    const titleInput = getByPlaceholderText('Title...')
    const urlInput = getByPlaceholderText('URL to Shorten...')
    const shortenBtn = getByText('Shorten Please!')

    expect(titleInput).toBeInTheDocument()
    expect(urlInput).toBeInTheDocument()
    expect(shortenBtn).toBeInTheDocument()

  })

  it('Should start out empty & update form with user input', () => {
    const mockAddNewURL = jest.fn()
    const { getByText, getByPlaceholderText } = render(<UrlForm addNewURL={mockAddNewURL}/>)

    const titleInput = getByPlaceholderText('Title...')
    const urlInput = getByPlaceholderText('URL to Shorten...')

    userEvent.type(titleInput, ('elephant'))
    userEvent.type(urlInput, ('https://www.shutterstock.com/image-illustration/elephant-stands-on-thin-branch-withered-1407435689'))
    expect(titleInput).toHaveValue('elephant')
  })

  it('Should fire a function when the shorten please button is clicked', () => {
    const mockAddNewURL = jest.fn()
    const { getByText, getByPlaceholderText } = render(<UrlForm addNewURL={mockAddNewURL}/>)

    const titleInput = getByPlaceholderText('Title...')
    const urlInput = getByPlaceholderText('URL to Shorten...')
    const btn = getByText('Shorten Please!')

    userEvent.type(titleInput, ('elephant'))
    userEvent.type(urlInput, ('https://www.shutterstock.com/image-illustration/elephant-stands-on-thin-branch-withered-1407435689'))
    userEvent.click(btn)

    expect(mockAddNewURL).toHaveBeenCalledTimes(1)
  })
})
