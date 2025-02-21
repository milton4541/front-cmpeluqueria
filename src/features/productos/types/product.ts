export type product = {
    id: number;
    brand: string;
    name: string;
    quantity: number;
    unit: string;
    };

export type newProduct = {
    brand: string,
    low_stock_alert: number,
    name: string,
    package_count: number,
    unit: string,
    unit_per_package: number,
    unity_price: number,
}

export type editProduct = {
    id: number;
    brand: string,
    low_stock_alert: number,
    name: string,
    unit: string,
}