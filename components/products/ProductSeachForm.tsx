"use client"
import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSeachForm() {
    const handleSearchForm = (formData : FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)
        if(!result.success) {
            result.error.issues.forEach(issues => {
            toast.error(issues.message)
            })
            return
        }
        redirect(`/admin/products/search?search=${result.data.search}`)
    }

  return (
    <form
    className="flex items-center"
    action={handleSearchForm}
    >

        <input 
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 w-full bg-white" 
        name="search"
        />
        <input 
        type="submit"
        value={"Buscar"}
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer" 
        />

    </form>
  )
}
