import { getServerCookie } from "@/helper/server-cookie"
import FilterJadwal from "./FilterJadwal"
import axiosInstance from "@/helper/api"
import { ScheduleType } from "@/app/karyawan/types"
import Schedule from "./Schedule"

type props = {
    searchParams: Promise<{
        departured_location?: string,
        arrived_location?: string 
    }>
}

const getJadwal = async (
    departured_location: string,
    arrived_location: string
): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`
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

const JadwalPage = async (myProp: props) => {
    const departured_location = (await myProp.searchParams).departured_location?.toString() || ""
    const arrived_location = (await myProp.searchParams).arrived_location?.toString() || ""
    const dataJadwal = await getJadwal(departured_location, arrived_location)
    return (
        <div className="w-full p-3">
            <div className="bg-blue-700 w-full p-3 rounded-md shadow-md">
                <h1 className="text-white text-xl font-bold">
                    Pemesanan Tiket Kereta Api
                </h1>
                <p className="text-white text-sm">
                    {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>
                <FilterJadwal 
                departuredLocation={departured_location} 
                arrivedLocation={arrived_location} 
                />
            </div>
            {
                departured_location !== "" && 
                arrived_location !== "" &&
                //** div ini akan tampil jika departur dan arivv telah diisi */
                <div className="my-3">
                    {
                        dataJadwal.length == 0 ?
                        <div className="w-full p-3 rounded-md bg-orange-100">
                            <p className="text-sm text-slate-500">
                                Jadwal tidak ada 
                            </p>
                        </div>
                        :
                        <div>
                            {
                                dataJadwal.map((jadwal, index) => (
                                    <Schedule 
                                    item={jadwal}
                                    key={`keyJadwal-${index}`}/>
                                ))
                            }
                        </div>
                    }
                </div>
}
        </div>
    )
}

export default JadwalPage