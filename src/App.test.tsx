import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  jest.useFakeTimers(); // Mock timers
});

afterEach(() => {
  jest.clearAllTimers(); // Clean up timers
});

test('renders without crashing', () => {
  render(<App />);
  const timerElement = screen.getByDisplayValue("00 : 00"); // assuming the timer shows as "00:00:00" initially
  expect(timerElement).toBeInTheDocument();
}); 

test('timer counts down correctly', () => {
  render(<App />);
  const startButton = screen.getByRole('button', { name: /1:00/i });

  act(() => {
    startButton.click();
  });

  act(() => {
    jest.advanceTimersByTime(1000); // fast-forward 1 second
  });
  const timerElement = screen.getByDisplayValue("00 : 59"); // assuming 1 minute timer
  expect(timerElement).toBeInTheDocument();
}); 

test('pauses and resumes the timer', () => {
  render(<App />);
  const addDurationButton = screen.getByRole('button', { name: /1:00/i });
  const startButton = screen.getByRole('button', { name: /▐▐/i });
  
  // Set Default time as 1 min and Start the timer
  act(() => {
    addDurationButton.click();
  });

  act(() => {
    jest.advanceTimersByTime(3000);
  });

  // Pause the timer
  act(() => {
    startButton.click();
  });

  // Advancing interval to 3 sec but it should not change the time since its paused
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  
  let timerElement = screen.getByDisplayValue(/00 : 57/i); // Timer at 57 seconds
  expect(timerElement).toBeInTheDocument();

  const pauseButton = screen.getByRole('button', { name: /►/i });
  // Resume the timer
  act(() => {
    pauseButton.click();
  });

  // Ensure timer increase by 2 sec
  act(() => {
    jest.advanceTimersByTime(2000); // advance by 2 seconds
  });
  
  timerElement = screen.getByDisplayValue(/00 : 55/i); // Timer at 55 seconds
  expect(timerElement).toBeInTheDocument();
});



test('Update the timer by dial', () => {
  render(<App />);
  let inputElement = screen.getByDisplayValue("00 : 00");
  fireEvent.click(inputElement)
  // hiding readonly textbox and accessing editable text box
  inputElement = screen.getByRole('textbox'); 
  // setting initial value as 5 sec
  fireEvent.change(inputElement, { target: { value: '5' } });

  act(() => {
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  })

  act(() => {
    jest.advanceTimersByTime(2000);
  })
  let timerElement = screen.getByDisplayValue(/00 : 03/i); // Timer at 55 seconds
  expect(timerElement).toBeInTheDocument();
});

test("timer reset works correctly", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: /1:00/i });
  const resetButton = screen.getByRole("button", { name: /Reset/i });

  act(() => {
    startButton.click();
  });

  act(() => {
    jest.advanceTimersByTime(1000); // fast-forward 1 second
  });
  let timerElement = screen.getByDisplayValue("00 : 59"); // assuming 1 minute timer
  expect(timerElement).toBeInTheDocument();
  act(() => {
    resetButton.click();
  });
  timerElement = screen.getByDisplayValue("00 : 00"); // assuming 1 minute timer
  expect(timerElement).toBeInTheDocument();
});
