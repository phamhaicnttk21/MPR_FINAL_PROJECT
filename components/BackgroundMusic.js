// BackgroundMusic.js
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const BackgroundMusic = () => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadSound = async () => {
      console.log('Loading Sound');
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('../assets/music/background.mp3'),
        { shouldPlay: true }  // This will start playing as soon as it's loaded
      );
      setSound(loadedSound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // This will keep the sound playing as long as the component is mounted
  useEffect(() => {
    if (sound) {
      sound.setIsLoopingAsync(true);
    }
  }, [sound]);

  const toggleMute = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      await sound.setIsMutedAsync(!status.isMuted);
    }
  };

  return { sound, toggleMute };  // Return the sound object and the toggleMute function
};

export default BackgroundMusic;
