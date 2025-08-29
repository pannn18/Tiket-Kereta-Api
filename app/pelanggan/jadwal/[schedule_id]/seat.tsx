"use client"

import { KursiType } from "@/app/karyawan/types"
import Modal from "@/components/Modal"
import { FormEvent, useState } from "react"
import { FaChair, FaTimes, FaSave } from "react-icons/fa"

type SeatBook = {
    passanger_id: string,
    passanger_name: string,
    seat_number: string
}

type props = {
    item: KursiType,
    onSave: (item: SeatBook) => void
}

const Seat = (myProp: props) => {
    const [show, setShow] = useState(false)
    const [passanger_id, setPassangerId] = useState("")
    const [passanger_name, setPassangerName] = useState("")

    const openModal = () => { setShow(true); setPassangerId(""); setPassangerName(""); }
    const closeModal = () => setShow(false)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); setShow(false)
        myProp.onSave({ passanger_id, passanger_name, seat_number: myProp.item.seat_number })
    }

    return (
        <div className="flex justify-center">
            <button 
                type="button"
                onClick={openModal}
                disabled={myProp.item.used}
                className={`w-14 h-14 flex flex-col items-center justify-center font-semibold rounded-lg transition 
                    ${myProp.item.used ? "bg-gray-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-500"} 
                    text-white shadow-md`}
            >
                <FaChair className="mb-1" />
                {myProp.item.seat_number}
            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b bg-sky-100">
                        <h1 className="font-semibold text-lg flex items-center gap-2">
                            <FaChair /> Identitas Penumpang
                        </h1>
                        <button type="button" onClick={closeModal} className="text-red-500 hover:text-red-700">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        <div>
                            <small className="text-xs font-semibold text-sky-500">Nomor Kursi</small>
                            <p className="font-semibold text-lg">{myProp.item.seat_number}</p>
                        </div>
                        <div>
                            <small className="text-xs font-semibold text-sky-500">NIK Penumpang</small>
                            <input type="number" required onChange={e => setPassangerId(e.target.value)}
                                className="w-full border p-2 rounded-md text-sm" />
                        </div>
                        <div>
                            <small className="text-xs font-semibold text-sky-500">Nama Penumpang</small>
                            <input type="text" required onChange={e => setPassangerName(e.target.value)}
                                className="w-full border p-2 rounded-md text-sm" />
                        </div>
                    </div>
                    <div className="p-4 flex justify-end gap-2 border-t">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md flex items-center gap-2">
                            <FaTimes /> Close
                        </button>
                        <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md flex items-center gap-2">
                            <FaSave /> Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Seat
