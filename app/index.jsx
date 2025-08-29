import PostItImage from "@/assets/images/post-it.png";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/notes");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  return (
    <View style={style.container}>
      <Image source={PostItImage} style={style.image} />
      <Text style={style.title}>Welcome to Notes App</Text>
      <Text style={style.subTitle}>
        Write what you want, when you want anywhere
      </Text>

      <TouchableOpacity
        style={style.button}
        onPress={() => router.push("/notes")}
      >
        <Text style={style.buttonText}>Start Writing</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBlock: 10,
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default HomeScreen;
