import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image } from "react-native";
import {Button} from 'react-native-elements';

function WelcomeScreen({navigation}) {
    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>Welcome Screen!</Text>            

            <View style={styles.buttons}>
                <Button
                    title="Log in"
                    buttonStyle={styles.button}
                    onPress={() => navigation.navigate('Log In')}
                />
                <Button
                    title="Sign up"
                    buttonStyle={styles.button}
                    type="outline"
                    onPress={() => navigation.navigate('Sign Up')}
                />
            </View>
            
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttons: {
        flex:1
    },
    button: {
        marginTop: 10,
    }
  });