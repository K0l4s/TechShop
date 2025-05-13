export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    salePrice: number;
    stock: number;
    categoryId: number;
    categoryName: string;
    brandId: number;
    brandName: string;
    variants: any | null;
    attributes: any | null;
    images: any | null;
    active: boolean;
}

export interface Category {
    id: number;
    name: string;
    subCategories: Category[];
    products: Product[];
    active: boolean;
}

