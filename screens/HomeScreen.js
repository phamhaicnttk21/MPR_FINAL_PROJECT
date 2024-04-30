import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Button ,TouchableOpacity} from "react-native";




function HomeScreen({ navigation }) {

    

    const handlePlayGame = () => {
        // Navigate to Aspect screen
        navigation.navigate('Aspect');
      };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Home Screen!</Text>

            <Text>Welcome!</Text>

            <TouchableOpacity style={styles.button} onPress={handlePlayGame}>
                <Text style={styles.buttonText}>Play game</Text>
            </TouchableOpacity>

            
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