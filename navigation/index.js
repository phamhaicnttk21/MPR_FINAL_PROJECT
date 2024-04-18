import useAuthentication from "../utils/hooks/useAuthentication";
import AuthStack from "./authStack";
import UserStack from "./userStack";

function RootNavigation() {
    const {user} = useAuthentication;

    return user ? <UserStack/> : <AuthStack/>;
}

export default RootNavigation;