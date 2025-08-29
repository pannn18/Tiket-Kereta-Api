"use client"

import { AdminType } from "../types"
import EditAdmin from "./editAdmin"
import DropAdmin from "./dropAdmin"
import ResetPasswordAdmin from "./resetpassword"

type props = {
    item: AdminType
}

const Admin = (myProp: props) => {
    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border p-5 my-3">
            {/* Nama sebagai header */}
            <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-800">{myProp.item.name}</h2>
                <p className="text-sm text-gray-500">Admin</p>
            </div>

            {/* Detail */}
            <div className="space-y-2 mb-4">
                <div>
                    <small className="text-xs text-gray-500">Address</small>
                    <p className="text-base text-gray-700">{myProp.item.address}</p>
                </div>
                <div>
                    <small className="text-xs text-gray-500">Phone</small>
                    <p className="text-base text-gray-700">{myProp.item.phone}</p>
                </div>
            </div>

            {/* Opsi */}
            <div className="flex gap-3 items-center border-t pt-3">
                <EditAdmin admin={myProp.item} />
                <DropAdmin admin={myProp.item} />
                <ResetPasswordAdmin admin={myProp.item} />
            </div>
        </div>
    )
}
export default Admin
