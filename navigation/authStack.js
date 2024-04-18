import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LogInScreen from "../screens/LogInScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

function AuthStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Log In" component={LogInScreen}/>
                <Stack.Screen name = "Sign Up" component={SignUpScreen}/>
                <Stack.Screen name = "Home" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack;