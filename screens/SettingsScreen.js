// SettingsScreen.js
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import SoundButton from '../components/SoundButton';
import BackgroundMusic from '../components/BackgroundMusic';
import RewardedSound from '../components/RewardedSound';

const SettingsScreen = ({ navigation }) => {
  const backgroundMusic = BackgroundMusic();
  const rewardedSound = RewardedSound();
  const soundButton = SoundButton({ title: "Go to Instruction Screen", onPress: () => navigation.navigate('Instruction') });

  return (
    <View style={styles.container}>
      <SoundButton
        title="Mute/Unmute Background Music"
        onPress={backgroundMusic.toggleMute}
      />
      <SoundButton
        title="Mute/Unmute Sound Effects"
        onPress={() => {
          rewardedSound.toggleMute();
          soundButton.toggleMute();
        }}
      />
      {soundButton.Button}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
