// RewardedSound.js
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const RewardedSound = () => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
            require('../assets/music/rewardedSound.mp3'),
          {shouldPlay: false},
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

  const playSound = async () => {
    if (sound) {
      try {
        await sound.replayAsync();
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

  return { playSound, toggleMute };  // Return the playSound function and the toggleMute function
};

export default RewardedSound;
