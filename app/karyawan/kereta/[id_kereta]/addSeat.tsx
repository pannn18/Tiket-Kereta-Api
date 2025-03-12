"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import Modal from "@/components/Modal";

type props = {
    wagon_id: number
} 

const AddSeat = (myProp: props) => {
    const [seat_number, setSeatNumber] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const [wagon_id, setWagonId] = useState<number>(0)
    const router = useRouter()
    
    const openModal = () => {
        setShow(true)
        setSeatNumber("")
        setWagonId(myProp.wagon_id)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/seat`
            const requestData = {
                seat_number,
                wagon_id
            }
            // hit endpoint to add seat
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message

            if(response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastAddSeat`,
                    type: "success"
                })
                setTimeout(() =>router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastAddSeat`,
                    type: "error"
                })
            }
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, 
                {
                    containerId: `toastAddSeat`,
                    type: "error"
                }
            )
        }
    } 
    return (
        <div>
            <ToastContainer containerId={`toastAddSeat`} />
            <button type="button" onClick={() => openModal()}
            className="size-20 rounded-sm flex items-center justify-center bg-green-600">
                <span className="text-white font-semibold">
                    +
                </span>
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
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

export default AddSeat;