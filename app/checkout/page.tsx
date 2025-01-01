import MainLayout from "../_layouts/MainLayout";
import { ProductsInCart, CartSummary } from "./sections";

const CheckoutPage = () => {
  return (
    <MainLayout>
      <div className="container flex flex-col gap-12 ">
        <ProductsInCart />
        <CartSummary />
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
