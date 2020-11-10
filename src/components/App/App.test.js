import React from 'react';
import App from './App';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
//import {   } from '../../apiCalls';
//jest.mock('../../apiCalls');

describe('App', () => {
  it('Should pass an initial test', () => {
    expect(true).toBe(true);
  })
})
