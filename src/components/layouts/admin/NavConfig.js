// component
import Iconify from '../../common/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Bookings',
    path: '/bookings',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Packages',
    path: '/packages',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Airport Transfer',
    path: '/aiport-transfer',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Car Rentals',
    path: '/carrentaldetails',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
