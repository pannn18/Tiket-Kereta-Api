"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { User } from "../types"

type props = {
    user:User
}
const ResetPassword = (myprop: props) => {
    const[password,setPassword] = useState<string>("")
    const[show,setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setPassword("")
    }

    const closeModal =() => {
        setShow(false)
    }
    const handleSubmit = async (e:FormEvent) =>{
        try {
            e.preventDefault()
            const TOKEN =getCookie(`token`)
            const url=`/customer/${myprop.user.id}`
            const requestData={
                password
            }
            //hit end point to add kereta
            const response:any = await axiosInstance
            .put(url,requestData,{
                headers:{
                    authorization:`Bearer ${TOKEN}`
                }
            })
            const message = response.data.message
            if(response.data.success === true){
                toast(message,
                    {
                    containerId:`toastEdit-${myprop.user.id}`,
                    type:"success"
                    }
            )
            setShow(false)
            //reload space
            setTimeout(() => router.refresh(),1000)
        }else{
            toast(message,
                {
                    containerId:`toastEdit-${myprop.user.id}`,
                    type:"warning"
                }
            )
        }
        } catch (error) {
            console.log(error);
            toast(
                `something ya`,
                {
                    containerId:`toastEdit-${myprop.user.id}`,
                    type:"error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myprop.user.id}`}/>
            <button type="button"
            onClick={() => openModal ()}
            className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
            &#x270E;
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>

                <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Reset Password Customer
                        </h1>
                        <span className="text-sm text-slate-500">
                            pastikan Password di isi dengan benar
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xl font-semibold text-sky-600 flex flex-col">
                            Reset Password
                            </small>
                            <input type="password" id={`password`}
                            value={password}
                            onChange={e => setPassword (e.target.value)}
                            required={true}
                            className="p-1 outline-none focus:border-b-sky-600 focus:border-b"/>
                        </div>
                    </div>
                     {/* modal terror */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()} className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
            
        </div>
    )
}
export default ResetPassword