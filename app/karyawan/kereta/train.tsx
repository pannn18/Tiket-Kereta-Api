"use client"

import Link from "next/link"
import { keretaType } from "../types"
import DropKereta from "./deletekereta"
import EditKereta from "./editkereta"

type props = {
    item: keretaType
}

const Train = ({ item }: props) => {
    return (
        <div className="w-full border rounded-xl shadow-sm hover:shadow-md transition p-4 bg-white my-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Nama Kereta */}
                <div>
                    <p className="text-xs font-semibold text-gray-500">Nama Kereta</p>
                    <Link 
                        href={`/karyawan/kereta/${item.id}`} 
                        className="text-base font-medium text-blue-600 hover:underline"
                    >
                        {item.name}
                    </Link>
                </div>

                {/* Deskripsi */}
                <div>
                    <p className="text-xs font-semibold text-gray-500">Deskripsi Kereta</p>
                    <p className="text-sm text-gray-700">{item.descriptions}</p>
                </div>

                {/* Tipe */}
                <div>
                    <p className="text-xs font-semibold text-gray-500">Tipe Kereta</p>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                        {item.type}
                    </span>
                </div>

                {/* Opsi */}
                <div>
                    <p className="text-xs font-semibold text-gray-500">Opsi</p>
                    <div className="flex gap-2 mt-1">
                        <EditKereta kereta={item} />
                        <DropKereta kereta={item} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Train
