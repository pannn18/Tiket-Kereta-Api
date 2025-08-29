"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { FaUser, FaLock, FaPhone, FaIdCard, FaHome, FaPlus } from "react-icons/fa"

const AddPelanggan = () => {
    const [name, setName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [nik, setNik] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setName(""); setUsername(""); setNik(""); setAddress(""); setPhone(""); setPassword("")
    }

    const closeModal = () => setShow(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const TOKEN = getCookie(`token`)
            const url = `/customer/register`
            const requestData = { name, username, nik, address, phone, password }
            const response: any = await axiosInstance.post(url, requestData, {
                headers: { authorization: `Bearer ${TOKEN}` }
            })

            const message = response.data.message
            toast(message, {
                containerId: `toastAdd`,
                type: response.data.success ? "success" : "warning"
            })

            if (response.data.success) {
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            }
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, { containerId: `toastAdd`, type: "error" })
        }
    }

    const inputClass = "w-full p-2 outline-none border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all duration-300"

    return (
        <div>
            <ToastContainer containerId={`toastAdd`} />
            <button
                type="button"
                onClick={openModal}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
                <FaPlus /> Tambah Customer
            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* header */}
                    <div className="w-full p-5 bg-gradient-to-r from-sky-400 to-blue-500 text-white">
                        <h1 className="text-xl font-bold">Tambah Data Customer</h1>
                        <p className="text-sm opacity-90 mt-1">Pastikan data yang diisi sudah benar</p>
                    </div>

                    {/* body */}
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Name" value={name} onChange={setName} icon={<FaUser />} />
                        <InputField label="Username" value={username} onChange={setUsername} icon={<FaUser />} />
                        <InputField label="NIK" value={nik} onChange={setNik} icon={<FaIdCard />} />
                        <InputField label="Address" value={address} onChange={setAddress} icon={<FaHome />} />
                        <InputField label="Phone" value={phone} onChange={setPhone} icon={<FaPhone />} />
                        <InputField label="Password" type="password" value={password} onChange={setPassword} icon={<FaLock />} />
                    </div>

                    {/* footer */}
                    <div className="w-full p-5 flex justify-end gap-3 bg-gray-50">
                        <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300">
                            Close
                        </button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white transition-all duration-300">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

// reusable input field
interface InputProps {
    label: string
    value: string
    onChange: (val: string) => void
    type?: string
    icon?: React.ReactNode
}

const InputField = ({ label, value, onChange, type = "text", icon }: InputProps) => (
    <div className="flex flex-col border rounded-md p-3 bg-white shadow-sm">
        <small className="text-sm font-semibold text-sky-600 flex items-center gap-2">{icon} {label}</small>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            required
            className="mt-1 p-2 outline-none border-b-2 border-transparent focus:border-b-sky-600 transition"
        />
    </div>
)

export default AddPelanggan
