// component
import Iconify from '../../common/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const getLargeIcon = (name) => <Iconify icon={name} width={35} height={35} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Bookings',
    path: '/bookings',
    icon: getIcon('bxs:calendar-check'),
  },
  {
    title: 'Packages',
    path: '/admin/packages',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Airport Transfer',
    path: '/admin/airport-transfer',
    icon: getLargeIcon('ic:round-connecting-airports'),
  },
  {
    title: 'Car Rentals',
    path: '/admin/car-rentals',
    icon: getIcon('bxs:car'),
  },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;