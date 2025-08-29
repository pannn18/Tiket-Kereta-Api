"use client"

import { GerbongType } from "@/app/karyawan/types"
import { useEffect, useState } from "react"
import Seat from "./seat"
import { toast, ToastContainer } from "react-toastify"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FaTrain } from "react-icons/fa"

type SeatBook = {
    passanger_id: string,
    passanger_name: string,
    seat_number: string,
}

type props = {
    schedule_id: number,
    wagons: GerbongType[]
}

const Booking = (myProp: props) => {
    const [details, setDetails] = useState<SeatBook[]>([])
    const [wagons, setWagons] = useState<GerbongType[]>([])
    const router = useRouter()

    useEffect(() => { setWagons([...myProp.wagons]) }, [myProp])

    const handleAddSeat = (seatBook: SeatBook) => {
        const temp = [...details, seatBook]
        setDetails(temp)

        const tempWagons = [...wagons]
        const findWagonIndex = tempWagons.findIndex(item => item.seats.map(it => it.seat_number).includes(seatBook.seat_number))
        const findSeatIndex = tempWagons[findWagonIndex].seats.findIndex(item => item.seat_number === seatBook.seat_number)
        tempWagons[findWagonIndex].seats[findSeatIndex].used = true
        setWagons([...tempWagons])
    }

    const handleSave = async () => {
        try {
            if(details.length === 0) {
                toast(`Pilih kursi terlebih dahulu`, { containerId: `toastBook`, type: `error` })
                return;
            }
            const url = `/purchase/customer`
            const requestData = {
                purchase_date: new Date().toISOString().substring(0, 10),
                schedule_id: myProp.schedule_id,
                details: details
            }
            const TOKEN = getCookie(`token`) || ""
            const response: any = await axiosInstance.post(url, requestData, { headers: { Authorization: `Bearer ${TOKEN}` } })

            if(response.data.success === true) {
                toast(response.data.message, { containerId: `toastBook`, type: `success` })
                router.replace(`/pelanggan/jadwal`)
            }
        } catch (error) {
            console.log(error)
            toast(`Something wrong`, { containerId: `toastBook`, type: `error` })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastBook`} />
            {wagons.map((wagon, index) => (
                <div key={`wagon-${index}`} className="w-full my-4 p-3 rounded-lg shadow-lg border bg-white">
                    <h3 className="font-semibold my-2 flex items-center gap-2 text-sky-600">
                        <FaTrain /> {wagon.name}
                    </h3>
                    <div className="grid grid-cols-5 md:grid-cols-6 gap-3">
                        {wagon.seats.map((seat, i) => (
                            <Seat key={`seat-${index}-${i}`} item={seat} onSave={seatBook => handleAddSeat(seatBook)} />
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSave} className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white p-3 rounded-md flex items-center justify-center gap-2">
                Pesan Sekarang
            </button>
        </div>
    )
}

export default Booking
