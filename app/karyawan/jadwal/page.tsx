import { getServerCookie } from "@/helper/server-cookie"
import { ScheduleType } from "../types"
import axiosInstance from "@/helper/api"
import Schedule from "./Schedule"
import { keretaType } from "../types"
import AddSchedule from "./AddSchedule"
export const dynamic = "force-dynamic";

/** get data jadwal */
const getJadwal = async (): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule`
        const TOKEN = await getServerCookie(`token`)
        /** hit endpoint */
        const response: any = await axiosInstance.get(url, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        })
        if(response.data.success === true )
            return response.data.data
        return []
    } catch (error) {
        console.log(error);
        return[]
    }
}
const getKereta = async () : Promise<keretaType[]> => {
    try {
        // get token from cookie
        const token = await getServerCookie(`token`)
        const url=`/train`
        // hit end point
        const response:any =await axiosInstance.get(url,{
            headers:{
                authorization:`bearer ${token}`
            }
        })
        if(response.data.success == true){
            return response.data.data
    }
        return[]
    } catch (error) {
        console.log(error);
        return[]
        
    }
}
const JadwalPage = async () => {
    const dataJadwal = await getJadwal()
    const dataKereta = await getKereta()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Jadwal
            </h1>
            <span className="text-sm text-slate-500">
                Halaman ini memuat daftar jadwal kereta yang tersedia
            </span>
            <AddSchedule trains={dataKereta}/>
            <div className="my-3">
                {
                    dataJadwal.map((jadwal, index) => (
                        <Schedule 
                        key={index} 
                        item={jadwal}/>
                    ))
                }
            </div>
        </div>
    )
}
export default JadwalPage