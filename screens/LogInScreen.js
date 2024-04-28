import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Button, Input } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, collection, getDoc } from 'firebase/firestore';

const auth = getAuth();

function LogInScreen({navigation}) {
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
    })

    async function logIn() {
        if (value.email === "" || value.password === "") {
            setValue({
                ...value,
                error: "Enter email and password please."
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);

            const db = getFirestore();
            const docRef = doc(db, 'users', auth.currentUser.email);
            getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                navigation.navigate('Aspect');            
            } else {
                navigation.navigate('Profile');
            }
            }).catch((error) => {
                console.error(error);
                Alert.alert('Error', error);
            });

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
            <Text>Log In Screen!</Text> 

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
                    title="Log In"
                    buttonStyle={styles.control}
                    onPress={logIn}
                />

            </View>
        </View>
    );
}

export default LogInScreen;

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