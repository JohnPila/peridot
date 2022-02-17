import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import withRoot from './components/hocs/withRoot';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/views/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default withRoot(App);
