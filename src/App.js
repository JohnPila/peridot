import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import withRoot from './components/hocs/withRoot';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/views/Dashboard/Dashboard';
import SignUp from './components/views/Account/SignUp';
import SignIn from './components/views/Account/SignIn';
import ForgotPassword from './components/views/Account/ForgotPassword';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default withRoot(App);
