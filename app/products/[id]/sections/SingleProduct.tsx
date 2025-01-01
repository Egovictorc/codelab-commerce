"use client";
import { Product } from "@/components/products";
import { ProductDef } from "@/lib/definitions";

type Props = {
  product: ProductDef;
};

const SingleProduct: React.FC<Props> = ({ product }) => {
  const { id, title, price,description, category, image, rating } = product;
  return (
    <Product
      id={id}
      category={category}
      price={price}
      description={description}
      title={title}
      image={image}
      rating={rating}
    />
  );
};

export default SingleProduct;
