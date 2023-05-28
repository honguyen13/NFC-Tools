import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, selectUser} from '../features/userSlice';
import {useRoute} from '@react-navigation/native';

const Detail = ({navigation}) => {
  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();
  const {
    params: {vehicle, time, location},
  } = useRoute();

  const [name, setName] = React.useState('Nguyen Ho');
  const [birthDay, setBirthDay] = React.useState('13/01/2002');
  const [identity, setIdentity] = React.useState('215554451');
  const [phone, setPhone] = React.useState('0392619013');
  const [sex, setSex] = React.useState('Male');
  const [address, setAddress] = React.useState(
    ' Linh Trung Precinct, Thu Duc District, Ho Chi Minh City',
  );

  const InfoList = [
    {
      title: 'Full Name',
      value: name,
    },
    {
      title: 'Date of Birth',
      value: birthDay,
    },
    {
      title: 'Identity',
      value: identity,
    },
    {
      title: 'Phone',
      value: phone,
    },
    {
      title: 'Sex',
      value: sex,
    },
    {
      title: 'Address',
      value: address,
    },
  ];

  const DetailList = [
    {
      title: 'Vehicle',
      src: require('../assets/images/car.png'),
      value: vehicle,
    },
    {
      title: 'Time',
      src: require('../assets/images/time.png'),
      value: time,
    },
    {
      title: 'Location',
      src: require('../assets/images/gps.png'),
      value: location,
    },
  ];

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

  const TextItem = ({title, value}) => {
    return (
      <View className="flex-row items-center mb-3">
        <Text className=" text-black font-semibold text-xl w-36">{title}:</Text>
        <Text className="text-gray-500 flex-1 font-semibold text-lg">
          {value}
        </Text>
      </View>
    );
  };

  const DetailItem = ({title, src, value}) => {
    return (
      <View className="flex-row mb-3 items-center">
        <View className="flex-row space-x-2 items-center w-36">
          <Image source={src} className="h-8 w-8" />
          <Text className="text-black font-bold text-lg mr-3">{title}</Text>
          <Text />
        </View>
        <Text className="text-gray-500 flex-1 font-semibold text-lg">
          {value}
        </Text>
      </View>
    );
  };

  return (
    <View className="bg-white p-5 flex-1">
      <ScrollView style={{paddingBottom: 40}}>
        <View className="bg-white items-center justify-center mb-5">
          {/**Header */}
          <View className="border-4 border-[#48b3fb] rounded-full p-7">
            <Image
              source={require('../assets/images/user.png')}
              className="h-16 w-16"
            />
          </View>
        </View>

        {/*Body */}
        <View>
          <View className="flex-row items-center mb-3">
            <View className="flex-1 border-t bg-black" />
            <Text className="text-xl text-gray-500 mx-2">
              Personal Information
            </Text>
            <View className="flex-1 border-t bg-black" />
          </View>

          {InfoList.map(item => (
            <TextItem key={item.title} title={item.title} value={item.value} />
          ))}

          <View className="flex-row items-center my-3">
            <View className="flex-1 border-t bg-black" />
            <Text className="text-xl text-gray-500 mx-2">Parking Details</Text>
            <View className="flex-1 border-t bg-black" />
          </View>
          {DetailList.map(item => (
            <DetailItem
              key={item.title}
              title={item.title}
              src={item.src}
              value={item.value}
            />
          ))}

          <View className="mt-5">
            <Text className="text-black text-xl font-bold">Gate In</Text>
            <Image
              source={require('../assets/images/xe-vao.png')}
              className="w-full"
              resizeMode='contain'
            />
          </View>

          <View>
            <Text className="text-black text-xl font-bold">Gate Out</Text>
            <Image
              source={require('../assets/images/xe-ra.png')}
              className="w-full"
              resizeMode='contain'
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;
