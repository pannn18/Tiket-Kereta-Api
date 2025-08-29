"use client"

import Link from "next/link"
import { User } from "../types"
import DropPelanggan from "./droppelanggan"
import EditPelanggan from "./editpelanggan"
import ResetPassword from "./resetpassword"
import { FaUserCircle } from "react-icons/fa"

type Props = {
    item: User
}

const Pelanggan = ({ item }: Props) => {
    return (
        <div className="w-full flex flex-col md:flex-row items-start md:items-center my-3 p-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            {/* Icon Pelanggan */}
            <div className="mr-4 mb-2 md:mb-0 flex-shrink-0">
                <FaUserCircle className="text-blue-500 text-5xl" />
            </div>

            {/* Info Pelanggan */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div className="flex flex-col">
                    <small className="text-sm font-medium text-gray-600">Nama</small>
                    <Link href={`/customer/${item.id}`} className="text-gray-800 font-semibold hover:underline">
                        {item.name}
                    </Link>
                </div>
                <div className="flex flex-col">
                    <small className="text-sm font-medium text-gray-600">NIK</small>
                    <span className="text-gray-700">{item.nik}</span>
                </div>
                <div className="flex flex-col">
                    <small className="text-sm font-medium text-gray-600">Alamat</small>
                    <span className="text-gray-700">{item.address}</span>
                </div>
                <div className="flex flex-col">
                    <small className="text-sm font-medium text-gray-600">No Tel</small>
                    <span className="text-gray-700">{item.phone}</span>
                </div>
            </div>

            {/* Opsi */}
            <div className="flex gap-2 mt-3 md:mt-0 md:ml-4 items-center">
                <DropPelanggan user={item}/> 
                <EditPelanggan user={item}/>
                <ResetPassword user={item}/>
            </div>
        </div>
    )
}

export default Pelanggan
