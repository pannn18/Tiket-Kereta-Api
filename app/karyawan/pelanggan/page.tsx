import { get } from "axios";
import { User } from "../types";
import { getServerCookie } from "@/helper/server-cookie";
import axiosInstance from "@/helper/api";
import Pelanggan from "./pelanggan";
import AddPelanggan from "./addpelanggan";


// function to get all data kereta
const getUser = async () : Promise<User[]> => {
    try {
        // get token from cookie
        const token = await getServerCookie(`token`)
        const url=`/customer`
        // hit end point
        const response:any = await axiosInstance.get(url,{
            headers:{
                authorization:`bearer ${token}`
            }
        })
        if(response.data.success == true){
            return response.data.data
    }
        return[]
    } catch (error) {
        console.log(error);
        return[]
        
    }
}
const PelangganPage = async () => {
    // call function to load data kereta from back end
    const  dataPelanggan = await getUser()
    return(
        <div className=" w-full p-5 bg-white">
            <h1 className="text-xl font-semibold ">DATA PELANGGAN</h1>
            <span className="text-sm">Halaman ini memuat data pelanggan </span>
            <div className=" my-3">
                <AddPelanggan/> 
                {
                    dataPelanggan.map((pelanggan, index) => (
                        <Pelanggan
                        item={pelanggan}
                        key={`pelanggan-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}
export default PelangganPage
