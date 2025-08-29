import { User } from "../types";
import { getServerCookie } from "@/helper/server-cookie";
import axiosInstance from "@/helper/api";
import Pelanggan from "./pelanggan";
import AddPelanggan from "./addpelanggan";

// function to get all pelanggan
const getUser = async (): Promise<User[]> => {
    try {
        const token = await getServerCookie(`token`);
        const url = `/customer`;
        const response: any = await axiosInstance.get(url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (response.data.success === true) return response.data.data;
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

const PelangganPage = async () => {
    const dataPelanggan = await getUser();

    return (
        <div className="w-full min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Header */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow-md flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-blue-800">DATA PELANGGAN</h1>
                    <span className="text-sm text-gray-600">
                        Halaman ini memuat data pelanggan
                    </span>
                </div>
                <div className="mt-3 md:mt-0">
                    <AddPelanggan />
                </div>
            </div>

            {/* List Pelanggan */}
            <div className="grid gap-4">
                {dataPelanggan.map((pelanggan, index) => (
                    <Pelanggan
                        item={pelanggan}
                        key={`pelanggan-${index}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PelangganPage;
