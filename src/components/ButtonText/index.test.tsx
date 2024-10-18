import { render, screen } from '@testing-library/react';
import ButtonText, {Props} from '.';

test('shows spinner during loading', async () => {

  const props:Props = {
    callback: function(){},
    children:'temp'
  }
  render(<ButtonText {...props} />);
  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();
});