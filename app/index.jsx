import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View , Image} from 'react-native';
import { Link , Redirect , router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {
  const {isLoading , isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
   <SafeAreaView className="bg-primary h-full pl-4 pr-4">
    <ScrollView contentContainerStyle={{height:'100%'}}>

    <View className="w-full justify-top items-center min-h-[85vh] pt-10">
    <Text className=" text-white text-3xl font-pextrabold">
      Nexa Thread
    </Text>

    <Image
    source={images.cards}
    className ="max-w-[380px] w-full h-[300px] " resizeMode="contain"
    />

    <View className="relative mt-4">
      <Text className="text-3xl text-white font-bold text-center py-1">Discover Endless Possibilities with
      </Text>
      <Text className="text-secondary-200 text-3xl font-bold text-center">
           Nexa Thread
      </Text>

      <Image
      source={images.path}
      className="w-[200px] h-[30px] left-5 bottom-1"
      resizeMode="contain"
      />
    </View>
    <Text className="text-sm font-pregular text-gray-100 mt-5 text-center pl-2 pr-2">Elevate your style with AI-image dress generation. Design your dream dress, presenting you with the perfect matches.</Text>
    <CustomButton 
      title="Continue with Email"
      handlePress={()=>router.push('/sign-in')}
      containerStyles="w-full mt-7"
    />
    </View>
    </ScrollView>
    <StatusBar backgroundColor='#161622' style='light'/>
   </SafeAreaView>
  );
}
 
