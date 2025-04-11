import Link from "next/link";
type PaginationProps = {
    currentPage: number;
    totalPages: number;
}
export default function Pagination({currentPage, totalPages} : PaginationProps) {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1)
  return (
    <nav className="flex justify-center py-10">
        {currentPage > 1 && (
            <Link
            href={`/admin/products?page=${currentPage - 1}`}
            className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >&laquo;</Link>
        )}

        {pages.map((page) => (
            <Link 
            key={page}
            href={`/admin/products?page=${page}`}
            className={`${currentPage === page ? 'font-bold bg-amber-400' : 'bg-white'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"`}>{page}</Link>
        ))}

        {currentPage < totalPages && (
            <Link
            href={`/admin/products?page=${currentPage + 1}`}
            className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >&raquo;</Link>
           
        )}
        

    </nav>
  )
}
