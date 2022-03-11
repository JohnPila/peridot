import { Outlet } from "react-router-dom";
import withPage from "../../hocs/withPage";

function Errors() {
  return (
    <Outlet />
  );
}

export default withPage(Errors);