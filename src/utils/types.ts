export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
}

export interface IOrderOption {
    id: number;
    name: string;
}

export interface IOrder {
    id: number;
    options: IOrderOption[];
    products: Map<number, IProduct[]>
}

export type TAnalyticsEventType = 'addProduct' | 'removeProduct' | 'selectOption' | 'removeOption' | 'createOrder';

export interface IAnalyticsEvent {
    type: TAnalyticsEventType;
    data: object;
}