"use client"

import Link from "next/link"
import { keretaType } from "../types"
import DropKereta from "./deletekereta"
import EditKereta from "./editkereta"

type props = {
    item: keretaType

}

const Train = (myprop: props) => {
    return (
        <div className="w-full flex my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Nama Kereta
                </small>
                <span>
                    <Link href={`/karyawan/kereta/${myprop.item.id}`}>
                    {myprop.item.name}                    
                    </Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Deskripsi Kereta
                </small>
                <span>
                    {myprop.item.descriptions}
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Tipe Kereta
                </small>
                <span>
                    {myprop.item.type}
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditKereta kereta={myprop.item}/>
                    <DropKereta kereta={myprop.item}/>
                </div>
            </div>
        </div>

    )
}
export default Train