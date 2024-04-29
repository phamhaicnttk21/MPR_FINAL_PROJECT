import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Button, Input } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function SignUpScreen({navigation}) {
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: '',
    })

    async function signUp() {
        if (value.email === "" || value.password === "") {
            setValue({
                ...value,
                error: "Enter email and password please."
            })
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('Log In');
        } catch (error) {
            setValue({
            ...value,
            error: error.message,
        })
        }

        
    }

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>Sign Up Screen!</Text> 

            {!!value.error && (
                <View style={styles.error}>
                    <Text>{value.error}</Text>
                </View>
            )}

            <View>
                <Input
                    placeholder="Email"
                    onChangeText={text => setValue({...value, email: text})}
                    leftIcon={<Ionicons name = "mail" size = {20}/>}
                    containerStyle={styles.control}
                    value = {value.email}
                />
                <Input
                    placeholder="Password"
                    onChangeText={text => setValue({...value, password: text})}
                    leftIcon={<Ionicons name = "key" size = {20}/>}
                    containerStyle={styles.control}
                    value = {value.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Sign up"
                    buttonStyle={styles.control}
                    onPress={signUp}
                />
            </View>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    control: {
        marginTop: 10,
        width: 300,
    },
    error: {
        marginTop: 10,
        padding: 10,
        color: "#fff",
        backgroundColor: "#D54826FF"
    }
  });