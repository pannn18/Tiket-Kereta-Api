import { getServerCookie } from "@/helper/server-cookie"
import { ScheduleType } from "../types"
import axiosInstance from "@/helper/api"
import Schedule from "./Schedule"
import { keretaType } from "../types"
import AddSchedule from "./AddSchedule"
export const dynamic = "force-dynamic";
import { FaTrain } from "react-icons/fa"

const getJadwal = async (): Promise<ScheduleType[]> => {
    try {
        const TOKEN = await getServerCookie("token")
        const response: any = await axiosInstance.get("/schedule", {
            headers: { Authorization: `Bearer ${TOKEN}` }
        })
        return response.data.success ? response.data.data : []
    } catch (error) {
        console.log(error)
        return []
    }
}

const getKereta = async (): Promise<keretaType[]> => {
    try {
        const TOKEN = await getServerCookie("token")
        const response: any = await axiosInstance.get("/train", {
            headers: { Authorization: `Bearer ${TOKEN}` }
        })
        return response.data.success ? response.data.data : []
    } catch (error) {
        console.log(error)
        return []
    }
}

const JadwalPage = async () => {
    const dataJadwal = await getJadwal()
    const dataKereta = await getKereta()

    return (
        <div className="w-full p-5 bg-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <div className="flex items-center gap-2">
                    <FaTrain className="text-blue-600 text-xl" />
                    <h1 className="text-xl font-semibold">Data Jadwal</h1>
                </div>
                <span className="text-sm text-slate-500">
                    Halaman ini memuat daftar jadwal kereta yang tersedia
                </span>
            </div>

            {/* Add Schedule Button */}
            <div className="mb-4">
                <AddSchedule trains={dataKereta} />
            </div>

            {/* List Schedule */}
            <div className="my-3 space-y-3">
                {dataJadwal.map((jadwal, index) => (
                    <Schedule key={index} item={jadwal} />
                ))}
            </div>
        </div>
    )
}

export default JadwalPage
