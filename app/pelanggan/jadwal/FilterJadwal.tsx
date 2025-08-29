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
            router.push(
                `/pelanggan/jadwal?departured_location=${departured_location}&arrived_location=${arrived_location}`
            )
        }
    }

    useEffect(() => {
        setDeparturedLocation(myProp.departuredLocation)
        setArrivedLocation(myProp.arrivedLocation)
    }, [myProp.departuredLocation, myProp.arrivedLocation])

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg">
            <div className="flex flex-wrap gap-4">
                {/* Stasiun Asal */}
                <div className="flex-1 min-w-[200px]">
                    <label
                        className="block text-gray-700 font-semibold mb-1"
                        htmlFor="departured_location"
                    >
                        Stasiun Asal
                    </label>
                    <input
                        type="text"
                        id="departured_location"
                        className="w-full border border-gray-300 p-3 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none 
                                   transition text-black placeholder-gray-400"
                        value={departured_location}
                        onChange={(e) => setDeparturedLocation(e.target.value)}
                        placeholder="Masukkan stasiun asal"
                    />
                </div>

                {/* Stasiun Tujuan */}
                <div className="flex-1 min-w-[200px]">
                    <label
                        className="block text-gray-700 font-semibold mb-1"
                        htmlFor="arrived_location"
                    >
                        Stasiun Tujuan
                    </label>
                    <input
                        type="text"
                        id="arrived_location"
                        className="w-full border border-gray-300 p-3 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none 
                                   transition text-black placeholder-gray-400"
                        value={arrived_location}
                        onChange={(e) => setArrivedLocation(e.target.value)}
                        placeholder="Masukkan stasiun tujuan"
                    />
                </div>
            </div>

            {/* Tombol Cari */}
            <div className="mt-4">
                <button
                    type="button"
                    onClick={handleSearch}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 
                               hover:from-orange-500 hover:to-orange-600 
                               text-white font-semibold shadow-md 
                               transition transform hover:scale-105"
                >
                    Cari
                </button>
            </div>
        </div>
    )
}

export default FilterJadwal
