import {
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { getGoods } from "../backend";
import { IProduct } from "../utils/types";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import store from "./../store/index";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ProductsList = () => {
  const { isFetching, error, refetch, data } = useQuery({
    queryKey: ["productsList"],
    queryFn: getGoods,
  });

  const handleAddToStore = (value: IProduct) => {
    store.addToCart(value);
  };

  const handleRemoveFromStore = (value: IProduct) => {
    store.removeFromCart(value);
  };

  const renderListItem = (value: ListRenderItemInfo<IProduct>) => {
    const { item } = value;

    return (
      <ProductCard
        key={item.id}
        item={item}
        onAddPress={handleAddToStore}
        onRemovePress={handleRemoveFromStore}
      />
    );
  };

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.error}>
          <Text>{error.message}</Text>
          <TouchableOpacity
            onPress={() => {
              refetch();
            }}
          >
            <Text style={{ color: "#358fe8" }}>refetch</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderListItem}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    );
  };

  return <View style={styles.root}>{renderContent()}</View>;
};

export default ProductsList;
