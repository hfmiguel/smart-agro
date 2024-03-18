import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faCheckCircle, faLeaf } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({ navigation }) => {
  const [scale] = useState(new Animated.Value(1));

  const animateScale = (newValue) => {
    Animated.spring(scale, {
      toValue: newValue,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = () => {
    animateScale(0.95);
  };

  const handlePressOut = () => {
    animateScale(1);
  };

  return (
    <View className="flex flex-col h-screen bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 items-center justify-center">
      <FontAwesomeIcon icon={faLeaf} className="text-white text-6xl mb-8" />
      <Text className="text-6xl text-white font-bold mb-8">
        Bem-vindo ao App Agrícola
      </Text>
      <View className="flex flex-row gap-8">
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity
            className="bg-white text-green-700 font-bold py-3 px-6 rounded-lg shadow-md inline-flex items-center mb-4"
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate('Classificacao')}
          >
            <FontAwesomeIcon icon={faSeedling} className="mr-2" />
            <Text>Classificação</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity
            className="bg-white text-green-700 font-bold py-3 px-6 rounded-lg shadow-md inline-flex items-center hover:bg-green-700 hover:text-white mb-4"
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate('Verificacao')}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            <Text>Verificação</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default HomeScreen;
