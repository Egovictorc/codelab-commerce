import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PATH_PAGE } from "../_routes";

export const metadata: Metadata = {
    title: "Product"
}

const ProductRoot = () => {

    redirect(PATH_PAGE.products.id("1"))
}

export default ProductRoot;