"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Modal from "@/components/Modal";
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import { AdminType } from "../types";

type props = {
    admin: AdminType
}
const ResetPasswordAdmin = (myProp: props) => {
    const [password, setPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setPassword("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const TOKEN = getCookie(`token`);
            const url = `/employee/${myProp.admin.id}`;
            const requestData = {
                password
            }
            // hit endpoint to add kereta
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })
            console.log(response)
            const message = response.data.message
            if(response.data.success === true) {
                toast(message, {
                    containerId: `toastEdit-${myProp.admin.id}`, 
                    type: `success`
                })
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.admin.id}`, 
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, {containerId: `toastEdit-${myProp.admin.id}`, type: `success`})
        }
    }
    return (
        <div className="">
            <ToastContainer containerId={`toastEdit-${myProp.admin.id}`} />
            <button type="button" className="px-2 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white flex justify-center items-center" onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <span className="text-sm">
                    Reset Password
                </span>
            </button>
            <Modal isShow={show}>
                <form onSubmit={ e => handleSubmit(e) }>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Password Admin
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan Password yang diisi sudah benar
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Password
                            </small>
                            <input type="password" 
                            id={`username-${myProp.admin.id}`} 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="p-1 outline-none focus:border-b-sky-600 focus:border-b"/>
                        </div>
                    </div>
                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end">
                        <button type="button"
                        onClick={() => closeModal()}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button type="submit"
                        className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
export default ResetPasswordAdmin;