import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ImageBackground} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { doc, setDoc, getFirestore, collection } from 'firebase/firestore';



const ProfileScreen = () => {

  
  const [name, setName] = useState('Alexa');
  const [email, setEmail] = useState('email@gmail.com');
  const [age, setAge] = useState('30');
  const [work, setWork] = useState('Developer');
  const [address, setAddress] = useState('123 Street, City');
  const [avatar, setAvatar] = useState(require('../assets/img/tomcruise.jpg')); // Make sure you have this image in your assets
  
  

  async function writeUserDatabase(userId, name, email) {
    const db = getFirestore();
  
    try {
      await setDoc(doc(db, 'users', userId), {
        username: name,
        email: email,
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }

  

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

  const updateProfile = (userId) => {
    

    writeUserDatabase(userId, name, email);

    const db = getFirestore();
    const docRef = doc(db, 'users', userId);

    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        Alert.alert('Profile Updated', `Your profile information has been updated successfully.`);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    
  };

  return (
    <ImageBackground
      source={require('../assets/img/tomcruise.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <TouchableOpacity onPress={selectAvatar} style={styles.avatarContainer}>
          <Image source={avatar} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.input}>{name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.input}>{email}</Text>

          <Text style={styles.label}>Age</Text>
          <Text style={styles.input}>{age}</Text>

          <Text style={styles.label}>Work</Text>
          <Text style={styles.input}>{work}</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.input}>{address}</Text>
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
    width:"100%",
    height:"25%"
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
    borderRadius:100
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
  },
  button: {
    backgroundColor: '#0000ff',
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
});

export default ProfileScreen;