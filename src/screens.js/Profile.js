import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../features/userSlice';

const Profile = ({navigation}) => {
  const user = useSelector(() => {});
  const dispatch = useDispatch();

  const [name, setName] = React.useState('');
  const [birthDay, setBirthDay] = React.useState('');
  const [identity, setIdentity] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [address, setAddress] = React.useState('');

  console.log(user);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setBirthDay(user.birthDay);
      setAddress(user.address);
      setIdentity(user.identity);
      setPhone(user.phone);
      setSex(user.sex);
    }
  }, []);

  const isSave = () =>
    name !== '' &&
    birthDay !== '' &&
    identity !== '' &&
    phone !== '' &&
    sex !== '' &&
    address !== '';

  const saveUser = () => {
    dispatch(
      addUser({
        name: name,
        birthDay: birthDay,
        identity: identity,
        phone: phone,
        sex: sex,
        address: address,
      }),
    );
  };

  return (
    <>
      <View className="bg-[#9edbfa] items-center justify-center">
        {/**Header */}
        <View className="w-full ml-5 mt-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/back.png')}
              className="h-8 w-8 "
            />
          </TouchableOpacity>
        </View>
        <View className=" w-full flex-row items-center justify-between px-5 pb-8">
          <View className="py-5">
            <Text className="text-white font-bold text-4xl underline">
              Personal
            </Text>
            <Text className="text-white font-bold text-4xl underline">
              Information
            </Text>
          </View>
          <View className="rounded-full shadow-md shadow-gray-500">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-100 items-center justify-center p-2 rounded-full">
              <View className="border-4 border-[#48b3fb] rounded-full p-7">
                <Image
                  source={require('../assets/images/edit-profile.png')}
                  className="h-16 w-16"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/*Body */}
      <View className="bg-gray-100">
        {/**Name input */}
        <View className="flex-row items-center space-x-1 mx-5 mb-3 ">
          <Text className="text-black font-semibold text-lg w-24">
            Full name:{' '}
          </Text>
          <TextInput
            placeholder="Enter full name"
            value={name}
            onChangeText={text => setName(text)}
            className="flex-1 border-b border-gray-300 text-lg"
          />
        </View>
        {/**BirthDay input */}
        <View className="flex-row items-center space-x-1 mx-5 mb-3">
          <Text className="text-black font-semibold text-lg w-24">
            Birth Day:{' '}
          </Text>
          <TextInput
            placeholder="Enter birth day"
            value={birthDay}
            onChangeText={text => setBirthDay(text)}
            className="flex-1 border-b border-gray-300 text-lg"
          />
        </View>
        {/**Identity input */}
        <View className="flex-row items-center space-x-1 mx-5 mb-3">
          <Text className="text-black font-semibold text-lg w-24">
            Identity:{' '}
          </Text>
          <TextInput
            placeholder="Enter identity"
            value={identity}
            onChangeText={text => setIdentity(text)}
            className="flex-1 border-b border-gray-300 text-lg"
          />
        </View>
        {/**Phone input */}
        <View className="flex-row items-center space-x-1 mx-5 mb-3">
          <Text className="text-black font-semibold text-lg w-24">Phone: </Text>
          <TextInput
            placeholder="Enter Phone Number"
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
            className="flex-1 border-b border-gray-300 text-lg"
          />
        </View>
        {/**sex input */}
        <View className="flex-row items-center space-x-1 mx-5 mb-3">
          <Text className="text-black font-semibold text-lg w-24">Sex: </Text>
          <TextInput
            placeholder="Enter sex"
            value={sex}
            onChangeText={text => setSex(text)}
            className="flex-1 border-b border-gray-300 text-lg"
          />
        </View>
        {/**address input */}
        <View className="flex-row items-center space-x-1 mx-5 mb-3">
          <Text className="text-black font-semibold text-lg w-24">
            Address:
          </Text>
          <TextInput
            placeholder="Enter address"
            value={address}
            onChangeText={text => setAddress(text)}
            className="flex-1 border-b border-gray-300 text-lg"
          />
        </View>
      </View>

      {/**bank link */}
      <View className="flex-row justify-between items-center bg-white px-5 py-3 rounded-lg mt-2">
        <View className="flex-row items-center justify-center space-x-2">
          <Image
            source={require('../assets/images/pay.png')}
            className="h-6 w-6 "
          />
          <Text className="text-black font-bold text-lg">Linking Bank</Text>
        </View>
        <Image
          source={require('../assets/images/next.png')}
          className="h-6 w-6 "
        />
      </View>

      {/**Save button */}
      <TouchableOpacity
        disabled={!isSave()}
        onPress={() => saveUser()}
        className="items-center justify-center py-3 m-5 rounded-full"
        style={{backgroundColor: isSave() ? '#9edbfa' : 'gray'}}>
        <Text className="text-white text-xl font-bold">Save</Text>
      </TouchableOpacity>
    </>
  );
};

export default Profile;
