import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import React from 'react';

const AndroidPromt = ({modalVisible, setModalVisible}) => {
  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
      <View className="flex-1 backdrop-opacity-95 bg-black/30">
        <View className="absolute bottom-0 z-50 w-full">
          <View className="bg-white justify-center items-center m-5 p-5 rounded-2xl">
            <Text className="font-semibold text-gray-400 text-xl mb-4">
              Ready to Scan
            </Text>
            <Image
              source={require('../assets/images/phone.png')}
              className="h-28 w-28 mb-4"
            />
            <Text className="text-black mb-4">Please tab NFC tags</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-gray-300 justify-center items-center w-full py-3 rounded-xl">
              <Text className="text-black font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AndroidPromt;
