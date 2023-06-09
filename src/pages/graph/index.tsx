import ZSDatePicker from '@/components/common/ZSDatePicker';
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, Tooltip, Legend, Line } from 'recharts';
import ZSLoader from '@/components/common/ZSLoader';
import ZSButton from '@/components/common/ZSButton';
import { NextPage } from 'next';
import { toast } from 'react-hot-toast';
import { format, isBefore } from 'date-fns';
import getData from '@/utils/rest/getData';
import { ErrorBoundary } from 'react-error-boundary';


interface ChartProps {
    isLoading: boolean,
    data: Array<{ timestamp: string, _count: number }>
}
// validate the start and the end date
const validateDates = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) {
        toast.error('Please choose start and end date');
        return false;
    }

    // make sure start date is less than end date
    if (isBefore(new Date(endDate), new Date(startDate))) {
        toast.error('End date cannot be before start date');
        return false;
    }
    return true;
}

// formats the timestamp
const formatTimeStamp = (value: string) => {
    return format(new Date(value), 'MM/dd/yyyy HH:mm a')
}

// shows the time series chart
export const Chart = ({ isLoading = false, data = [] }: ChartProps) => {
    if (isLoading) {
        return <div className='h-64 w-full flex justify-center items-center'><ZSLoader show={true} /></div>
    }
    else if (data.length === 0) {
        return <div className='h-64 flex justify-center items-center' data-testid='noDataFound'>
            <span>No data found</span>
        </div>
    }
    return (
        <div className='h-96 mt-8' data-testid='chartContainer'>
            <ErrorBoundary fallback={<span>Loading...</span>}>
                <span className='text-gray-600'>Time Series representing events occured in a particular timeframe</span>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tickFormatter={(value) => formatTimeStamp(value)} />
                        <Tooltip labelFormatter={(value) => formatTimeStamp(value)} />
                        <Legend />
                        <Line type="monotone" dataKey="_count" stroke="#8884d8" strokeWidth={3} name='Events' />
                    </LineChart>
                </ResponsiveContainer>
            </ErrorBoundary>
        </div>

    )
}


const Graph: NextPage = () => {
    const [startDate, setStartDate] = useState<string | Date>('08/04/2021');
    const [endDate, setEndDate] = useState<string | Date>('08/05/2021');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState([]);


    //load the initial chart data
    useEffect(() => {
        fetchChartData();
    }, [])

    // fetches the data for the chart based on the date range
    const fetchChartData = async () => {
        setIsLoading(true);
        try {
            const { data: chartData, success, error } = await getData(`/api/chartByTimestamp?startDate=${startDate}&endDate=${endDate}`);
            if (success) {
                setData(chartData.data);
            }
            else if (error) {
                toast.error('Something went wrong while fetching the data');
            }
        } catch (e: any) {
            toast.error(e?.message)
        } finally {
            setIsLoading(false)
        }
    }

    // fetches chart data on valid submission
    const onSubmit = () => {
        const valid = validateDates(startDate as string, endDate as string);
        if (!valid) return;
        fetchChartData();
    }

    // returns the page jsx
    return <>
        <span className='text-gray-600'>Please choose date</span>
        <div className='flex justify-between sm:justify-start space-x-0 sm:space-x-3 h-full mt-4 space-y-4 sm:space-y-0 flex-wrap sm:flex-nowrap'>
            <ZSDatePicker label='Start Date' currentValue={startDate} onSelectDate={date => {
                setStartDate(new Date(date as Date).toISOString())
            }} />
            <ZSDatePicker label='End Date' currentValue={endDate} onSelectDate={date => {
                setEndDate(new Date(date as Date).toISOString())
            }} />
            <ZSButton onClick={onSubmit}>Submit</ZSButton>
        </div>
        <Chart data={data} isLoading={isLoading} />
    </>
}

export default Graph;