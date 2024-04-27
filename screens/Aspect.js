import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { dummyData } from '../dummyData'; 
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
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
 const showAllOptions = () => {
  setShowMenu('all');
  Animated.timing(menuAnimation, {
   toValue: 0,
   duration: 300,
   useNativeDriver: true,
  }).start();
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
     <TouchableOpacity style={styles.allOptionsButton} onPress={showAllOptions}>
      <Text style={styles.allOptionsText}>Show All</Text>
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
});

export default Aspect;