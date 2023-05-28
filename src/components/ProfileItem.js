import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const ProfileItem = ({navigation}) => {
  return (
    <View className="absolute top-36 z-10 rounded-full shadow-xl shadow-black">
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.9}
        className="bg-gray-100 items-center justify-center p-2 rounded-full shadow-2xl ">
        <View className="border-4 border-[#48b3fb] rounded-full p-7">
          <Image
            source={require('../assets/images/edit-profile.png')}
            className="h-16 w-16"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileItem;
