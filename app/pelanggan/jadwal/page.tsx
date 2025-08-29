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
        <div className="w-full p-6 bg-gray-50 min-h-screen space-y-6">

            {/* Filter Form Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-1">Pemesanan Tiket Kereta Api</h1>
                <p className="text-sm opacity-90 mb-4">
                    {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>
                <FilterJadwal 
                    departuredLocation={departured_location} 
                    arrivedLocation={arrived_location} 
                />
            </div>

            {/* Schedule List */}
            <div className="space-y-4">
                {departured_location && arrived_location ? (
                    dataJadwal.length === 0 ? (
                        <div className="flex justify-center items-center p-6 bg-yellow-100 rounded-xl shadow-md">
                            <p className="text-sm text-yellow-800 font-medium">Jadwal tidak ditemukan 😔</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {dataJadwal.map((jadwal, index) => (
                                <Schedule 
                                    item={jadwal} 
                                    key={`keyJadwal-${index}`} 
                                />
                            ))}
                        </div>
                    )
                ) : (
                    <div className="text-center text-gray-400">Silakan pilih stasiun asal dan tujuan terlebih dahulu.</div>
                )}
            </div>
        </div>
    )
}

export default JadwalPage
