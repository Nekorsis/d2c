import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ProductsList from "./src/components/ProductsList";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsCart from "./src/components/ProductsCart";

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  safeRoot: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.safeRoot}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.root}>
          <StatusBar style="auto" />
          <ProductsCart />
          <ProductsList />
        </View>
      </QueryClientProvider>
    </SafeAreaView>
  );
}
