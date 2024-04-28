import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Button } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Toast from "react-native-root-toast";
import { DateTime } from "luxon";

let loginDays = [];

function HomeScreen({navigation}) {

    const dailyRewardButton = [{
        icon: require("../assets/icons/dailyRewardButtonIcon.png"),        
        name: "log_in_reward_button",
        position: 1,
    }]

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>Home Screen!</Text>  

            <Text>Welcome!</Text>  

            {/*daily reward button*/}
            {/*TO DO: Implement: +50k vnd in onPressItem
                      Recognize different users  */}
                      
            <FloatingAction
                actions={dailyRewardButton}         
                onPressItem={
                    () => {
                            today = DateTime.now().toLocaleString();
                            console.log(today);
                            if (!loginDays.includes(today)) {
                                Toast.show('daily Reward: 500k vnd!', {duration:Toast.durations.LONG},);
                                loginDays.push(today);
                            } else {
                                Toast.show('daily Rewards claimed', {duration:Toast.durations.LONG})
                            }
                            console.log(loginDays)
                        }
                }
                overrideWithAction = {true}
                color= "#ADD8E6"
                buttonSize={60}
                iconHeight={30}
                iconWidth={30}
                listenKeyboard={true}
            />  
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