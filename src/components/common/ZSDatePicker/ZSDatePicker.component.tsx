import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ZSDatePickerProps } from './ZSDatePicker.types';

export default function ZSDatePicker({ label = "Choose Date", onSelectDate }: ZSDatePickerProps) {
    const [value, setValue] = useState(null);
    return (
        <DatePicker label={label} value={value} onChange={newValue => {
            setValue(newValue);
            onSelectDate?.(newValue);
        }} />
    );
}