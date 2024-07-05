import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";

import { icons, images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { signOut , getAllPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import VideoCard from "../../components/VideoCard";
import InfoBox from "../../components/InfoBox";
const Profile = () => {
  const { user, setUser, setIsLoggedIn} = useGlobalContext();

  const logout = async () => {
    router.replace("/sign-in");
    signOut();
  };

  return (
  <SafeAreaView className="bg-primary h-full">
    <FlatList
    ListHeaderComponent={() => (
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity
          onPress={logout}
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <View className="w-16 h-16 rounded-lg flex justify-center items-center">
          <Image
            source={images.avatar}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>

        <InfoBox
          title="Nexa Thread"
          containerStyles="mt-5"
          titleStyles="text-lg"
        />

        <View className="mt-5 flex flex-row">
          <InfoBox
            title={3}
            subtitle="Posts"
            titleStyles="text-xl"
            containerStyles="mr-10"
          />
          <InfoBox
            title="1.2k"
            subtitle="Followers"
            titleStyles="text-xl"
          />
        </View>
      </View>
    )}
  />
  </SafeAreaView>
  )
}

export default Profile