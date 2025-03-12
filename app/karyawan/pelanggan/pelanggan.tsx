
"use client"

import Link from "next/link"
import { User } from "../types"
import DropPelanggan from "./droppelanggan"
import EditPelanggan from "./editpelanggan"
import ResetPassword from "./resetpassword"


type props = {
    item: User

}

const Pelanggan = (myprop: props) => {
    return (
        <div className="w-full flex my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Nama Pelanggan
                </small>
                <span>
                    <Link href={`/customer/${myprop.item.id}`}>
                    {myprop.item.name}                    
                    </Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    NIK Pelanggan
                </small>
                <span>
                    {myprop.item.nik}
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Alamat Pelanggan
                </small>
                <span>
                    {myprop.item.address}
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    No Tel Pelanggan
                </small>
                <span>
                    {myprop.item.phone}
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <DropPelanggan user={myprop.item}/> 
                    <EditPelanggan user={myprop.item}/>
                    <ResetPassword user={myprop.item}/>
                </div>
            </div>
        </div>

    )
}
export default Pelanggan