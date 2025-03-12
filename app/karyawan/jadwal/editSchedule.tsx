"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { ScheduleType } from "../types"

type props = {
    schedule: ScheduleType
}

const EditSchedule = (myProp: props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDeparturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDeparturedLocation(myProp.schedule.departured_location)
        setArrivedLocation(myProp.schedule.arrived_location)
        setDeparturedTime(new Date(myProp.schedule.departured_time))
        setArrivedTime(new Date(myProp.schedule.arrived_time))
        setPrice(myProp.schedule.price)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/schedule/${myProp.schedule.id}`
            const requestData = {
                departured_location,
                departured_time,
                arrived_location,
                arrived_time,
                price
            }
            // Hit endpoint to update schedule
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success === true) {
                toast(message, {
                    containerId: `toastEditJadwal`,
                    type: "success"
                })
                setShow(false)
                // Reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEditJadwal`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast(
                `Something went wrong`,
                {
                    containerId: `toastEditJadwal`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEditJadwal`} />
            <button
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700"
                type="button"
                onClick={() => openModal()}
            >
                Edit Schedule
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* Modal Header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Jadwal
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data di isi dengan benar
                        </span>
                    </div>

                    {/* Modal Body */}
                    <div className="w-full p-2">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Berangkat dari
                            </small>
                            <input
                                type="text"
                                id={`departured_location`}
                                value={departured_location}
                                onChange={e => setDeparturedLocation(e.target.value)}
                                className="p-1 outline-none w-full hover:border-b hover:border-b-red-600"
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu Keberangkatan
                            </small>
                            <br />
                            <DatePicker
                                showTimeInput={true}
                                id={`departured_time`}
                                className="p-1 outline-none w-full hover:border-b hover:border-b-red-600"
                                selected={departured_time}
                                dateFormat={`dd MMMM yyyy HH:mm`}
                                onChange={date => setDeparturedTime(date || new Date())}
                            />
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Tiba di 
                            </small>
                            <input
                                type="text"
                                id={`arrived_location`}
                                value={arrived_location}
                                onChange={e => setArrivedLocation(e.target.value)}
                                className="p-1 outline-none w-full hover:border-b hover:border-b-red-600"
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu kedatangan
                            </small>
                            <br />
                            <DatePicker
                                showTimeInput={true}
                                id={`arrived_time`}
                                className="p-1 outline-none w-full hover:border-b hover:border-b-red-600"
                                selected={arrived_time}
                                dateFormat={`dd MMMM yyyy HH:mm`}
                                onChange={date => setArrivedTime(date || new Date())}
                            />
                        </div>
                    </div>
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Harga
                            </small>
                            <input
                                type="number"
                                id={`price`}
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="p-1 outline-none w-full hover:border-b hover:border-b-red-600"
                                required={true}
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

export default EditSchedule
