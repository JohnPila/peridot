import { Outlet } from "react-router-dom";
import withPage from "../../../hocs/withPage";

function CarRetails() {
  return (
    <Outlet />
  );
}

export default withPage(CarRetails);