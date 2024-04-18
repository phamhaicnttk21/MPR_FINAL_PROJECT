import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function useAuthentication() {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribeFromAuthStatusChange = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
        return unsubscribeFromAuthStatusChange;
    }, []);

    return {user};
}

export default useAuthentication;