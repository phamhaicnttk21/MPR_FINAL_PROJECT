import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LogInScreen from "../screens/LogInScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import Aspect from "../screens/Aspect";

const Stack = createStackNavigator();

function AuthStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Log In" component={LogInScreen}/>
                <Stack.Screen name = "Sign Up" component={SignUpScreen}/>
                <Stack.Screen name = "Home" component={HomeScreen}/>
                <Stack.Screen name='Profile'
                    component={ProfileScreen}
                    options={{title:'Profile'}}
                />
                <Stack.Screen 
                    name='EditProfile'
                    component={EditProfileScreen}
                    options={{title:'Edit Profile'}}
                />
               <Stack.Screen 
                    name='Aspect'
                    component={Aspect}
                    options={{title:'Aspect'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack;