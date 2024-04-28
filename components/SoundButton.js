import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { Audio } from 'expo-av';

const SoundButton = ({ title, onPress, isSoundEffectsMuted, ...props }) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          require('../assets/music/buttonClick.mp3'),
          { shouldPlay: false }
        );
        setSound(loadedSound);
      } catch (error) {
        console.log('Error loading sound effect:', error);
      }
    };
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handleButtonPress = async () => {
    if (!isSoundEffectsMuted && sound) {
      try {
        await sound.replayAsync();
        if (onPress) {
          onPress();
        }
      } catch (error) {
        console.log('Error playing sound effect:', error);
      }
    } else {
      if (onPress) {
        onPress();
      }
    }
  };

  return <Button title={title} onPress={handleButtonPress} {...props} />;
};

export default SoundButton;