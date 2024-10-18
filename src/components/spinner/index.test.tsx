import { render, screen } from '@testing-library/react';
import Spinner, {Props} from '.';

test('shows spinner during loading', async () => {

    const props:Props = {
        isPaused : false, 
        isNewDuration: false, 
        duration:5
    }
  render(<Spinner {...props} />);
  const spinnerElement = await screen.findByTestId('spinner'); // Assuming spinner has data-testid="spinner"
  expect(spinnerElement).toBeInTheDocument();
});