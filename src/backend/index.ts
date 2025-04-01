import { IAnalyticsEvent, IOrder, IProduct, TAnalyticsEventType } from "../utils/types"

const getRandomElement = <T>(arr: T[]): T | undefined => 
  arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : undefined;

const getRandomNumber = (max: number): number => {
    return Math.floor(Math.random() * max) + 1;
  }

const generateData = (): IProduct[] => {
    return Array.from(Array(1000).keys()).map(i => {
      const uniqueId = getRandomNumber(100000)
      return {
        id: i,
        uniqueId,
        name: `Product №${i}`,
        price: getRandomNumber(10000),
        description: `This is description of a product №${i}, with unique id of ${uniqueId}`
      }
    })
}

export const getGoods = (): Promise<IProduct[]> => {
  return new Promise((resolve) => {
  const delay = Math.floor(Math.random() * 300) + 500;

    setTimeout(() => {
      resolve(generateData()) 
    }, delay);
  });
}
  
export const createOrder = (input: IOrder): Promise<IOrder> => {
  return new Promise((resolve, reject) => {
    const shouldSucceed = Math.random() > 0.4;
    
    const possibleErrors = [
      'Service unavaliable',
      `Product №${getRandomNumber(100)} is unavaliable`,
      `Minimum order price is 1000`
    ]

    if (shouldSucceed) {
      resolve(input)
    } else {
      reject(getRandomElement(possibleErrors))
    }
    }); 
}

export const sendAnalytics = (input: IAnalyticsEvent): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const shouldSucceed = Math.random() > 0.4;
    
    if (shouldSucceed) {
      resolve(true)
    } else {
      reject('Service unavaliable')
    }
    }); 
}