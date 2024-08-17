import './App.css';
// import PolicyCard from './components/PolicyCard'
import BasicTable from './components/BasicTable';
import { Box } from '@mui/material';
//import WidgetGridLayout from './components/WidgetGridLayout';

function App() {


  return (
    <div className="App">
      <BasicTable />
      <Box sx={{ mt: 2, mb: 2 }}></Box>
      {/* <PolicyCard /> */}
      {/* <WidgetGridLayout /> */}
    </div>
  );
}

export default App;
