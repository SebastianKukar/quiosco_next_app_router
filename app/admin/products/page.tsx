import {redirect} from "next/navigation";
import Pagination from "@/components/products/Pagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSeachForm from "@/components/products/ProductSeachForm";

async function productCount () {
  return await prisma.product.count()
}
async function getProducts(page: number, pageSize : number) {
  const skip = (page - 1) * pageSize
  const products  = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>> 

export default async function Productspage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const pageParam = (await searchParams).page; // Asegúrate de que searchParams exista
  const page = Array.isArray(pageParam) ? pageParam[0] : pageParam || "1"; // Maneja el caso en que pageParam sea un array o undefined
  const currentPage = parseInt(page, 10) || 1;
  const pageSize = 10;

  if (currentPage < 1) redirect("/admin/products");

  const productsData = getProducts(currentPage, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData]);
  const totalPages = totalProducts > 0 ? Math.ceil(totalProducts / pageSize) : 1;

  if (currentPage > totalPages) redirect("/admin/products");
  return (
    <>
        <Heading>Administrar Productos</Heading>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <Link 
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer mx-5 mt-5"
          >
          Crear Producto</Link>
          <ProductSeachForm />
        </div>
        <ProductTable
        products={products}
        />
        <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        />
    </>
  )
}
