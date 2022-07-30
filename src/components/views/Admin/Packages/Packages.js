import { Outlet } from "react-router-dom";
import withPage from "../../../hocs/withPage";

function Packages() {
  return (
    <Outlet />
    
  );
}

export default withPage(Packages);