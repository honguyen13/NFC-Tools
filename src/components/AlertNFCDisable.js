import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import React from 'react';

const AlertNFCDisable = ({modalVisible, setModalVisible}) => {
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View className="flex-1 backdrop-opacity-95 bg-black/30">
        <View className="absolute bottom-40 z-50 w-full items-center">
          <View className="bg-gray-300 justify-center items-center mx-16 py-4 px-12 rounded-3xl">
            <Image
              source={require('../assets/images/NFC-Chip.png')}
              className="h-24 w-24"
            />
            <Text className="text-black mt-2">NFC is disable</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text className="text-black mt-2">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertNFCDisable;
