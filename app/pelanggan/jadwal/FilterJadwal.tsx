"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type props = {
    departuredLocation: string
    arrivedLocation: string
}

const FilterJadwal = (myProp: props) => {
    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const router = useRouter()


    const handleSearch = () => {
        if (departured_location !== "" && arrived_location !== "") {
            router.push(`/pelanggan/jadwal?departured_location=${departured_location}&arrived_location=${arrived_location}`)
        }
    }

    /** use effect digunakan untuk update data komponen ini dimuat ulang */
    useEffect(() => {
        setDeparturedLocation(myProp.departuredLocation)
        setArrivedLocation(myProp.arrivedLocation)
        // ketika departured_location atau arrived_location diubah, maka useEffect akan dipanggil ulang
        // ini berguna untuk menampilkan jadwal yang sesuai dengan filter yang dipilih user
    }, [myProp.departuredLocation, myProp.arrivedLocation])
    return (
        <div>
            <div className="my-5 w-full flex flex-wrap items-center">
                <div className="w-full md:w-1/2 p-3">
                    <strong className="text-white font-semibold">
                        Stasiun Asal
                    </strong> <br />
                    <input type="text" 
                    id={`departured_location`} 
                    className="w-full border p-2 rounded-md"
                    value={departured_location}
                    onChange={e => setDeparturedLocation(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/2 p-3">
                    <strong className="text-white font-semibold">
                        Stasiun Tujuan
                    </strong> <br />
                    <input type="text" 
                    id={`arrived_location`} 
                    className="w-full border p-2 rounded-md"
                    value={arrived_location}
                    onChange={e => setArrivedLocation(e.target.value)}
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

export default FilterJadwal