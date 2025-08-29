"use client";

import Modal from "@/components/Modal";
import axiosInstance from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { ScheduleType } from "../types";
import { FaEdit, FaClock, FaMapMarkerAlt, FaMoneyBill } from "react-icons/fa";

type props = {
  schedule: ScheduleType;
};

const EditSchedule = ({ schedule }: props) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [departured_location, setDeparturedLocation] = useState("");
  const [arrived_location, setArrivedLocation] = useState("");
  const [departured_time, setDeparturedTime] = useState(new Date());
  const [arrived_time, setArrivedTime] = useState(new Date());
  const [price, setPrice] = useState(0);

  const openModal = () => {
    setShow(true);
    setDeparturedLocation(schedule.departured_location);
    setArrivedLocation(schedule.arrived_location);
    setDeparturedTime(new Date(schedule.departured_time));
    setArrivedTime(new Date(schedule.arrived_time));
    setPrice(schedule.price);
  };

  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const TOKEN = getCookie("token");
      const url = `/schedule/${schedule.id}`;
      const requestData = { departured_location, departured_time, arrived_location, arrived_time, price };

      const response: any = await axiosInstance.put(url, requestData, {
        headers: { authorization: `Bearer ${TOKEN}` },
      });

      toast(response.data.message, {
        containerId: "toastEditJadwal",
        type: response.data.success ? "success" : "warning",
      });

      if (response.data.success) {
        setShow(false);
        setTimeout(() => router.refresh(), 1000);
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong", { containerId: "toastEditJadwal", type: "error" });
    }
  };

  const inputClass =
    "w-full p-2 border border-gray-200 rounded-md outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-300 transition-all";

  return (
    <div>
      <ToastContainer containerId="toastEditJadwal" />
      <button
        onClick={openModal}
        className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-md transition"
      >
        <FaEdit /> Edit Schedule
      </button>

      <Modal isShow={show}>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 p-4 text-white">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FaEdit /> Edit Jadwal
            </h2>
            <p className="text-sm opacity-90 mt-1">Pastikan data diisi dengan benar</p>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            <InputField label="Berangkat dari" icon={<FaMapMarkerAlt />} value={departured_location} onChange={setDeparturedLocation} />
            <InputDate label="Waktu Keberangkatan" icon={<FaClock />} value={departured_time} onChange={setDeparturedTime} />
            <InputField label="Tiba di" icon={<FaMapMarkerAlt />} value={arrived_location} onChange={setArrivedLocation} />
            <InputDate label="Waktu Kedatangan" icon={<FaClock />} value={arrived_time} onChange={setArrivedTime} />
            <InputField label="Harga" icon={<FaMoneyBill />} type="number" value={price.toString()} onChange={(val) => setPrice(Number(val))} />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 bg-gray-50">
            <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">
              Close
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Reusable Input Field
interface InputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  icon?: React.ReactNode;
}
const InputField = ({ label, value, onChange, type = "text", icon }: InputProps) => (
  <div className="flex flex-col border rounded-md p-2">
    <label className="flex items-center gap-2 text-sky-600 font-semibold text-sm">{icon} {label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required className="mt-1 p-2 border-b-2 border-transparent focus:border-b-sky-600 outline-none transition" />
  </div>
);

interface InputDateProps {
  label: string;
  value: Date;
  onChange: (val: Date) => void;
  icon?: React.ReactNode;
}
const InputDate = ({ label, value, onChange, icon }: InputDateProps) => (
  <div className="flex flex-col border rounded-md p-2">
    <label className="flex items-center gap-2 text-sky-600 font-semibold text-sm">{icon} {label}</label>
    <DatePicker selected={value} onChange={(date) => onChange(date || new Date())} showTimeInput dateFormat="dd MMMM yyyy HH:mm" className="mt-1 p-2 border-b-2 border-transparent w-full focus:border-b-sky-600 outline-none transition" />
  </div>
);

export default EditSchedule;
