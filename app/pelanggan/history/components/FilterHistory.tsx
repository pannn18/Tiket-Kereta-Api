"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type props = {
    departuredTime: string
    arrivedTime: string
}

const FilterHistory = (myProp: props) => {
    const [departured_time, setDeparturedTime] = useState<string>("")
    const [arrived_time, setArrivedTime] = useState<string>("")
    const router = useRouter()

    const handleSearch = () => {
        if (departured_time !== "" && arrived_time !== "") {
            router.push(`/pelanggan/history?departured_time=${departured_time}&arrived_time=${arrived_time}`)
        }
    }

    /** use effect digunakan untuk update data komponen ini dimuat ulang */
    useEffect(() => {
        setDeparturedTime(myProp.departuredTime)
        setArrivedTime(myProp.arrivedTime)
        // ketika departured_location atau arrived_location diubah, maka useEffect akan dipanggil ulang
        // ini berguna untuk menampilkan jadwal yang sesuai dengan filter yang dipilih user
    }, [myProp.departuredTime, myProp.arrivedTime])
    return (
        <div>
            <div className="my-5 w-full flex flex-wrap items-center">
                <div className="w-full md:w-1/2 p-3">
                    <strong className="text-white font-semibold">
                        Tanggal Keberangkatan
                    </strong> <br />
                    <input type="date" 
                    id={`departured_time`} 
                    className="w-full border p-2 rounded-md"
                    value={departured_time}
                    onChange={e => setDeparturedTime(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/2 p-3">
                    <strong className="text-white font-semibold">
                        Tanggal Kedatangan
                    </strong> <br />
                    <input type="date" 
                    id={`arrived_time`} 
                    className="w-full border p-2 rounded-md"
                    value={arrived_time}
                    onChange={e => setArrivedTime(e.target.value)}
                    />
                </div>
            </div>
            <button type="button"
            onClick={handleSearch}
            className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white mx-3">
                Cari
            </button>
        </div>
    )
}

export default FilterHistory