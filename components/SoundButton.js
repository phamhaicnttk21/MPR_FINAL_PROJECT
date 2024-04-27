// SoundButton.js
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { Audio } from 'expo-av';

const SoundButton = ({ title, onPress, ...props }) => {
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
    if (sound) {
      try {
        await sound.replayAsync();
        if (onPress) {
          onPress();
        }
      } catch (error) {
        console.log('Error playing sound effect:', error);
      }
    }
  };

  const toggleMute = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      await sound.setIsMutedAsync(!status.isMuted);
    }
  };

  return { Button: <Button title={title} onPress={handleButtonPress} {...props} />, toggleMute };  // Return the Button component and the toggleMute function
};

export default SoundButton;
