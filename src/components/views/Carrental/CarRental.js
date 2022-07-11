import { Outlet } from "react-router-dom";
import withPage from "../../hocs/withPage";

function CarRental() {
  return (
    <Outlet />
  );
}

export default withPage(CarRental);