import MainLayout from "@/app/_layouts/MainLayout";

// import { getProducts } from "@/lib/actions/products";

import { ProductCategories } from "./home/sections";
import Products from "./home/sections/Products";
// import { getProducts } from "@/lib/utils";


export default async function Home() {
  // const products = await getProducts();

  // console.log("products ", products)
  // console.log("products ", products);

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-y-4 justify-center items-stretch">
        {/* Categories */}
        <ProductCategories className="w-full md:w-56 lg:w-64 h-full md:min-h-screen" />

       
          {/* PRODUCTS */}
          <Products  />
          {/* <Products products={products} /> */}

          {/* Load More */}
      
      </div>
    </MainLayout>
  );
}
