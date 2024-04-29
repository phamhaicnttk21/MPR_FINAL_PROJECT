import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { dummyData } from '../dummyData';
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const { height } = Dimensions.get('window');

const Aspect = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const menuAnimation = useRef(new Animated.Value(-height / 2)).current;




  async function writeUserDatabase() {
    const db = getFirestore();
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




  useEffect(() => {
    setLoading(false);
  }, []);

  const toggleMenu = (menuType) => {
    if (showMenu === menuType) {
      hideMenu();
    } else {
      showMenuAnimation(menuType);
    }
  };

  const showMenuAnimation = (menuType) => {
    setShowMenu(menuType);
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: -height / 2,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowMenu(null);
    });
  };

  const renderMenuContent = () => {
    let options = [];
    switch (showMenu) {
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
          <TouchableOpacity key={option.id} >
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>
                {option.option}
              </Text>
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % dummyData.ageoptions.length);
    }, 12 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
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
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  const handlePress = async () => {
    await updateUserPoints(option);
    onPress();
  };

  return (
    <View style={styles.wrap}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Age: {dummyData.ageoptions[currentIndex].age}</Text>
        <FlatList
          data={dummyData.ageoptions[currentIndex].activities}
          renderItem={({ item: activity }) => (
            <TouchableOpacity onPress={() => handleOptionPress(activity.happiness, activity.health, activity.intelligence, activity.strength, activity.christma)}>
              <View style={{ marginLeft: 20 }}>
                <Text>{activity.option}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(activity, index) => index.toString()}
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
      <Animated.View style={[styles.menuContainer, { transform: [{ translateY: menuAnimation }] }]}>
        {showMenu === 'all' ? (
          <View style={styles.menuContent}>
            {options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                onPress={() => handleOptionPress(option)}
              />
            ))}
            {dummyData.social.map((option) => (
              <Text key={option.id} style={styles.menuOptionText}>
                {option.option}
              </Text>
            ))}
            {dummyData.finance.map((option) => (
              <Text key={option.id} style={styles.menuOptionText}>
                {option.option}
              </Text>
            ))}
            {dummyData.activities.map((option) => (
              <Text key={option.id} style={styles.menuOptionText}>
                {option.option}
              </Text>
            ))}
          </View>
        ) : renderMenuContent()}
      </Animated.View>
      <View style={styles.indexWrap}>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Health</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, styles.barHealth, { width: '80%' }]} />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Happiness</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, styles.barHappiness, { width: '60%' }]} />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Strength</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, styles.barStrength, { width: '70%' }]} />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Intelligence</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, styles.barIntelligence, { width: '90%' }]} />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.label}>Charisma</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, styles.barCharisma, { width: '50%' }]} />
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
    marginTop: 10,
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

});

export default Aspect;