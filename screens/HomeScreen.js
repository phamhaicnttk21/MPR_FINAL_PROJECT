import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";

function HomeScreen() {

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>Home Screen!</Text>  

            <Text>Welcome!</Text>       
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });