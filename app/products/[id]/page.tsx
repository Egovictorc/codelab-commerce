import MainLayout from "@/app/_layouts/MainLayout";
import { Metadata } from "next";
import { SingleProduct } from "./sections";
import { getProductById } from "@/lib/actions/products";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: id,
  };
}

const ProductPage: React.FC<Props> = async ({params}) => {
  const {id } = await params;
  const product = await getProductById(id);

  if(product === undefined) {
    return <p> product not found</p>
  }
    return(
        <MainLayout>
            <div className="max-w-[700px] bg-blue-400 mx-auto">
                <SingleProduct product={product} />
            </div>
        </MainLayout>
    )
};

export default ProductPage;
