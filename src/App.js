import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import withRoot from './components/hocs/withRoot';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/views/Dashboard/Dashboard';
import SignUp from './components/views/Account/SignUp';
import SignIn from './components/views/Account/SignIn';
import ForgotPassword from './components/views/Account/ForgotPassword';
import Packages from './components/views/Admin/Packages/Packages';
import SavePackage from './components/views/Admin/Packages/SavePackage';
import ViewPackages from './components/views/Admin/Packages/ViewPackages';
import PackageDetails from './components/views/Admin/Packages/PackageDetails';
import Errors from './components/views/Errors/Errors';
import PageNotFound from './components/views/Errors/PageNotFound';
import DialogGroup from './components/common/dialog/DialogGroup';
import Book from './components/views/Book/Book';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <div>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/admin/packages" element={<Packages/>}>
          <Route path="" element={<ViewPackages/>}/>
          <Route path="add" element={<SavePackage/>}/>
        </Route>
        <Route path="/packages" element={<Packages/>}>
          <Route path="" element={<ViewPackages/>}/>
          <Route path=":id" element={<PackageDetails/>}/>
          <Route path=":id/book" element={<Book/>}/>
        </Route>
        <Route path="/errors" element={<Errors/>}>
          <Route path="404" element={<PageNotFound/>}/>
        </Route>
      </Routes>
      <Footer/>
      <DialogGroup/>
    </div>
  );
}

export default withRoot(App);
