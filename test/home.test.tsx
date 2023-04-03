import Home from '@/pages/index';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('Home', () => {
    it("should mock the useRouter hook", () => {
        mockRouter.push("/");
    })
    it("should render", async () => {
        render(<Home />);
    })

    it("should have a visit graph button", () => {
        render(<Home />);
        const visitGraphButton = screen.getByText("Visit graph");
        expect(visitGraphButton).toBeInTheDocument();
    })

    it("should have a visit table button", () => {
        render(<Home />);
        const visitTableButton = screen.getByText("Visit table");
        expect(visitTableButton).toBeInTheDocument();
    })

    it("should redirect to graph page on click of visit graph button", () => {
        render(<Home />);
        const visitGraphButton = screen.getByText("Visit graph");
        fireEvent.click(visitGraphButton);
        expect(mockRouter.pathname).toEqual('/graph');
    })

    it("should redirect to table page on click of visit table button", () => {
        render(<Home />);
        const visitTableButton = screen.getByText("Visit table");
        fireEvent.click(visitTableButton);
        expect(mockRouter.pathname).toEqual('/table');
    })
})
