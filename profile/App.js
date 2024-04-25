import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfileScreen from './EditProfileScreen';

// Remove the import of Stack

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
