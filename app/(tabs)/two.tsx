import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
} from 'react-native';
import LottieView from 'lottie-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabTwoScreen = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleKeyboardToggle = () => {
    setIsKeyboardVisible(true);
    setIsListening(false); // Stop listening if keyboard is opened
  };

  const handleMicPress = () => {
    setIsListening(true);
    setIsKeyboardVisible(false); // Hide keyboard if mic is activated
    setInputText('');
  };

  const handleClose = () => {
    setIsListening(false);
    setIsKeyboardVisible(false);
    setInputText('');
    Keyboard.dismiss(); // Hide keyboard if open
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {isListening ? 'Listening...' : 'Speaking to AI bot'}
        </Text>
        <Text style={styles.subtitle}>
          {isListening ? "I'm processing your voice input" : "Go ahead, I'm listening"}
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.animationContainer}>
        {isKeyboardVisible ? (
          // Show Text Input when Keyboard icon is clicked
          <TextInput
            style={styles.textInput}
            placeholder="Type your query here..."
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            autoFocus
            multiline
          />
        ) : (
          // Show Animated Ring when not typing
          <LottieView
            source={require('../../assets/ai_ring_animation.json')} // Replace with your Lottie file
            autoPlay
            loop
            style={styles.lottie}
          />
        )}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleKeyboardToggle}
        >
          <MaterialIcons name="keyboard" size={28} color="#60A5FA" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleMicPress}
        >
          <MaterialIcons name="mic" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleClose}
        >
          <MaterialIcons name="close" size={28} color="#E53E3E" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // Light background color
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B', // Dark gray text
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4F46E5', // Blue accent
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 220,
    height: 220,
  },
  textInput: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 15,
    fontSize: 16,
    color: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Shadow for Android
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Shadow for Android
  },
  primaryButton: {
    backgroundColor: '#60A5FA', // Blue for primary action
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0', // Light gray for secondary actions
  },
});

export default TabTwoScreen;
