"use client"
import { Product } from "@prisma/client"
import { useStore } from "@/src/store"
type AddProductButtonProps = {
  product: Product
}

export default function AddProductButton({product} : AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder)
    return (
     <button
     onClick={() => addToOrder(product)}
     type="button"
     className="bg-indigo-600 text-white font-bold py-3 px-10 rounded-lg w-full mt-5 hover:bg-indigo-700 transition colors"
     >Agregar</button>
  )
}
