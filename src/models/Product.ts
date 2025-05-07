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
}
export interface AddProductProps {
  handleClose: () => void;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}
export interface DeleteProductProps {
  handleClose: () => void;
  handleDelete: () => void;
}

export interface EditProductProps {
  product: Product;
  handleClose: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
