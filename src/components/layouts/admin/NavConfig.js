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
    icon: getIcon('bxs:calendar-check'),
  },
  {
    title: 'Packages',
    path: '/admin/packages',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Car Rentals',
    path: '/admin/car-rentals',
    icon: getIcon('bxs:car'),
  },
];

export default navConfig;
