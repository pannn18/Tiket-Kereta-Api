"use client"
import { removeCookies } from "@/helper/client-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type props = {
    children: ReactNode
}
const EmployeeTemplate = (myProp: props) => {
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const handleLogout = () => {
        removeCookies(`token`)
        router.replace(`/`)
    }

    return (
        <div className="w-dvw min-h-screen bg-slate-100">
            {/* header section */}
            <header className="flex items-center gap-3 w-full p-3 bg-blue-900 shadow-md">
                <button
                    type="button"
                    onClick={() => setShow(true)}
                    className="size-8 rounded-full flex justify-center items-center bg-blue-600 hover:bg-blue-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                        viewBox="0 0 24 24" strokeWidth={1.5} 
                        stroke="currentColor" className="size-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-white">
                    KeretaGo
                </h1>
            </header>

            {/* overlay + sidebar */}
            <AnimatePresence>
                {show && (
                    <>
                        {/* overlay gelap */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShow(false)}
                        />

                        {/* sidebar */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-0 left-0 w-3/4 md:w-1/3 lg:w-1/4 h-full bg-slate-800 shadow-xl p-5 z-50"
                        >
                            {/* brand section */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2 text-white font-bold text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                                        viewBox="0 0 24 24" strokeWidth={1.5} 
                                        stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                                    </svg>
                                    KeretaGo
                                </div>
                                <div
                                    className="cursor-pointer text-2xl text-white"
                                    onClick={() => setShow(false)}
                                >
                                    &times;
                                </div>
                            </div>

                            {/* menu section */}
                            <div className="flex flex-col gap-2">
                                <Link href={`/karyawan/kereta`} className="rounded-md text-white p-3 font-semibold hover:bg-blue-700 transition">
                                    Data Kereta
                                </Link>
                                <Link href={`/karyawan/admin`} className="rounded-md text-white p-3 font-semibold hover:bg-blue-700 transition">
                                    Data Admin
                                </Link>
                                <Link href={`/karyawan/pelanggan`} className="rounded-md text-white p-3 font-semibold hover:bg-blue-700 transition">
                                    Data Pelanggan
                                </Link>
                                <Link href={`/karyawan/jadwal`} className="rounded-md text-white p-3 font-semibold hover:bg-blue-700 transition">
                                    Jadwal
                                </Link>
                                <div
                                    className="rounded-md text-white p-3 font-semibold bg-red-600 hover:bg-red-500 cursor-pointer transition"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className="p-5">{myProp.children}</main>
        </div>
    )
}
export default EmployeeTemplate
