"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { FaTrain, FaAlignLeft, FaListUl } from "react-icons/fa"
import { motion } from "framer-motion"

const AddKereta = () => {
  const [name, setName] = useState<string>("")
  const [descriptions, setDescriptions] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [show, setShow] = useState<boolean>(false)
  const router = useRouter()

  const openModal = () => {
    setShow(true)
    setName("")
    setDescriptions("")
    setType("")
  }

  const closeModal = () => {
    setShow(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const TOKEN = getCookie(`token`)
      const url = `/train`
      const requestData = { name, descriptions, type }

      const response: any = await axiosInstance.post(url, requestData, {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })

      const message = response.data.message
      if (response.data.success === true) {
        toast(message, {
          containerId: `toastAdd`,
          type: "success",
        })
        setShow(false)
        setTimeout(() => router.refresh(), 1000)
      } else {
        toast(message, {
          containerId: `toastAdd`,
          type: "warning",
        })
      }
    } catch (error) {
      console.log(error)
      toast(`Something went wrong`, {
        containerId: `toastAdd`,
        type: "error",
      })
    }
  }

  return (
    <div>
      <ToastContainer containerId={`toastAdd`} />
      <button
        type="button"
        onClick={openModal}
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-90 shadow-md text-white font-semibold flex items-center gap-2"
      >
        <FaTrain /> Tambah Data Kereta
      </button>

      <Modal isShow={show}>
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="w-full p-4 bg-gradient-to-r from-sky-600 to-blue-500 text-white">
            <h1 className="font-bold text-lg">Tambah Data Kereta</h1>
            <span className="text-sm opacity-80">
              Pastikan data yang diisi sudah benar
            </span>
          </div>

          {/* Body */}
          <div className="w-full p-5 space-y-4">
            <div className="flex items-center border rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-sky-500">
              <FaTrain className="text-sky-600 mr-2" />
              <input
                type="text"
                placeholder="Nama Kereta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 outline-none"
              />
            </div>
            <div className="flex items-center border rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-sky-500">
              <FaAlignLeft className="text-sky-600 mr-2" />
              <input
                type="text"
                placeholder="Deskripsi Kereta"
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
                required
                className="flex-1 outline-none"
              />
            </div>
            <div className="flex items-center border rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-sky-500">
              <FaListUl className="text-sky-600 mr-2" />
              <input
                type="text"
                placeholder="Tipe Kereta"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="w-full p-4 bg-gray-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md"
            >
              Save
            </button>
          </div>
        </motion.form>
      </Modal>
    </div>
  )
}

export default AddKereta
