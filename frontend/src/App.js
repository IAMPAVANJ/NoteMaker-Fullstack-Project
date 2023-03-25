
import './App.css';
import Register from './components/signUp FOrm/register';
import Login from './components/login form/login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/homePage/homepage';
import CreateNote from './components/createNote/createNote';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/createNote' element={<CreateNote/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
