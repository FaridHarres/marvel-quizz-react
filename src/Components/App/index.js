import '../../App.css';
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome/Index';
import Login from '../Login/Index';
import Signup from '../SignUp/Index';
import Errorpage from '../ErrorPage/Index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgetPassword from '../Forgetpassword/Index';
import { IconContext } from 'react-icons'

function App() {
  return (

    <BrowserRouter>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Header />
        <Routes>

          <Route exact path='/' element={<Landing />} />
          <Route path='/welcome' element={<Welcome />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgetpassword' element={<ForgetPassword />}></Route>
          <Route path='*' element={<Errorpage />} />

        </Routes>
        <Footer />
      </IconContext.Provider>
    </BrowserRouter>

  );
}

export default App;
