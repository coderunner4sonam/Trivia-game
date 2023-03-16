import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App component', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  it('renders the question and allows the user to submit an answer', async () => {
    const mockQuestion = {
      category: 'Test category',
      correct_answer: 'Test answer',
      difficulty: 'easy',
      type: 'multiple',
      incorrect_answers: [],
      question: 'Test question',
    };

    mockedAxios.get.mockResolvedValue({ data: { results: [mockQuestion] } });

    const { getByText, getByPlaceholderText } = render(<App />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    expect(getByText('Question: Test question')).toBeInTheDocument();

    const answerInput = getByPlaceholderText('please write your answer');

    fireEvent.change(answerInput, { target: { value: 'Test answer' } });

    fireEvent.click(getByText('Submit Answer'));

    expect(getByText('Your answer is correct')).toBeInTheDocument();

    fireEvent.click(getByText('Next Question'));

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));
  });

  it('displays an error message when the answer input is empty', async () => {
    const mockQuestion = {
      category: 'Test category',
      correct_answer: 'Test answer',
      difficulty: 'easy',
      type: 'multiple',
      incorrect_answers: [],
      question: 'Test question',
    };

    mockedAxios.get.mockResolvedValue({ data: { results: [mockQuestion] } });

    const { getByText, getByPlaceholderText } = render(<App />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    const answerInput = getByPlaceholderText('please write your answer');

    fireEvent.click(getByText('Submit Answer'));

    expect(getByText("Answer can't be empty")).toBeInTheDocument();

    expect(getByText('Your answer is')).toHaveTextContent('');

    fireEvent.change(answerInput, { target: { value: 'Test answer' } });

    fireEvent.click(getByText('Submit Answer'));

    expect(getByText('Your answer is correct')).toBeInTheDocument();
  });
});


