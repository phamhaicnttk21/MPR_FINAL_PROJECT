import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ImageBackground, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { doc, updateDoc, getFirestore, getDoc } from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth } from "firebase/auth";

const EditProfileScreen = () => {
  const auth = getAuth();
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const genderPickerData = [
    { title: 'Male' },
    { title: 'Female' },
    { title: 'Non-binary' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'users', auth.currentUser.email);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setName(userData.name);
        setGender(userData.gender);
        setAvatar({ uri: userData.avatar });
      }
    };

    fetchUserData();
  }, []);

  const selectAvatar = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setAvatar(source);
      }
    });
  };

  const updateProfile = async () => {
    const db = getFirestore();
    const docRef = doc(db, 'users', auth.currentUser.email);

    try {
      await updateDoc(docRef, {
        name,
        gender,
        avatar: avatar ? avatar.uri : null,
      });

      Alert.alert('Profile Updated', 'Your profile information has been updated successfully.');
    } catch (error) {
      console.error('Error updating document: ', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground source={avatar ? { uri: avatar.uri } : require('../assets/img/tomcruise.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={selectAvatar} style={styles.avatarContainer}>
          <Image source={avatar ? avatar : require('../assets/img/tomcruise.jpg')} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Gender</Text>
          <SelectDropdown
            data={genderPickerData}
            onSelect={(selectedItem) => setGender(selectedItem.title)}
            defaultValue={gender}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={true}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={updateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: "100%",
    height: "25%"
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100
  },
  inputGroup: {
    width: '90%',
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#0000ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  backgroundButton: {
    backgroundColor: '#008000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    borderRadius: 10,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'left',
    alignItems: 'left',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    color: '#151E26',
  },
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
});

export default EditProfileScreen;