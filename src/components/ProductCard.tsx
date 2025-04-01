import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IProduct } from "../utils/types";
import { observer } from "mobx-react-lite";
import store from "../store";

interface IProps {
  item: IProduct;
  onAddPress: (value: IProduct) => void;
  onRemovePress: (value: IProduct) => void;
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#282b2e",
    gap: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    alignSelf: "flex-end",
  },
  icon: {
    marginTop: 8,
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
  },
});

const ProductCard = observer((props: IProps) => {
  const { item, onAddPress, onRemovePress } = props;

  const renderCount = () => {
    return <Text>{store.cartProducts.get(item.id)?.length || 0}</Text>;
  };

  return (
    <View key={item.id} style={styles.root}>
      <Text>{item.name}</Text>
      <Text>price {item.price}</Text>
      <Text>{item.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            if (onAddPress) {
              onAddPress(item);
            }
          }}
        >
          <Text style={styles.iconText}>+</Text>
        </TouchableOpacity>
        {renderCount()}
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            if (onRemovePress) {
              onRemovePress(item);
            }
          }}
        >
          <Text style={styles.iconText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ProductCard;
