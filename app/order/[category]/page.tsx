import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { Product } from "@prisma/client"


async function getProducts(category: string ) : Promise<Product[]> {
  const products = await prisma.product.findMany({
    where:{
      category:{
        slug: category
      }
    }
  })
  return products
}

export default async function Orderpage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
    if(!(await params).category){
      throw new Error("esos params no son validos")
    }
    const {category} = (await params)
    const products = await getProducts(category)

 if(products) return (
    <>
      <Heading>Elige y personaliza tu orden</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start m-5">
        {products.map((product) => (
          <ProductCard
          key={product.id}
          product={product}
          />
        ))}
      </div>
    </>
        
   
  )
}
