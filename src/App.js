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
import BookCarRental from './components/views/Carrental/BookCarRental';
import AirportTransfer from './components/views/AirportTransfer/AirportTransfer';
import ContactUs from './components/views/Contact/ContactUs';
import EnterDetails from './components/views/Carrental/Enterdetails';
import Payment from './components/views/Carrental/Payment';
import AirportBooking from './components/views/Admin/AirportTransfer/AirportBooking';
import BookAirportTransfer from './components/views/AirportTransfer/BookAirportTransfer';
import ViewCarRentals from './components/views/Admin/CarRental/ViewCarRentals';
import DashboardApp from './components/views/Admin/AdminDashboard/DashboardApp';
import ViewCarRental from './components/views/Carrental/ViewCarRental'
import { SnackbarProvider } from 'notistack';
import ViewAllAirport from './components/views/Admin/AirportTransfer/ViewAllAirport';

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/car-rental" element={<BookCarRental />}/>
        <Route path="/view-carrental" element={<ViewCarRental />}/>
        <Route path="/enter-details" element={<EnterDetails />}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/admin/dashboard" element={<DashboardApp/>}/>
        <Route path="/admin/packages" element={<Packages/>}>
          <Route path="" element={<ViewPackages/>}/>
          <Route path="add" element={<SavePackage/>}/>
        </Route>
        <Route path="/admin/airport-transfer" element={<AirportBooking />}/>
        <Route path="/admin/view-all-airport" element={<ViewAllAirport />}/>
        <Route path="/admin/car-rentals" element={<ViewCarRentals/>}/>
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
        {/* <Route path="/carrentaldetails" element={<CarRentals/>}/>
        <Route path="/view-carrental" element={<ViewCarRental/>}/>
        <Route path="/error" element={<Errors/>}/> */}
      </Routes>
      <Footer/>
      <DialogGroup/>
    </SnackbarProvider>
  );
}

export default withRoot(App);
