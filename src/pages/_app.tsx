import ZSContainer from '@/components/layout/ZSContainer';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default function App({ Component, pageProps }: AppProps) {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ZSContainer>
      <Component {...pageProps} />
    </ZSContainer>
  </LocalizationProvider>;
}
