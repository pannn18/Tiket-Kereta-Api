"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import Modal from "@/components/Modal";
import { KursiType } from "../../types";

type props = {
    item: KursiType
} 

const EditSeat = (myProp: props) => {
    const [seat_number, setSeatNumber] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const [wagon_id, setWagonId] = useState<number>(0)
    const router = useRouter()
    
    const openModal = () => {
        setShow(true)
        setSeatNumber(myProp.item.seat_number)
        setWagonId(myProp.item.wagon_id)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSave = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/seat/${myProp.item.id}`
            const requestData = {
                seat_number,
                wagon_id
            }
            // hit endpoint to add seat
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message

            if(response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastUpdateSeat`,
                    type: "success"
                })
                setTimeout(() =>router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastUpdateSeat`,
                    type: "error"
                })
            }
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, 
                {
                    containerId: `toastUpdateSeat`,
                    type: "error"
                }
            )
        }
    } 
    return (
        <div>
            <ToastContainer containerId={`toastUpdateSeat`} />
            <button type="button" onClick={() => openModal()}
            className="size-1 rounded-sm flex items-center justify-center bg-sky-900">
                <span className="text-white font-semibold bg-sky-600 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </span>
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSave}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Pesan Kursi
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Kursi
                            </small>
                            <input type="text" 
                            id={`name`} 
                            value={seat_number}
                            onChange={e => setSeatNumber(e.target.value)}
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

export default EditSeat;