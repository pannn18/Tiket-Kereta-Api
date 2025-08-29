import { keretaType } from "../types";
import { getServerCookie } from "@/helper/server-cookie";
import axiosInstance from "@/helper/api";
import Train from "./train";
import AddKereta from "./addkereta";
import { FaTrain } from "react-icons/fa"; // <-- ICON kereta

export const dynamic = "force-dynamic";

// function to get all data kereta
const getKereta = async (): Promise<keretaType[]> => {
  try {
    const token = await getServerCookie(`token`);
    const url = `/train`;
    const response: any = await axiosInstance.get(url, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    if (response.data.success == true) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const KeretaPage = async () => {
  const dataKereta = await getKereta();

  return (
    <div className="min-h-screen w-full p-5 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-600">
          <FaTrain className="text-blue-500" /> DATA KERETA
        </h1>
        <span className="text-sm text-gray-600">
          Halaman ini memuat daftar kereta api yang tersedia
        </span>

        <div className="my-4">
          <AddKereta />
          <div className="grid gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {dataKereta.map((kereta, index) => (
              <Train item={kereta} key={`kereta-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeretaPage;
