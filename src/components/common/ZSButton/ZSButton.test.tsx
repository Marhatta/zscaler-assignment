import ZSButton from './ZSButton.component';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ZSButton', () => {
  it('renders ZSButton with text', () => {
    render(<ZSButton>hello world</ZSButton>);
  });
  it('should render with variant = contained', () => {
    render(<ZSButton variant='contained'>contained button</ZSButton>);
  });
  it('should render with variant = outlined', () => {
    render(<ZSButton variant='outlined'>outlined button</ZSButton>);
  });
  it('should render with variant = text', () => {
    render(<ZSButton variant='text'>text button</ZSButton>);
  });
});
