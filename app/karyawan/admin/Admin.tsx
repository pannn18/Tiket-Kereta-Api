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
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full md:w-3/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Nama
                </small>
                <span>
                    {myProp.item.name}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Address
                </small>
                <span>
                    {myProp.item.address}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Phone
                </small>
                <span>
                    {myProp.item.phone}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditAdmin admin={myProp.item} />
                    <DropAdmin admin={myProp.item} />
                    <ResetPasswordAdmin admin={myProp.item} />
                </div>
            </div>
        </div>
    )
}
export default Admin