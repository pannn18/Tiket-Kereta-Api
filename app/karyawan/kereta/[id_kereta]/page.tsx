/** function to call detail kereta
 * that include gerbong dan kursi
 */

import { getServerCookie } from "@/helper/server-cookie";
import { keretaType } from "../../types";
import axiosInstance from "@/helper/api";
import Gerbong from "./Gerbong";
import AddGerbong from "./addGerbong";


const getDetailKereta = async (id_kereta: string): Promise<keretaType | null> => {
    try {
        const TOKEN = await getServerCookie(`token`)
        const url = `/train/${id_kereta}`
        // hit endpoint
        const response: any = await axiosInstance.get(url, {
            headers:{
                authorization: `Bearer ${TOKEN}`
            }
        })
        if (response.data.success === true) {
            return response.data.data
        } 
        return null
    } catch (error) {
        console.error(error);
        return null;
    }
} 

type props = {
    params : Promise<{
        id_kereta: string
        // sesuai dengan nama foldernya
    }>
}

const DetailKeretaPage = async (myProp: props) => {
    // get value of selected "id_kereta"
    const id_kereta = (await myProp.params).id_kereta
    /** get data from backend */
    const dataKereta = await getDetailKereta(id_kereta)
    return (
        <div className="w-full p-3">
            {
                dataKereta == null ? 
                <div className="bg-yellow-100 rounded-md p-3">
                    <h1 className="text-lg font-semibold">
                        Informasi
                    </h1>
                    <p className="text-sm text-slate-500">
                        Data tidak ditemukan
                    </p>
                </div>
                :
                <div>
                    <h1 className="text-lg font-semibold">
                        {dataKereta.name}
                    </h1>
                    <p className="text-sm text-slate-500">
                        {dataKereta.descriptions}
                    </p>
                    <h2 className="text-base font-medium pb-2">
                        Daftar Gerbong
                    </h2>
                        <AddGerbong id_kereta={Number(id_kereta)} />
                    <div className="my-5">
                        {/* mapping data gerbong */}
                        {
                            dataKereta.wagons.map((gerbong, index) => (
                                <Gerbong item={gerbong} 
                                    key={`keyGerbong-${index}`} 
                                />
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default DetailKeretaPage