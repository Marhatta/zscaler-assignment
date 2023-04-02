import React, { useState } from 'react';
import { ZSDatePickerProps } from './ZSDatePicker.types';
import { isValid } from 'date-fns';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function ZSDatePicker({ label = "Choose Date", onSelectDate, currentValue }: ZSDatePickerProps) {
    const [value, setValue] =
        useState<Date | string | undefined>(currentValue ? new Date(currentValue) : undefined);
    return (
        <DateTimePicker
            label={label}
            value={value}
            onChange={newValue => {
                if (!isValid(newValue)) return;
                setValue(newValue as Date);
                onSelectDate?.(newValue as Date);
            }} />
    );
}