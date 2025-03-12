"use client"

import { GerbongType } from "@/app/karyawan/types"
import { useEffect, useState } from "react"
import Seat from "./seat"
import { toast, ToastContainer } from "react-toastify"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"

type SeatBook = {
    passanger_id: string,
    passanger_name: string
    seat_number: string,
}

type props = {
    schedule_id: number
    wagons: GerbongType[]
}

const Booking = (myProp: props) => {
    const [details, setDetails] =useState<SeatBook[]>([])
    const [wagons, setWagons] = useState<GerbongType[]>([])
    const router = useRouter()

    useEffect(() => { 
        //** copy data dari prop "wagons" ke state "wagons" */
        setWagons([...myProp.wagons])
    }, [myProp])

    const handleAddSeat = (seatBook: SeatBook) => {
        const temp = [...details]
        temp.push(seatBook)
        setDetails(temp)

        const tempWagons = [...wagons]
        /** mencari posisi index dari gerbong yang mempunyai "seat_number" dari yang dipilib user */
        const findWagonIndex = tempWagons.findIndex(item => item.seats.map(it => it.seat_number).includes(seatBook.seat_number))
        /** mencari posisi index dari kursi yang dipilih */
        const findSeatIndex = tempWagons[findWagonIndex].seats.findIndex(item => item.seat_number === seatBook.seat_number)
        /** update status kursi */
        tempWagons[findWagonIndex].seats[findSeatIndex].used = true

        setWagons([...tempWagons])
    }

    const handleRemoveSeat = (index: number, seatBook: SeatBook) => {
        const temp = [...details]
        temp.splice(index, 1)
        setDetails(temp)

        const tempWagons = [...wagons]
        /** mencari posisi index dari gerbong yang mempunyai "seat_number" dari yang dipilib user */
        const findWagonIndex = tempWagons.findIndex(item => item.seats.map(it => it.seat_number).includes(seatBook.seat_number))
        /** mencari posisi index dari kursi yang dipilih */
        const findSeatIndex = tempWagons[findWagonIndex].seats.findIndex(item => item.seat_number === seatBook.seat_number)
        /** update status kursi */
        tempWagons[findWagonIndex].seats[findSeatIndex].used = false

        setWagons([...tempWagons])
    }

    const handleSave = async () => {
        try {
            if(details.length === 0) {
                toast(`Pilih kursi terlebih dahulu`, {
                    containerId: `toastBook`,
                    type: `error`
                })
                return;
            }
            const url = `/purchase/customer`
            const requestData = {
                purchase_date: new Date().toISOString().substring(0, 10),
                schedule_id: myProp.schedule_id,
                details: details
            }
            
            const TOKEN = getCookie(`token`) || ""
            /** hit end point */
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })

            if(response.data.success === true) {
                const message = response.data.message
                toast(message, {
                    containerId: `toastBook`,
                    type: `success`
                })
                router.replace(`/pelanggan/jadwal`)
            }
        } catch (error) {
            console.log(error)
            toast(`Something wrong`, {
                containerId: `toastBook`,
                type: `error`
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastBook`} />
            {
                myProp.wagons.map((wagon, index) => (
                    <div key={`keyWagon-${index}`} 
                    className="w-full my-2 p-3 rounded-md shadow-md border">
                        <h3 className="font-semibold my-2">
                            {wagon.name}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {
                                wagon.seats.map((seat, indexSeat) => (
                                    <Seat 
                                    key={`keySeat-${index}-${indexSeat}`}
                                    item={seat}
                                    onSave={ seatBook => handleAddSeat(seatBook) }
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <button type="button"
            onClick={() => handleSave()}
            className="w-full rounded-md my-2 bg-green-600 hover:bg-green-400 text-white p-3">
                Pesan Sekarang
            </button>
        </div>
    )
}

export default Booking