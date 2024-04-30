import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const TwelveMinuteProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const requestRef = useRef(null);
  const startTime = useRef(null);

  useEffect(() => {
    const totalDuration = 720000; // 12 minutes in milliseconds
    const animate = (currentTime) => {
      if (!startTime.current) {
        startTime.current = currentTime;
      }
      const elapsedTime = currentTime - startTime.current;
      const newProgress = elapsedTime / totalDuration;
      if (newProgress >= 1) {
        setProgress(0); // Reset progress to 0
        startTime.current = null; // Reset startTime to restart the timer
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(newProgress);
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <ProgressBar
      progress={progress}
      width={Dimensions.get('window').width}
      height={20}
    />
  );
};

export default TwelveMinuteProgressBar;