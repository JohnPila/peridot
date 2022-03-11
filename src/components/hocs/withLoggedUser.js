import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ROLES } from "../../utils/constants";

export default function withLoggedUser(Component) {
  function WithLoggedUser(props) {
    const loggedUser = useSelector(state => state.loggedUser.user);
    const isLoggedIn = useMemo(() => !!loggedUser, [loggedUser]);
    const isAdmin = useMemo(() => !!loggedUser && 
      ROLES.ADMIN === loggedUser.role, [loggedUser]);
    const isEmailVerified = useMemo(() => !!loggedUser && loggedUser.emailVerified, [loggedUser]);

    return (
      <Component
        loggedUser={loggedUser} 
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isEmailVerified={isEmailVerified}
        {...props} 
      />
    );
  }

  return WithLoggedUser;
}