export interface LikeProduct {
    id: number;         // id của bản ghi favorites
    product_id: number; // id của sản phẩm
    user_id: number;    // id của user (thông tin này không cần hiển thị nhưng backend trả về)
    name: string;
    price: number;
    sale_price: number;
  }
  