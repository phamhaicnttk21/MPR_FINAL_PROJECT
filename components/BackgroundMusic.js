// BackgroundMusic.js
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const BackgroundMusic = () => {
  const [backgroundSound, setBackgroundSound] = useState(null);

  useEffect(() => {
    const loadBackgroundSound = async () => {
      console.log('Loading Background Sound');
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('../assets/music/background.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      setBackgroundSound(loadedSound);
    };

    loadBackgroundSound();

    return () => {
      if (backgroundSound) {
        backgroundSound.unloadAsync();
      }
    };
  }, []);

  const toggleMuteBackgroundSound = async () => {
    if (backgroundSound) {
      const status = await backgroundSound.getStatusAsync();
      await backgroundSound.setIsMutedAsync(!status.isMuted);
    }
  };

  return { backgroundSound, toggleMuteBackgroundSound };
};

export default BackgroundMusic;
