import React from "react";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.style.scss";
import CartItems from "../cart-items/cart-items.component";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selector";

const CartDropdown = () => {
  const { cartItems } = useSelector(state => ({
    cartItems: selectCartItems(state)
  }));

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map(cartItem => (
          <CartItems key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

export default CartDropdown;
