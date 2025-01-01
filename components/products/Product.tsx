"use client";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Rating } from "@smastrom/react-rating";
import { ProductDef } from "@/lib/definitions";
import { PATH_PAGE } from "@/app/_routes";
import { useState } from "react";
import { cn } from "@/lib/utils";

import ProductCTA from "./ProductCTA";

const Product: React.FC<ProductDef> = (product) => {
  const { id, rating, title, price, image, category, description } = product;
  const [showCTA, setShowCTA] = useState(false);

  const toggleCTA = () => {
    setShowCTA((prev) => !prev);
  };

  return (
    <Card
      className={
        "col-span-10 sm:col-span-6 md:col-span-4 xl:col-span-3 bg-red-400 flex flex-col items-center pb-4 justify-between"
      }
      onMouseEnter={toggleCTA}
      onMouseLeave={toggleCTA}
    >
      <Link
        href={PATH_PAGE.products.id(`${id}`)}
        className="relative w-full"
        key={id}
      >
        <Image
          src={image}
          // src="/assets/images/products/product_1.jpg"
          alt="product_1"
          width={600}
          height={600}
          sizes="(max-width: 350px) 90vw, (max-width: 650px) 50vw, 40vw"
          className={cn("w-full h-56 sm:h-64 md:h-72", description && "md:h-96")}
        />
        <div className="flex flex-col gap-1 px-2 py-4">
          <p className="absolute top-2 right-2 bg-red-200 p-2 rounded-full text-sm">
            {rating.count}
          </p>
          <div className="flex justify-between">
            <p className="line-clamp-2 font-semibold">{title}</p>
            {category && (
              <p className="line-clamp-2 capitalize ">
                Category: <span className="font-semibold">{category} </span>
              </p>
            )}
          </div>
          <h5 className="">${price}</h5>
          <Rating value={rating.rate} readOnly className="max-w-32" />
          {description && <p className="mt-3 first-letter:uppercase">{description} </p>}
        </div>
        {/* <h5 className="pl-4">{formatCurrency(price, "k")}</h5> */}
      </Link>

      <ProductCTA product={product} showCTA={showCTA} />
    </Card>
  );
};

export default Product;
