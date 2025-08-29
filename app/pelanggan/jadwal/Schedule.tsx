import { ScheduleType } from "@/app/karyawan/types"
import Link from "next/link"

type Props = {
    item: ScheduleType
}

const formatDateTime = (date: string) => {
    const d = new Date(date)
    return `${d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })} • ${d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`
}

const Schedule = ({ item }: Props) => {
    return (
        <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-md my-3 overflow-hidden">
            {/* Berangkat */}
            <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                <p className="text-xs text-gray-500 font-semibold mb-1">Berangkat Dari</p>
                <h3 className="text-lg font-semibold text-sky-700">{item.departured_location}</h3>
                <p className="text-xs text-gray-500 font-semibold mt-3">Waktu Keberangkatan</p>
                <p className="font-medium">{formatDateTime(item.departured_time)}</p>
            </div>

            {/* Tiba */}
            <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                <p className="text-xs text-gray-500 font-semibold mb-1">Tiba Di</p>
                <h3 className="text-lg font-semibold text-sky-700">{item.arrived_location}</h3>
                <p className="text-xs text-gray-500 font-semibold mt-3">Waktu Kedatangan</p>
                <p className="font-medium">{formatDateTime(item.arrived_time)}</p>
            </div>

            {/* Kereta & Harga */}
            <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                <p className="text-xs text-gray-500 font-semibold mb-1">Unit Kereta</p>
                <h3 className="text-lg font-semibold">{item.train_details.name}</h3>
                <p className="text-xs text-gray-500 font-semibold mt-3">Harga</p>
                <p className="font-medium text-orange-500">
                    {item.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                </p>
            </div>

            {/* Tombol Pesan */}
            <div className="flex-1 p-4 flex items-center justify-center">
                <Link href={`/pelanggan/jadwal/${item.id}`}>
                    <button className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105">
                        Pesan
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Schedule
