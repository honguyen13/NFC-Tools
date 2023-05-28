import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export const HistoryItem = ({vehicle, time, location, bg}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {
          vehicle,
          time,
          location,
        })
      }
      style={{backgroundColor: bg? bg: '#b3e8e5'}}
      className=" mx-5 mb-3 rounded-xl p-3 shadow-lg shadow-gray-600">
      <View className="flex-row justify-between items-center">
        <Image
          source={require('../assets/images/car.png')}
          className="h-8 w-8"
        />
        <Text className="text-black font-bold text-lg mr-3">{vehicle}</Text>
        <Text />
      </View>

      <View className="border-t border-gray-500 my-2" />

      <View className="flex-row items-center space-x-2 mb-2">
        <Image
          source={require('../assets/images/time.png')}
          className="h-6 w-6"
        />
        <Text className="text-black text-lg">{time}</Text>
      </View>
      <View className="flex-row items-center space-x-2">
        <Image
          source={require('../assets/images/gps.png')}
          className="h-6 w-6"
        />
        <Text className="text-black text-lg">{location}</Text>
      </View>
    </TouchableOpacity>
  );
};
