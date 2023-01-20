import { useEffect } from "react";
import { useRouter } from "next/router";
import { FRONTEND_ROUTER } from "constants/constants";
import { useUserContext } from "client/context/UserContext";

interface ComponentProps {
  children: JSX.Element | JSX.Element[];
}
const RouteGuard = ({ children }: ComponentProps) => {
  const { user } = useUserContext();
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    if (!user && !unprotectedRoutes.includes(pathname)) {
      alert("pathname en route guard: " + pathname);
      router.push(FRONTEND_ROUTER.LOGIN, {
        pathname: FRONTEND_ROUTER.LOGIN,
        //see how to set "from" afterwards
        query: { from: pathname },
      });
    }
  }, [user, pathname]);

  return <>{children}</>;
};

//see how to bind the folder name to the frontend_router, maybe with a test?
const unprotectedRoutes = [FRONTEND_ROUTER.LOGIN];

export default RouteGuard;
