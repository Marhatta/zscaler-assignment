import Graph, { Chart } from '@/pages/graph';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => require('next-router-mock'));


describe('Graph', () => {
    it("should render", () => {
        render(<LocalizationProvider dateAdapter={AdapterDateFns}><Graph /></LocalizationProvider>);
    })
    it("should render chart if isLoading is false and data is not empty", () => {
        render(<Chart isLoading={false} data={[{ timestamp: '08/04/2021', _count: 1 }]} />);
        const chartContainer = screen.getByTestId('chartContainer');
        expect(chartContainer).toBeInTheDocument();
    })
    it("should render no data found if isLoading is false and data  empty", () => {
        render(<Chart isLoading={false} data={[]} />);
        const noDataFound = screen.getByTestId('noDataFound');
        expect(noDataFound).toBeInTheDocument();
    })
})
