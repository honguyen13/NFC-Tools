import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import AlertNFCDisable from '../components/AlertNFCDisable';
import AndroidPromt from '../components/AndroidPromt';
import ProfileItem from '../components/ProfileItem';
import {HistoryItem} from '../components/HistoryItem';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

const Home = ({navigation}) => {
  const [data, setData] = React.useState([
    {
      location: 'Thu Duc, HCM city',
      time: '09:55 05-04-2023',
      vehicle: 'My vehicle',
    },
    {
      location: 'Binh Thanh, HCM city',
      time: '16:04 05-04-2023',
      vehicle: 'My vehicle',
    },
  ]);
  const [current, setCurrent] = React.useState({
    location: 'Thu Duc, HCM city',
    time: '21:55 12-04-2023',
    vehicle: 'My vehicle',
  });

  const [text, setText] = React.useState('Helllo');
  const [address, setAddress] = React.useState('Quan 2, HCM city');
  const [hasNFC, setHasNFC] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(null);
  const [androidAlert, setAndroidAlert] = React.useState(false);

  React.useEffect(() => {
    getCurrentLocation();

    //check NFC device support
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      if (deviceIsSupported) {
        await NfcManager.start();
      }
      setHasNFC(deviceIsSupported);
      setModalVisible(!deviceIsSupported);
    };

    checkIsSupported();
  }, []);

  
  // Function to get permission for location
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  };

  // Get current position
  const getCurrentLocation = async () => {
    const result = requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        position => {
          // console.log(position);
          reverseGeolocation(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
      );
    }
  };

  // reverse position into address
  const reverseGeolocation = (latitude, longitude) => {
    Geocoder.init('AIzaSyCvq2VSbZ8QBPHXe607dSBkYskiRXjKPRg');
    Geocoder.from(latitude, longitude)
      .then(json => {
        const address = json.results[0].formatted_address;
        // console.log(formatted_address);
        setAddress(address);
        console.log(address);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const getCurrentDate = () => {
    const minute =
      new Date().getMinutes() >= 10
        ? new Date().getMinutes()
        : '0' + new Date().getMinutes();
    const hour =
      new Date().getHours() >= 10
        ? new Date().getHours()
        : '0' + new Date().getHours();
    const date =
      new Date().getDate() >= 10
        ? new Date().getDate()
        : '0' + new Date().getDate();
    const month =
      new Date().getMonth() + 1 >= 10
        ? new Date().getMonth() + 1
        : '0' + (new Date().getMonth() + 1);
    const year = new Date().getFullYear();

    //format: hh:mm dd-mm-yyyy;
    return hour + ':' + minute + ' ' + date + '-' + month + '-' + year;
  };

  const readNdef = async () => {
    try {
      if (Platform.OS === 'android') {
        setAndroidAlert(true);
      }
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (tag) {
        setAndroidAlert(false);
      }
      const x = await NfcManager.ndefHandler.getNdefMessage();

      let result = {
        vehicle: 'My vehicle',
        time: getCurrentDate(),
        location: address,
      };

      data.unshift(result);
      // console.log(data);
    } catch (ex) {
      // console.log('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const _parseText = tag => {
    try {
      if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
        return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  return (
    <>
      {/** Alert NFC is disable when open app */}
      <AlertNFCDisable
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      {/* Alert Scan for android */}
      <AndroidPromt
        modalVisible={androidAlert}
        setModalVisible={setAndroidAlert}
      />

      <View className="bg-[#9edbfa] items-center justify-center">
        {/**Header */}
        <View className="w-full items-end mr-5 mt-2">
          <TouchableOpacity>
            <Image
              source={require('../assets/images/dots.png')}
              className="h-6 w-6 "
            />
          </TouchableOpacity>
        </View>
        <View className=" w-full flex-row items-center justify-between px-5 pb-8">
          <View>
            <Text className="text-white font-bold text-6xl underline">
              Smart
            </Text>
            <Text className="text-white font-bold text-4xl underline">
              Traffic
            </Text>
          </View>
          <View className="bg-white p-5 rounded-full">
            <Image
              source={require('../assets/images/logo.png')}
              className="h-28 w-28"
            />
          </View>
        </View>

        {/**My profile */}
        <ProfileItem navigation={navigation} />

        {/**Body */}
        <View className="w-full bg-gray-100">
          <View className="flex-row justify-between mx-5 my-3">
            {/**Read tags button */}
            <TouchableOpacity
              onPress={() => readNdef()}
              activeOpacity={0.8}
              className="bg-[#48b3fb] justify-center items-center px-8 py-6 rounded-2xl">
              <View
                className="bg-white p-3 rounded-full"
                style={{elevation: 8}}>
                <Image
                  source={require('../assets/images/read.png')}
                  className="h-10 w-10"
                />
              </View>
              <Text className="text-white font-bold mt-2 text-lg">
                Read Card
              </Text>
            </TouchableOpacity>
            {/**Write tags button */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-[#c48ad7] justify-center items-center px-8 py-6 rounded-2xl">
              <View
                className="bg-white p-3 rounded-full"
                style={{elevation: 8}}>
                <Image
                  source={require('../assets/images/write.png')}
                  className="h-10 w-10"
                />
              </View>
              <Text className="text-white font-bold mt-2 text-lg">
                Write Card
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row mx-5 justify-between mb-3">
            <Text className="text-black font-bold text-xl">
              History parking
            </Text>
            <Image
              source={require('../assets/images/history.png')}
              className="h-7 w-7"
            />
          </View>

          <ScrollView style={{height: 320}}>
            <HistoryItem
              vehicle={current.vehicle}
              time={current.time}
              location={current.location}
              bg="#48b3fb"
            />
            {data.map((item, index) => (
              <HistoryItem
                key={index}
                vehicle={item.vehicle}
                time={item.time}
                location={item.location}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Home;
