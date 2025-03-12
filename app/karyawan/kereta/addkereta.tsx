"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const AddKereta = () => {
    const[name, setName] = useState<string>("")
    const[descriptions,setDescriptions] = useState<string>("")
    const[type,setType] = useState<string>("")
    const[show,setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setName("")
        setDescriptions("")
        setType("")
    }

    const closeModal =() => {
        setShow(false)
    }
    const handleSubmit =async (e:FormEvent) =>{
        try {
            e.preventDefault()
            const TOKEN =getCookie(`token`)
            const url=`/train`
            const requestData={
                name,descriptions,type
            }
            //hit end point to add kereta
            const response:any = await axiosInstance
            .post(url,requestData,{
                headers:{
                    authorization:`Bearer ${TOKEN}`
                }
            })
            const message = response.data.message
            if(response.data.success === true){
                toast(message,
                    {
                    containerId:`toastAdd`,
                    type:"success"
                    }
            )
            setShow(false)
            //reload space
            setTimeout(() => router.refresh(),1000)
        }
        else{
            toast(message,
                {
                    containerId:`toastAdd`,
                    type:"warning"
                }
            )
        }
        } catch (error) {
            console.log(error);
            toast(
                `something ya`,
                {
                    containerId:`toastAdd`,
                    type:"error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAdd`}/>
            <button type="button"
            onClick={() => openModal ()}
            className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500">
            Tambah Data Kereta
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>

                    {/* modal header*/}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah data Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            pastikan data yang sudah diisi benar
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xl font-semibold text-sky-600">
                                Nama Kereta
                            </small>
                            <input type="text" id={`name`}
                            value={name}
                            onChange={e => setName (e.target.value)}
                            required={true}
                            className="p-1 outline-none focus:border-b-sky-600 focus:border-b"/>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xl font-semibold text-sky-600">
                                Deskripsi kereta
                            </small>
                            <input type="text" id={`Descriptions`}
                            value={descriptions}
                            onChange={e => setDescriptions (e.target.value)}
                            required={true}
                            className="p-1 outline-none focus:border-b-sky-600 focus:border-b"/>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-xl font-semibold text-sky-600">
                            type kereta
                            </small>
                            <input type="text" id={`Type`}
                            value={type}
                            onChange={e => setType (e.target.value)}
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
export default AddKereta