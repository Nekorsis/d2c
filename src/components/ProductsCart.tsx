import { Button, Text, View, StyleSheet, Modal } from "react-native";
import store from "../store";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import CartCheckout from "./CartCheckout";

const styles = StyleSheet.create({
  root: {
    gap: 12,
  },
});

const ProductsCart = observer(() => {
  const [isVisible, setIsVisible] = useState(false);

  console.log("STORE: ", store.cartProducts.keys());

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={hideModal}
      >
        <CartCheckout />
      </Modal>
      <View style={styles.root}>
        <Text>Items in cart: {store.cartSize}</Text>
        <Text>total price {store.cartPrice || 0}</Text>
        <Button
          disabled={!store.cartSize || store.cartPrice < 1000}
          title={
            store.cartPrice < 1000 ? "minimal total price is 1000" : "checkout"
          }
          onPress={() => {
            setIsVisible(true);
          }}
        ></Button>
      </View>
    </>
  );
});

export default ProductsCart;
