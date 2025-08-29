import { keretaType, ScheduleType } from "@/app/karyawan/types";
import axiosInstance from "@/helper/api";
import { getServerCookie } from "@/helper/server-cookie";
import Booking from "./booking";
export const dynamic = "force-dynamic";
import { FaMapMarkerAlt, FaClock, FaTrain } from "react-icons/fa";

const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleTimeString(`id-ID`, {
        year: "numeric",
        month: "long",
        day: "2-digit"
    })
}

//** get kereta by jadwal */
const getTrainBySchedule = async (schedule_id: number): Promise<keretaType | null> => {
    try {
        const url = `/schedule/train/${schedule_id}`
        const TOKEN = await getServerCookie(`token`)
        const response: any = await axiosInstance.get(url, { headers: { Authorization: `Bearer ${TOKEN}` } })
        if (response.data.success === true) return response.data.data
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

//** get schedule detail */
const getScheduleDetail = async (schedule_id: number): Promise<ScheduleType | null> => {
    try {
        const url = `/schedule/${schedule_id}`
        const TOKEN = await getServerCookie(`token`)
        const response: any = await axiosInstance.get(url, { headers: { Authorization: `Bearer ${TOKEN}` } })
        if (response.data.success === true) return response.data.data
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

type props = {
    params: Promise<{ schedule_id: number }>
}

const KeretaDetailPage = async (myProp: props) => {
    const schedule_id = ((await myProp.params).schedule_id)
    const detailSchedule = await getScheduleDetail(schedule_id)
    const detailKereta = await getTrainBySchedule(schedule_id)

    return (
        <div className="w-full p-4 md:p-6 space-y-6">

            <h1 className="text-3xl font-bold text-sky-700 mb-4">Detail Keberangkatan Kereta</h1>

            {/* Card info */}
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-sky-500 text-xl" />
                    <div>
                        <p className="text-sm text-gray-500">Stasiun Keberangkatan</p>
                        <p className="font-semibold text-lg">{detailSchedule?.departured_location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <FaClock className="text-sky-500 text-xl" />
                    <div>
                        <p className="text-sm text-gray-500">Waktu Keberangkatan</p>
                        <p className="font-semibold text-lg">{showTime(detailSchedule?.departured_time || "")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-green-500 text-xl" />
                    <div>
                        <p className="text-sm text-gray-500">Stasiun Tujuan</p>
                        <p className="font-semibold text-lg">{detailSchedule?.arrived_location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <FaClock className="text-green-500 text-xl" />
                    <div>
                        <p className="text-sm text-gray-500">Waktu Kedatangan</p>
                        <p className="font-semibold text-lg">{showTime(detailSchedule?.arrived_time || "")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <FaTrain className="text-orange-500 text-xl" />
                    <div>
                        <p className="text-sm text-gray-500">Nama Kereta</p>
                        <p className="font-semibold text-lg">{detailKereta?.name}</p>
                    </div>
                </div>
            </div>

            {/* Booking seat map */}
            <div>
                <Booking schedule_id={schedule_id} wagons={detailKereta?.wagons || []} />
            </div>
        </div>
    )
}

export default KeretaDetailPage