import {Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard  from './pages/Dashboard';
import ExcelAnalyzer from './pages/Excelanalyzer';
import About from './pages/About';
function App(){
  return(
    <Routes>
       <Route path="/"element={<Navigate to="/dashboard" />} />
      <Route path="/login"element={<Login/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/dashboard"element={<Dashboard/>}/>
      <Route path="/excel-analyzer" element={<ExcelAnalyzer/>} />
      <Route path="/about" element={<About/>} />
    </Routes>
  );
}
export default App;