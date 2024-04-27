import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InstructionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Instructions Screen</Text>
      {/* Add your instructions content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InstructionsScreen;
