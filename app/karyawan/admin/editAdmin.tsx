"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Modal from "@/components/Modal";
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import { AdminType } from "../types";

type props = {
  admin: AdminType
}

const EditAdmin = (myProp: props) => {
  const [nik, setNik] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [show, setShow] = useState<boolean>(false)
  const router = useRouter()

  const openModal = () => {
    setShow(true)
    setNik(myProp.admin.nik)
    setName(myProp.admin.name)
    setAddress(myProp.admin.address)
    setPhone(myProp.admin.phone)
  }

  const closeModal = () => {
    setShow(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const TOKEN = getCookie(`token`);
      const url = `/employee/${myProp.admin.id}`;
      const requestData = { nik, name, address, phone }

      const response: any = await axiosInstance.put(url, requestData, {
        headers: { authorization: `Bearer ${TOKEN}` }
      })

      const message = response.data.message
      if (response.data.success === true) {
        toast(message, {
          containerId: `toastEdit-${myProp.admin.id}`,
          type: `success`
        })
        setShow(false)
        setTimeout(() => router.refresh(), 1000)
      } else {
        toast(message, {
          containerId: `toastEdit-${myProp.admin.id}`,
          type: `warning`
        })
      }
    } catch (error) {
      console.log(error)
      toast(`Something went wrong`, { containerId: `toastEdit-${myProp.admin.id}`, type: `error` })
    }
  }

  return (
    <div>
      <ToastContainer containerId={`toastEdit-${myProp.admin.id}`} />
      {/* tombol edit */}
      <button
        type="button"
        className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition"
        onClick={() => openModal()}
      >
        <svg xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
          strokeWidth={1.5} stroke="currentColor"
          className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>

      {/* modal */}
      <Modal isShow={show}>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* header */}
          <div className="w-full p-4 border-b">
            <h1 className="font-semibold text-lg text-gray-800">
              Edit Data Admin
            </h1>
            <p className="text-sm text-gray-500">
              Pastikan data yang diisi sudah benar
            </p>
          </div>

          {/* body */}
          <div className="w-full p-4 space-y-4">
            <div>
              <label htmlFor={`nik-${myProp.admin.id}`} className="block text-sm font-medium text-gray-700">NIK</label>
              <input
                type="text"
                id={`nik-${myProp.admin.id}`}
                value={nik}
                onChange={e => setNik(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor={`name-${myProp.admin.id}`} className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                id={`name-${myProp.admin.id}`}
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor={`address-${myProp.admin.id}`} className="block text-sm font-medium text-gray-700">Alamat</label>
              <input
                type="text"
                id={`address-${myProp.admin.id}`}
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor={`phone-${myProp.admin.id}`} className="block text-sm font-medium text-gray-700">Telepon</label>
              <input
                type="text"
                id={`phone-${myProp.admin.id}`}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          {/* footer */}
          <div className="w-full p-4 border-t flex justify-end gap-2">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-400 text-white transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default EditAdmin;
