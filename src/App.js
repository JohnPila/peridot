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
import BookResult from './components/views/Book/BookResult';
import Bookings from './components/views/Bookings/Bookings';
import ViewBookings from './components/views/Bookings/ViewBookings';
import BookingDetails from './components/views/Bookings/BookingDetails';
import AboutUs from './components/views/About/AboutUs';
import CarRental from './components/views/Carrental/CarRental';
import AirportTransfer from './components/views/AirportTransfer/AirportTransfer';
import ContactUs from './components/views/Contact/ContactUs';
import EnterDetails from './components/views/Carrental/Enterdetails';
import Payment from './components/views/Carrental/Payment';
import ViewAirportTransfer from './components/views/Admin/AirportTransfer/ViewAllAirportTransfer';
import BookAirportTransfer from './components/views/AirportTransfer/BookAirportTransfer';
import ViewAllCarRentails from './components/views/Admin/CarRental/ViewAllCarRentails';
import CarRetails from './components/views/Admin/CarRental/CarRetails';
import DashboardApp from './components/views/Admin/AdminDashboard/DashboardApp';

function App() {
  return (
    <div>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/car-rental" element={<CarRental />}/>
        <Route path="/enter-details" element={<EnterDetails />}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="admin/view-airport-transfer" element={<ViewAirportTransfer />}/>
        <Route path="/admin/dashboard" element={<DashboardApp/>}/>
        <Route path="/admin/packages" element={<Packages/>}>
          <Route path="" element={<ViewPackages/>}/>
          <Route path="add" element={<SavePackage/>}/>
        </Route>
        <Route path="/packages" element={<Packages/>}>
          <Route path="" element={<ViewPackages/>}/>
          <Route path=":id" element={<PackageDetails/>}/>
          <Route path=":id/book" element={<Book/>}/>
          <Route path=":id/book/result" element={<BookResult/>}/>
        </Route>
        <Route path="/bookings" element={<Bookings/>}>
          <Route path="" element={<ViewBookings/>}/>
          <Route path=":id" element={<BookingDetails/>}/>
        </Route>
        <Route path="/aiport-transfer" element={<AirportTransfer/>}>
          <Route path="" element={<BookAirportTransfer/>}/>
          <Route path="book" element={<Book/>}/>
        </Route>
        <Route path="/errors" element={<Errors/>}>
          <Route path="404" element={<PageNotFound/>}/>
        </Route>
        <Route path="/carrentaldetails" element={<CarRetails/>}/>
          <Route path="/ViewAllCarRentails" element={<ViewAllCarRentails/>}/>
          <Route path="/error" element={<Errors/>}/>
      </Routes>
      <Footer/>
      <DialogGroup/>
    </div>
  );
}

export default withRoot(App);
