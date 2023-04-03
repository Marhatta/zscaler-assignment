import ZSError from './ZSError.component';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ZSError', () => {
    it('renders ZSError with text', () => {
        const { getByTestId } = render(<ZSError message='Some error message' />);
        const errorElement = getByTestId('errorMessage');
        expect(errorElement).toBeInTheDocument();
    });

});
