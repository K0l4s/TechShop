export interface ShippingMethod {
    id: number;
    name: string;
    costPerKm: number;
}

export interface Item {
    id: number;
    productId: number;
    productName: string;
    productImage: string | null;
    productPrice: number;
    productSalePrice: number;
    quantity: number;
    unitPrice: number;
    reviewed: boolean;
}

export interface Order {
    id: number;
    status: string;
    totalPrice: number;
    shippingFee: number;
    shippingAddr: string;
    shippingMethod: ShippingMethod;
    discountCode: string | null;
    createdAt: string;
    items: Item[];
}

export interface OrderResponse {
    success: boolean;
    message: string;
    body: {
        items: Order[];
        currentPage: number;
        totalPages: number;
    };
}
