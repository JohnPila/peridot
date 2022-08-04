import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ROLES } from "../../utils/constants";

export default function withLoggedUser(Component) {
  function WithLoggedUser(props) {
    const loggedUser = useSelector(state => state.loggedUser.user);
    const isLoggedIn = useMemo(() => !!loggedUser, [loggedUser]);
    const isAdmin = useMemo(() => ROLES.ADMIN === loggedUser?.role, [loggedUser]);
    const isEmailVerified = useMemo(() => !!loggedUser?.emailVerified, [loggedUser]);
    const userEmail = useMemo(() => loggedUser?.email, [loggedUser]);

    return (
      <Component
        loggedUser={loggedUser} 
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isEmailVerified={isEmailVerified}
        userEmail={userEmail}
        {...props} 
      />
    );
  }

  return WithLoggedUser;
}