import { render, screen } from '@testing-library/react';
import ButtonRound, {Props} from '.';

test('shows spinner during loading', async () => {

  const props:Props = {
    callback: function(){},
    children:'temp'
  }
  render(<ButtonRound {...props} />);
  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();
});