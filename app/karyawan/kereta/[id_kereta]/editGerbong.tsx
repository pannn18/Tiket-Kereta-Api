"use client"

import { FormEvent, useState } from "react"
import { GerbongType } from "../../types"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import Modal from "@/components/Modal"

type props = {
    item: GerbongType
}

const EditGerbong = (myProp: props) => {
    const [name, setName] = useState<string>("")
    const [seat_count, setSeatCount] = useState<number>(0)
    const [train_id, setTrainId] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setName(myProp.item.name)
        setSeatCount(myProp.item.seat_count)
        setTrainId(myProp.item.train_id)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/${myProp.item.id}`
            const requestData = {
                name, seat_count, train_id
            }
            const response: any = await axiosInstance.put(
                url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
            )
            const message = response.data.message
            if (response.data.success === true) {
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: `success`
                })
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: "warning"
                })
            }

        } catch (error) {
            console.log(error);
            toast(
            ` Something wrong`,
                {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: "error"
                }
            )
        }
    }
    return (
        <div>
        <ToastContainer containerId={`toastEdit-${myProp.item.id}`} />
        <button type="button"
            onClick={() => openModal()}
            className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
            &#x270e;
        </button>
        <Modal isShow={show}>
            <form onSubmit={e => handleSubmit(e)}>
                {/** modal header */}
                <div className="w-full p-3 rounded-t-lg">
                    <h1 className="font-semibold text-lg">
                        Edit Gerbong Kereta
                    </h1>
                    <span className="text-sm text-slate-500">
                        Pastikan data yang diisi sudah benar
                    </span>
                </div>

                {/** modal header */}
                <div className="w-full p-3">
                    <div className="my-2 border rounded-md p-3">
                        <small className="text-sm font-semibold text-sky-600">
                            Nama Gerbong
                        </small>
                        <input type="text" id={`name-${myProp.item.id}`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                        />
                    </div>
                    <div className="my-2 border rounded-md p-3">
                        <small className="text-sm font-semibold text-sky-600">
                            Jumlah Kursi
                        </small>
                        <input type="text" id={`descriptions-${myProp.item.id}`}
                            value={seat_count}
                            onChange={e => setSeatCount(Number(e.target.value))}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                        />
                    </div>
                </div>

                {/** modal footer */}
                <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                    <button type="button" onClick={() => closeModal()}
                        className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                        Close
                    </button>
                    <button type="submit"
                        className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    </div>
    )
}
export default EditGerbong