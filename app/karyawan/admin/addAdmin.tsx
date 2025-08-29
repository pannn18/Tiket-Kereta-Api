"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Modal from "@/components/Modal";
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const AddAdmin = () => {
    const [password, setPassword] = useState<string>("")
    const [nik, setNik] = useState<string>("")
    const [username, setUserName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setPassword("")
        setNik("")
        setUserName("")
        setName("")
        setAddress("")
        setPhone("")
    }

    const closeModal = () => setShow(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const TOKEN = getCookie(`token`);
            const url = `/employee/register`;
            const requestData = { password, nik, username, name, address, phone };
            const response: any = await axiosInstance.post(url, requestData, {
                headers: { authorization: `Bearer ${TOKEN}` }
            });
            const message = response.data.message
            if(response.data.success) {
                toast.success(message, { containerId: "toastAdd" })
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast.warning(message, { containerId: "toastAdd" })
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong", { containerId: "toastAdd" })
        }
    }

    const inputClass = "w-full p-2 outline-none border border-gray-200 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-300 transition-all duration-300"

    
    return (
        <div className="">
            <ToastContainer containerId="toastAdd" />
            <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                type="button" 
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={openModal}
            >
                <FaPlus /> Tambah Data Admin
            </motion.button>

            <Modal isShow={show}>
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-xl overflow-hidden"
                >
                    {/* header */}
                    <div className="w-full p-5 bg-gradient-to-r from-sky-400 to-blue-500 text-white">
                        <h1 className="text-xl font-bold">Tambah Data Admin</h1>
                        <p className="text-sm opacity-90 mt-1">Pastikan data yang diisi sudah benar</p>
                    </div>

                    {/* body */}
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: "Nama", value: name, set: setName, type: "text" },
                            { label: "Username", value: username, set: setUserName, type: "text" },
                            { label: "Password", value: password, set: setPassword, type: "password" },
                            { label: "NIK", value: nik, set: setNik, type: "text" },
                            { label: "Address", value: address, set: setAddress, type: "text" },
                            { label: "Phone", value: phone, set: setPhone, type: "text" }
                        ].map((field, idx) => (
                            <motion.div 
                                key={idx} 
                                whileHover={{ scale: 1.02 }} 
                                className="flex flex-col"
                            >
                                <label className="text-sky-700 font-semibold text-sm mb-1">{field.label}:</label>
                                <input
                                    type={field.type}
                                    value={field.value}
                                    onChange={e => field.set(e.target.value)}
                                    className={inputClass}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* footer */}
                    <div className="w-full p-5 flex justify-end gap-3 bg-gray-50">
                        <motion.button 
                            type="button" 
                            onClick={closeModal}
                            whileHover={{ scale: 1.05 }} 
                            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300"
                        >
                            Close
                        </motion.button>
                        <motion.button 
                            type="submit"
                            whileHover={{ scale: 1.05 }} 
                            className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white transition-all duration-300"
                        >
                            Save
                        </motion.button>
                    </div>
                </motion.form>
            </Modal>
        </div>
    )
}

export default AddAdmin;
