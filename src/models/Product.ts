export interface ProductImage {
  id: number;
  imageUrl: string;
  altText?: string;
}

export interface ProductAttribute {
  id: number;
  attName: string;
  attValue: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  variantName: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  active: boolean;
  categoryId: number;
  brandId: number;
  images: ProductImage[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
}
export interface AddProductProps {
  handleClose: () => void;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}
export interface DeleteProductProps {
  handleClose: () => void;
  handleDelete: () => void;
}
