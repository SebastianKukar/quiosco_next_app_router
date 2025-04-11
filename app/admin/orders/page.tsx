"use client"
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
import { toast } from "react-toastify";
import useSWR from "swr";



export default function Orderspage() {
  const url = "/admin/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: false
  });
  if(error) return toast.error("Error al cargar las ordenes")
  if(isLoading) return 'Cargando..'
  if (data)
    return (
      <>
        <Heading>Administrar Ordenes</Heading>

        {data.length ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 mx-auto gap-5 mt-5">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center ">No hay ordenes pendientes </p>
        )}
      </>
    );
}
