import { Outlet } from "react-router-dom";
import withPage from "../../hocs/withPage";

function Car() {
  return (
    <Outlet />
  );
}

export default withPage(Car);