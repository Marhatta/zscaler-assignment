export interface ZSDatePickerProps {
  label: string;
  onSelectDate?: (date: Date) => void;
  currentValue?: Date | string | undefined;
}
