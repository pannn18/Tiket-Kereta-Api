"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { keretaType } from "../types"

type props = {
    trains: keretaType[]
}

const AddSchedule = (myProp: props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)
    
    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDeparturedTime] = useState<Date>(new Date)
    const [arrived_time, setArrivedTime] = useState<Date>(new Date)
    const [train_id, setTrainId] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDeparturedLocation("")
        setArrivedLocation("")
        setDeparturedTime(new Date)
        setArrivedTime(new Date)
        setTrainId(0)
        setPrice(0)
    }
    const closeModal =() => {
        setShow(false)
    }
    const handleSubmit =async (e: FormEvent) =>{
        try {
            e.preventDefault()
            const TOKEN =getCookie(`token`)
            const url=`/schedule`
            const requestData={
                departured_location, departured_time, arrived_location, arrived_time, train_id, price
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
                    containerId:`toastAddJadwal`,
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
                    containerId:`toastAddJadwal`,
                    type:"warning"
                }
            )
        }
        } catch (error) {
            console.log(error);
            toast(
                `something wronk`,
                {
                    containerId:`toastAddJadwal`,
                    type:"error"
                }
            )
        }
    }
    return(
        <div>
            <ToastContainer containerId={`toastAddJadwal`}/>
            <button className="px-4 py-2 text-white bg-red-600 hover:bg-red-700"
            type="button"
            onClick={() => openModal()}>
            Tambah Jadwal Kereta
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
            {/** modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Jadwal Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/** modal body */}
                    <div className="w-full p-2">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Berangkat dari
                            </small>
                            <input type="text" id={`departured_location`}
                            value={departured_location}
                            onChange={e => setDeparturedLocation(e.target.value)}
                            className="p-1 outline-6 w-full hover:border-b hover:border-b-red-600"
                            required={true}/>
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
                            className="p-1 outline-6 w-full hover:border-b hover:border-b-red-600"
                            selected={new Date(departured_time)}
                            dateFormat={`dd MMMM YYYY HH:mm`}
                            onChange={date => setDeparturedTime(date|| new Date())}/>
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Tiba di
                            </small>
                            <input type="text" id={`arrived_location`}
                            value={arrived_location}
                            onChange={e => setArrivedLocation(e.target.value)}
                            className="p-1 outline-none w-full hover:border-b hover:border-b-red-600"
                            required={true}/>
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu Kedatangan
                            </small>
                            <br />
                            <DatePicker
                            showTimeInput={true}
                            id={`arrived_time`}
                            className="p-1 outline-6 w-full hover:border-b hover:border-b-red-600"
                            selected={new Date(arrived_time)}
                            dateFormat={`dd MMMM YYYY HH:mm`}
                            onChange={date => setArrivedTime(date|| new Date())}/>
                        </div>
                    </div>
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Harga
                            </small>
                            <input type="number" id={`price`}
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className="p-1 outline-none w-full hover:border-b hover:border-b-red-600"
                            required={true}/>
                        </div>
                    </div>
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Jenis Kereta
                            </small>
                            <select id={`train_id`}
                            value={train_id.toString()}
                            onChange={e => setTrainId(Number(e.target.value))}
                            className="p-1 outline-none w-full hover:border-b-red-600"
                            required={true}>
                                <option value="">Pilih Jenis Kereta</option>
                                {
                                    myProp.trains.map((kereta, index) =>(
                                        <option value={kereta.id}
                                        key={`optionKereta-${index}`}>
                                            {kereta.name}
                                        </option>
                                    ))
                                }
                            </select>
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
export default AddSchedule