import { Outlet } from "react-router-dom";
import withPage from "../../hocs/withPage";

function AirportTransfer() {
  return (
    <Outlet />
  );
}

export default withPage(AirportTransfer);