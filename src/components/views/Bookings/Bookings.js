import { Outlet } from "react-router-dom";
import withPage from "../../hocs/withPage";

function Bookings() {
  return (
    <Outlet />
  );
}

export default withPage(Bookings);