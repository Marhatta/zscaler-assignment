import Table from '@/pages/table';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('next/router', () => require('next-router-mock'));


describe('Graph', () => {
    it("should render", () => {
        render(<LocalizationProvider dateAdapter={AdapterDateFns}><Table /></LocalizationProvider>);
    })

})
