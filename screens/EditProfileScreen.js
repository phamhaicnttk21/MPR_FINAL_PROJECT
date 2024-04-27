import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const EditProfileScreen = ({ route, navigation }) => {
  const { initialData } = route.params;
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [age, setAge] = useState(initialData.age.toString());
  const [work, setWork] = useState(initialData.work);
  const [address, setAddress] = useState(initialData.address);

  function updateProfile (){
    // Here you can update the profile information, for example, sending it to a server
    // You can replace this alert with actual logic to update the profile
    // Alert.alert('Profile Updated', 'Your profile information has been updated successfully.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Enter your age"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Work</Text>
      <TextInput
        value={work}
        onChangeText={setWork}
        style={styles.input}
        placeholder="Enter your work"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        placeholder="Enter your address"
        placeholderTextColor="#666"
      />

      {/* <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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

export default EditProfileScreen;
