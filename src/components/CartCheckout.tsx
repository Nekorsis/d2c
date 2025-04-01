import {
  View,
  StyleSheet,
  Text,
  Switch,
  SwitchChangeEvent,
  Button,
  Alert,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { observer } from "mobx-react-lite";
import store from "../store";
import ProductCard from "./ProductCard";
import { IOrder, IOrderOption, IProduct } from "../utils/types";
import { createOrder } from "../backend";

const ORDER_OPTIONS: IOrderOption[] = [
  {
    id: 0,
    name: "Leave at the door",
  },
  {
    id: 1,
    name: "Call on delivery",
  },
  {
    id: 2,
    name: "No calls",
  },
  {
    id: 3,
    name: "Leave at the postal office",
  },
];

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(106, 102, 104, 0.85)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    maxHeight: "90%",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 16,
  },
  item: {
    marginTop: 12,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingVertical: 8,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

interface IProps {
  onOrderCreateSuccess: (value: IOrder) => void;
}

const CartCheckout = observer((props: IProps) => {
  const handleAddToStore = (value: IProduct) => {
    store.addToCart(value);
  };

  const handleRemoveFromStore = (value: IProduct) => {
    store.removeFromCart(value);
  };

  const handleOptionSelect =
    (option: IOrderOption) => (event: SwitchChangeEvent) => {
      if (event.nativeEvent.value) {
        store.addOrderOption(option);
      } else {
        store.removeOrderOption(option);
      }
    };

  const renderOrderOption = (item: IOrderOption) => {
    const switchValue = !!store.orderOptions.find((i) => i.id === item.id);
    return (
      <View key={item.id} style={styles.inline}>
        <Text>{item.name}</Text>
        <Switch value={switchValue} onChange={handleOptionSelect(item)} />
      </View>
    );
  };

  const renderOrderOptions = () => {
    return <View>{ORDER_OPTIONS.map(renderOrderOption)}</View>;
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

  const renderItems = () => {
    const data: IProduct[] = [];

    store.cartProducts.forEach((value, key) => {
      const item = value[0];
      if (!item) {
        return;
      }

      data.push(item);
    });

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderListItem}
      />
    );
  };

  const handleCreateOrder = () => {
    const newOrder: IOrder = {
      id: Math.random(),
      options: store.orderOptions,
      products: store.cartProducts,
    };

    createOrder(newOrder)
      .then((created) => {
        store.createOrder(created);
        Alert.alert("Order create success");
        props.onOrderCreateSuccess && props.onOrderCreateSuccess(created);
      })
      .catch((err) => {
        Alert.alert("Error happened", err);
      });
  };

  const handleBuyPress = () => {
    Alert.alert("You sure ?", `It will cost you ${store.cartPrice}$ !!!`, [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          handleCreateOrder();
        },
      },
    ]);
  };

  const renderContent = () => {
    if (store.cartSize === 0) {
      return (
        <View>
          <Text>cart is empty</Text>
        </View>
      );
    }

    return (
      <>
        <Text>products in your cart: </Text>
        <Text>total price {store.cartPrice || 0}</Text>
        {renderOrderOptions()}
        {renderItems()}
        <Button title="Buy" onPress={handleBuyPress}></Button>
      </>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.modalContent}>{renderContent()}</View>
    </View>
  );
});

export default CartCheckout;
