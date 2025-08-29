import { getServerCookie } from "@/helper/server-cookie"
import FilterHistory from "./components/FilterHistory"
import axiosInstance from "@/helper/api"
import { HistoryType } from "@/app/karyawan/types"
import HistoryCard from "./components/HistoryCard"
export const dynamic = "force-dynamic";

type props = {
    searchParams: {
        departured_time?: string,
        arrived_time?: string 
    }
}

const getHistory = async (
    departured_time: string,
    arrived_time: string
): Promise<HistoryType[]> => {
    try {
        const url = `/purchase/customer?start_date=${departured_time}&end_date=${arrived_time}`
        const TOKEN = await getServerCookie(`token`)
        /**hit endpoint */
        const response: any = await axiosInstance.get(url, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        })
        if (response.data.success === true) return response.data.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

const HistoryPage = async (myProp: props) => {
    const departured_time = (await myProp.searchParams).departured_time?.toString() || ""
    const arrived_time = (await myProp.searchParams).arrived_time?.toString() || ""
    const dataHistory = await getHistory(departured_time, arrived_time)
    return (
        <div className="w-full p-3">
            <div className="bg-blue-700 w-full p-3 rounded-md shadow-md">
                <h1 className="text-white text-xl font-bold">
                    Pencarian History
                </h1>
                <p className="text-white text-sm">
                    {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>
                <FilterHistory 
                departuredTime={departured_time} 
                arrivedTime={arrived_time} 
                />
            </div>
            {
                departured_time !== "" && 
                arrived_time !== "" &&
                //** div ini akan tampil jika departur dan arivv telah diisi */
                <div className="my-3">
                    {
                        dataHistory.length == 0 ?
                        <div className="w-full p-3 rounded-md bg-orange-100">
                            <p className="text-sm text-slate-500">
                                Jadwal tidak ada 
                            </p>
                        </div>
                        :
                        <div>
                            {
                dataHistory.map((item, index) => (
                    <HistoryCard key={index} item={item}/>
                ))
            }
                        </div>
                    }
                </div>
}
        </div>
    )
}

export default HistoryPage