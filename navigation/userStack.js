import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

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
        </Stack.Navigator>
    </NavigationContainer>
}

export default UserStack;