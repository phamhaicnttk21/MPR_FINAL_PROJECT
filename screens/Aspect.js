import React, { useState, useRef, useEffect, Children } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, FlatList, Alert, Modal, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { doc, getFirestore, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { dummyData } from '../dummyData';
import { FloatingAction } from "react-native-floating-action";
import Toast from "react-native-root-toast";
import { DateTime } from "luxon";
import ProgressBar from 'react-native-progress/Bar';

const { height } = Dimensions.get('window').height;
const { width } = Dimensions.get('window').width;

const Aspect = () => {
  const [currentAge, setCurrentAge] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const menuAnimation = useRef(new Animated.Value(-height / 2)).current;
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const fetchUserAge = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.email);

      try {
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setCurrentAge(data.currentAge);
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error reading document: ", error);
      }
    };

    fetchUserAge();
  }, []);

  

  async function writeUserDatabase() {
    try {
      await setDoc(doc(db, 'users', auth.currentUser.email), {

        name: name,
        email: auth.currentUser.email,
        gender: gender,

      })
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }



  async function getLoginDays() {
    const db = getFirestore();
    const auth = getAuth();
    const userEmail = auth.currentUser.email;
  
    if (!userEmail) {
      console.log('User not authenticated');
      return;
    }
  
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const loginDaysData = docSnap.data().loginDays || [];
      const today = DateTime.now().toLocaleString();
  
      if (!loginDaysData.includes(today)) {
        console.log('button clicked!')
        Toast.show('Daily Reward: 500k vnd!', { duration: Toast.durations.LONG });
        const updatedLoginDays = [...loginDaysData, today];
  
        try {
          await updateDoc(docRef, { loginDays: updatedLoginDays });
          console.log('Document updated successfully');
        } catch (error) {
          console.error('Error updating document:', error);
        }
      } else {
        Toast.show('Daily Rewards claimed', { duration: Toast.durations.LONG });
      }
    } else {
      console.log('No such document!');
    }
  }

  async function updateUserPoints(option) {
    try {
      const user = firebase.auth().currentUser;
      const uid = user ? user.uid : null;

      if (uid) {
        const userRef = firebase.firestore().doc(users / $, { uid });
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          // Update the existing user document with the new points
          await userRef.update({
            happiness: userDoc.data().happiness + option.happiness,
            intelligence: userDoc.data().intelligence + option.intelligencePoints,
            charisma: userDoc.data().charisma + option.charismaPoints,
            // Add other attributes as needed
          });
        } else {
          // Create a new user document with the initial points
          await userRef.set({
            happiness: option.happiness,
            intelligence: option.intelligencePoints,
            charisma: option.charismaPoints,
            // Add other attributes as needed
          });
        }
      }
    } catch (error) {
      console.error('Error updating user points:', error);
    }
  }

  
  const dailyRewardButton = [{
    icon: require("../assets/icons/dailyRewardButtonIcon.png"),
    name: "log_in_reward_button",
    position: 1,
  }];

  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    readData();
  }, []);

  const toggleMenu = (clickedMenuType) => {
    setModalVisible(true);
    setMenuType(clickedMenuType);
  };

  const renderMenuContent = () => {
    let options = [];
    switch (menuType) {
      case 'career':
        options = dummyData.career;
        break;
      case 'social':
        options = dummyData.social;
        break;
      case 'finance':
        options = dummyData.finance;
        break;
      case 'activities':
        options = dummyData.activities;
        break;
      default:
        return null;
    }
    return (
      <View style={styles.menuContent}>
        {options.map((option) => (
          <TouchableOpacity key={option.id} onPress={() => handlePress(option)}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>{option.option}</Text>
              {selectedOptions.includes(option.id) && (
                <TouchableOpacity onPress={() => removeOption(option.id)}>
                  <FontAwesome name="times-circle" size={20} color="red" />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const removeOption = (id) => {
    setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAge(currentAge => (currentAge + 1) % dummyData.ageoptions.length);
    }, 1200 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const updateUserAge = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.email);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const newAge = data.currentAge + 1;
        if (newAge > 100) {
          newAge = 0;
        }
        const newData = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          currentAge: newAge,
          happiness: data.happiness,
          intelligence: data.intelligence,
          christma: data.christma,
          strength: data.strength,
          health: data.health
        };
        return setDoc(userDocRef, newData);

      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateUserAge, 5000);

    return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
  }, []);



  const currentAgeData = dummyData.ageoptions.find(option => option.age === currentAge);

  const readData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.email);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data());
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  };
  const pointData = readData();
  const handleOptionPress = async (happiness, health, intelligence, strength, christma) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.email);

    // Get the current document data
    getDoc(userDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          const inthappiness = parseInt(happiness || 0);
          const inthealth = parseInt(health || 0);
          const intintelligence = parseInt(intelligence || 0);
          const intchristma = parseInt(christma || 0);
          const intstrength = parseInt(strength || 0);

          console.log(data.happiness);
          const newData = {
            name: data.name,
            email: data.email,
            gender: data.gender,
            currentAge: data.currentAge,
            happiness: (data.happiness || 0) + inthappiness,
            intelligence: (data.intelligence || 0) + intintelligence,
            christma: (data.christma || 0) + intchristma,
            strength: (data.strength || 0) + intstrength,
            health: (data.health || 0) + inthealth
          };
          return setDoc(userDocRef, newData);
        } else {
          throw new Error("Document does not exist");
        }
      })
      .then(() => {
        console.log("Document successfully updated!");
        // Call the readData function to fetch the updated data
        readData();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  const handlePress = async (option) => {
    switch (menuType) {
      case 'career':
        await handleCareerPress(option);
        break;
      case 'social':
        await handleSocialPress(option);
        break;
      case 'finance':
        await handleFinancePress(option);
        break;
      case 'activities':
        await handleActivitiesPress(option);
        break;
      default:
        break;
    }
  };

  const handleCareerPress = async (option) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.email);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        const newData = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          currentAge: data.currentAge,
          happiness: (data.happiness || 0) + (option.happiness || 0),
          intelligence: (data.intelligence || 0) + (option.intelligence || 0),
          charisma: (data.charisma || 0) + (option.charisma || 0),
          strength: (data.strength || 0) + (option.strength || 0),
          health: data.health || 0,
        };

        await setDoc(userDocRef, newData);
        console.log("Document successfully updated!");
        readData(); // Call the readData function to fetch the updated data
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };;

  const handleSocialPress = async (option) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.email);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        const newData = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          currentAge: data.currentAge,
          happiness: (data.happiness || 0) + (option.happiness || 0),
          intelligence: (data.intelligence || 0) + (option.intelligence || 0),
          charisma: (data.charisma || 0) + (option.charisma || 0),
          strength: (data.strength || 0) + (option.strength || 0),
          health: data.health || 0,
        };

        await setDoc(userDocRef, newData);
        console.log("Document successfully updated!");
        readData(); // Call the readData function to fetch the updated data
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleFinancePress = async (option) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.email);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        const newData = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          currentAge: data.currentAge,
          happiness: (data.happiness || 0) + (option.happiness || 0),
          intelligence: (data.intelligence || 0) + (option.intelligence || 0),
          charisma: (data.charisma || 0) + (option.charisma || 0),
          strength: (data.strength || 0) + (option.strength || 0),
          health: data.health || 0,
        };

        await setDoc(userDocRef, newData);
        console.log("Document successfully updated!");
        readData(); // Call the readData function to fetch the updated data
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleActivitiesPress = async (option) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.email);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        const newData = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          currentAge: data.currentAge,
          happiness: (data.happiness || 0) + (option.happiness || 0),
          intelligence: (data.intelligence || 0) + (option.intelligence || 0),
          charisma: (data.charisma || 0) + (option.charisma || 0),
          strength: (data.strength || 0) + (option.strength || 0),
          health: data.health || 0,
        };

        await setDoc(userDocRef, newData);
        console.log("Document successfully updated!");
        readData(); // Call the readData function to fetch the updated data
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };


  return (
    <View style={styles.wrap}>
      <ProgressBar
        progress={currentIndex} 
        width={Dimensions.get('window').width}
        height={20}
      />
    
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Age: {currentAge}</Text>
        <FlatList
          data={currentAgeData ? currentAgeData.activities : []}
          renderItem={({ item: activity }) => (
            <TouchableOpacity
              onPress={() =>
                handleOptionPress(
                  activity.happiness,
                  activity.health || 0,
                  activity.intelligence || 0,
                  activity.strength || 0
                )
              }
            >
              <View style={{ marginLeft: 20 }}>
                <Text>{activity.option}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(activity, index) => index.toString()}
        />
        {/*daily reward button*/}
        {/*TO DO: Implement: +50k vnd in onPressItem
                      Recognize different users  */}

            <FloatingAction
                actions={dailyRewardButton}
                onPressItem={
                    () => {                        
                        getLoginDays();
                    }
                }
                overrideWithAction={true}
                color="#ADD8E6"
                buttonSize={60}
                iconHeight={30}
                iconWidth={30}
                listenKeyboard={true}
            />
      </View>
      
      <View style={styles.aspectOverview}>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.career} onPress={() => toggleMenu('career')}>
            <Text style={styles.careerText}>Career</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.social} onPress={() => toggleMenu('social')}>
            <Text style={styles.socialText}>Social</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finance} onPress={() => toggleMenu('finance')}>
            <Text style={styles.financeText}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activities} onPress={() => toggleMenu('activities')}>
            <Text style={styles.activitiesText}>Activities</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>Choose {menuType}</Text>
            {showMenu === 'all' ? (
              <View style={styles.menuContent}>
                {dummyData.career.map((option) => (
                  <OptionButton
                    key={option.id}
                    option={option}
                    onPress={() => handleCareerPress(option)}
                  />
                ))}
                {dummyData.social.map((option) => (
                  <OptionButton
                    key={option.id}
                    option={option}
                    onPress={() => handleSocialPress(option)}
                  />
                ))}
                <OptionButton
                  key={option.id}
                  option={option}
                  onPress={() => handleFinancePress(option)}
                />
                <OptionButton
                  key={option.id}
                  option={option}
                  onPress={() => handleActivitiesPress(option)}
                />

              </View>
            ) : renderMenuContent()}
            <Pressable
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.indexWrap}>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Health</Text>
          <Text>{userData ? userData.health : 'Loading...'}</Text>
          <View style={styles.barContainer}>
            <Text>{pointData.health}</Text>
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Happiness</Text>
          <Text>{userData ? userData.happiness : 'Loading...'}</Text>
          <View style={styles.barContainer}>
            <Text>{pointData.happiness}</Text>
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Strength</Text>
          <Text>{userData ? userData.strength : 'Loading...'}</Text>
          <View style={styles.barContainer}>
            <Text>{pointData.strength}</Text>
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Intelligence</Text>
          <Text>{userData ? userData.intelligence : 'Loading...'}</Text>
          <View style={styles.barContainer}>
            <Text>{pointData.intelligence}</Text>
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Charisma</Text>
          <Text>{userData ? userData.charisma : 'Loading...'}</Text>
          <View style={styles.barContainer}>
            <Text>{pointData.christma}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    height: "100%",
    backgroundColor: '#FEFBF6',
  },
  aspectOverview: {
    width: "100%",
    height: "10%",
    backgroundColor: "#1679AB",
    marginTop: "110%",
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  career: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  careerText: {
    color: 'white',
  },
  social: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  socialText: {
    color: 'white',
  },
  finance: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  financeText: {
    color: 'white',
  },
  activities: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  activitiesText: {
    color: 'white',
  },
  allOptionsButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  allOptionsText: {
    color: 'white',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: height / 2,
  },
  menuContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  menuOptionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  indexWrap: {
    marginTop: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    width: 100,
    marginRight: 10,
    textAlign: 'right',
  },
  barContainer: {
    flex: 1,
    height: 10,
    backgroundColor: 'lightgray', // Background color for the container
    borderRadius: 5, // Rounded corners for the container
    overflow: 'hidden', // Ensure the colored bar doesn't overflow the container
  },
  bar: {
    height: '100%',
    borderRadius: 5, // Match the border radius of the container
  },
  // Define colors for each attribute
  barHealth: {
    backgroundColor: 'green',
  },
  barHappiness: {
    backgroundColor: 'blue',
  },
  barStrength: {
    backgroundColor: 'orange',
  },
  barIntelligence: {
    backgroundColor: 'purple',
  },
  barCharisma: {
    backgroundColor: 'red',
  },
  // Define colors for each attribute
  barHealth: {
    backgroundColor: 'green',
  },
  barHappiness: {
    backgroundColor: 'blue',
  },
  barStrength: {
    backgroundColor: 'orange',
  },
  barIntelligence: {
    backgroundColor: 'purple',
  },
  barCharisma: {
    backgroundColor: 'red',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtonClose: {
    backgroundColor: '#2196F3',
  },
});

export default Aspect;