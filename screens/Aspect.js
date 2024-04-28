import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { dummyData } from '../dummyData'; 
import { FontAwesome } from '@expo/vector-icons'; 

const { height } = Dimensions.get('window');

const Aspect = () => {
  const [showMenu, setShowMenu] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const menuAnimation = useRef(new Animated.Value(-height / 2)).current;

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
  

  return (
    <View style={styles.wrap}>
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
            {dummyData.career.map((option) => (
              <Text key={option.id} style={styles.menuOptionText}>
                {option.option}
              </Text>
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
  indexWrap:{
    marginTop:60,
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
