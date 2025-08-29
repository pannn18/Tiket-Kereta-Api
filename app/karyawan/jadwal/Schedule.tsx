"use client"

import { ScheduleType } from "../types"
import DropSchedule from "./dropSchecule"
import EditSchedule from "./editSchedule"
import { FaTrain, FaMoneyBillWave, FaMapMarkerAlt, FaClock } from "react-icons/fa"

type Props = {
    item: ScheduleType
}

const showTime = (date: string) => {
    const curretDate = new Date(date)
    return curretDate.toLocaleDateString(`id-ID`, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })
}

const Schedule = ({ item }: Props) => {
    return (
        <div 
            className="w-full flex flex-wrap border rounded-lg shadow-md p-3 my-3 hover:shadow-xl transition-all duration-300 bg-white"
        >
            <div className="w-full md:w-3/12 p-2 flex flex-col gap-1">
                <small className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                    <FaMapMarkerAlt /> Berangkat dari
                </small>
                <strong>{item.departured_location}</strong>
                <small className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                    <FaClock /> Waktu Keberangkatan
                </small>
                <strong>{showTime(item.departured_time)}</strong>
            </div>

            <div className="w-full md:w-3/12 p-2 flex flex-col gap-1">
                <small className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                    <FaMapMarkerAlt /> Tiba Di
                </small>
                <strong>{item.arrived_location}</strong>
                <small className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                    <FaClock /> Waktu Kedatangan
                </small>
                <strong>{showTime(item.arrived_time)}</strong>
            </div>

            <div className="w-full md:w-3/12 p-2 flex flex-col gap-1">
                <small className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                    <FaTrain /> Unit Kereta
                </small>
                <strong>{item.train_details.name}</strong>
                <small className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                    <FaMoneyBillWave /> Harga
                </small>
                <strong>{item.price.toLocaleString(`en-US`, { style: `currency`, currency: `IDR` })}</strong>
            </div>

            <div className="w-full md:w-3/12 p-2 flex flex-col gap-2">
                <small className="text-sm font-medium">Opsi</small>
                <div className="flex gap-2 items-center">
                    <DropSchedule schedule={item} />
                    <EditSchedule schedule={item} />
                </div>
            </div>
        </div>
    )
}

export default Schedule
