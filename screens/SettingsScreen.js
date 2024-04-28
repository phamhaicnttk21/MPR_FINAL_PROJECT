import React from 'react';
import { View, StyleSheet } from 'react-native';
import SoundButton from '../components/SoundButton';

const SettingsScreen = ({ route, navigation }) => {
  const {
    backgroundSound,
    toggleMuteBackgroundSound,
    toggleMuteSoundEffects,
    isSoundEffectsMuted,
  } = route.params;

  return (
    <View style={styles.container}>
      <SoundButton
        title="Mute/Unmute Background Music"
        onPress={toggleMuteBackgroundSound}
        isSoundEffectsMuted={isSoundEffectsMuted}
      />
      <SoundButton
        title={isSoundEffectsMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        onPress={toggleMuteSoundEffects}
        isSoundEffectsMuted={isSoundEffectsMuted}
      />
      <SoundButton
        title="Go to Instruction Screen"
        onPress={() => navigation.navigate('Instructions')}
        isSoundEffectsMuted={isSoundEffectsMuted}
      />
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