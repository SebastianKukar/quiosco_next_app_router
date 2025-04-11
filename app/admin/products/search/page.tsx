import ProductSeachForm from "@/components/products/ProductSeachForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts (searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}
export default async function searchPage({
    searchParams
}:{
    searchParams: Promise<{search:string}>
  }) {

    const search = (await searchParams).search
    const products = await searchProducts(search as string)
    return (    
        <>
            <Heading>Resultados de busqueda: {search}</Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSeachForm />
            </div>
            {products.length ? 
            (
                <ProductTable
                products={products}
            />
            ) : <p className="text-center text-lg">No hay resultados</p>}
        </>
    )
}