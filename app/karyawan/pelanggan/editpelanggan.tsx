"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { User } from "../types"

type props = {
    user: User
}

const EditPelanggan = (myprop: props) => {
    const [name, setName] = useState<string>(myprop.user.name || "")
    const [nik, setNik] = useState<string>(myprop.user.nik || "")
    const [address, setAddress] = useState<string>(myprop.user.address || "")
    const [phone, setPhone] = useState<string>(myprop.user.phone || "")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setName(myprop.user.name || "")
        setNik(myprop.user.nik || "")
        setAddress(myprop.user.address || "")
        setPhone(myprop.user.phone || "")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/customer/${myprop.user.id}`
            const requestData = {
                name,
                nik,
                address,
                phone
            }

            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success === true) {
                toast(message, {
                    containerId: `toastEdit-${myprop.user.id}`,
                    type: "success"
                })
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myprop.user.id}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast(`something went wrong`, {
                containerId: `toastEdit-${myprop.user.id}`,
                type: "error"
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myprop.user.id}`} />
            <button
                type="button"
                onClick={() => openModal()}
                className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white"
            >
                &#x270E;
            </button>
            <Modal isShow={show}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">Edit Data Customer</h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang sudah di isi benar
                        </span>
                    </div>
                    {/* Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xl font-semibold text-sky-600 flex flex-col">
                                Name
                            </small>
                            <input
                                type="text"
                                id={`name`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={false}
                                className="p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xl font-semibold text-sky-600 flex flex-col">
                                NIK
                            </small>
                            <input
                                type="text"
                                id={`nik`}
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                required={false}
                                className="p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xl font-semibold text-sky-600 flex flex-col">
                                Address
                            </small>
                            <input
                                type="text"
                                id={`address`}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required={false}
                                className="p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xl font-semibold text-sky-600 flex flex-col">
                                Phone
                            </small>
                            <input
                                type="text"
                                id={`phone`}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required={false}
                                className="p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                    </div>
                    {/* Modal Footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => closeModal()}
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditPelanggan
