import { ReturnCartDTO } from '../../cart/dtos/return-cart.dto';
import { ReturnProduct } from '../../product/dtos/return-product.dto';
import { CartProductEntity } from '../entities/cart-product.entity';

export class ReturnCartProductDTO {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ReturnProduct;
  cart?: ReturnCartDTO;

  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProduct(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ReturnCartDTO(cartProduct.cart)
      : undefined;
  }
}
