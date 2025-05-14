import React from "react";
import Cart from "../../../components/Cart/Cart";
import MainNavbar from "../../../components/Navbar/MainNavbar";

const CartPage: React.FC = () => {
  return (
    <div>
      <MainNavbar/>
      <Cart />
    </div>
  );
};

export default CartPage;