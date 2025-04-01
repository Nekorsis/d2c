import { makeObservable, observable, action, computed } from "mobx"
import { IOrder, IOrderOption, IProduct } from "../utils/types";
import { sendAnalytics } from "../backend";

interface IStore {
    cartProducts: Map<number, IProduct[]>,
    cartSize: number,
    addToCart: (value: IProduct) => void;
    removeFromCart: (value: IProduct) => void;
}

class Store {
    cartProducts:  Map<number, IProduct[]> = new Map();
  
    cartSize: number = 0

    cartPrice: number = 0

    orderOptions: IOrderOption[] = []

    order: IOrder | null = null

    constructor() {
      makeObservable(this, {
        cartProducts: observable,
        cartSize: observable,
        cartPrice: observable,
        orderOptions: observable,
        order: observable,
        addToCart: action,
        removeFromCart: action,
        addOrderOption: action,
        removeOrderOption: action,
      });
    }
  
    addToCart(value: IProduct) {
        const key = value.id;

        if (this.cartProducts.has(key)) {
            const oldValue = this.cartProducts.get(key) || [];
            this.cartProducts.set(key, [...oldValue, value])
            this.cartSize++
        } else {
            this.cartProducts.set(key, [value])
            this.cartSize++
        }

        sendAnalytics({
          type: 'addProduct',
          data: {
            product: value
          }
        })
        this.cartPrice = this.cartPrice + value.price
      }
  
    removeFromCart(value: IProduct) {
        const key = value.id;
        if (this.cartProducts.has(key)) {
            const oldValue = [...this.cartProducts.get(key) || []];
         
            if (oldValue.length === 0) {
                return
            }
            oldValue.pop()
            this.cartProducts.set(key, oldValue)
            this.cartSize--

            this.cartPrice = this.cartPrice - value.price

            sendAnalytics({
              type: 'removeProduct',
              data: {
                product: value
              }
            })
        }
    
    }

    addOrderOption(value: IOrderOption) {
      this.orderOptions.push(value);
      sendAnalytics({
        type: 'addProduct',
        data: {
          option: value
        }
      })
    }

    removeOrderOption(value: IOrderOption) {
      this.orderOptions = this.orderOptions.filter(i => i.id !== value.id)
      sendAnalytics({
        type: 'removeOption',
        data: {
          option: value
        }
      })
    }

    createOrder(value: IOrder) {
      this.order = value
      sendAnalytics({
        type: 'createOrder',
        data: {
          order: value
        }
      })
    }
  }

const store = new Store();

export default store
