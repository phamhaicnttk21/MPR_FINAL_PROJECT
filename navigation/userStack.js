import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import Aspect from "../screens/Aspect";

const Stack = createStackNavigator();

function UserStack() {
    <NavigationContainer>
        <Stack.Navigator>
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
}

export default UserStack;