import './App.css';
import Allroutes from './Components/Allroutes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Context, CountProvider } from './Components/Contexts';
function App() {
  return (
    <CountProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="back w-full h-svh">
      <Allroutes/>
      </div>
    </LocalizationProvider>
    </CountProvider>
  );
}

export default App;
