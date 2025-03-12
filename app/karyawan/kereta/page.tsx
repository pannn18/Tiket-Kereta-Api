import { keretaType } from "../types";
import { getServerCookie } from "@/helper/server-cookie";
import axiosInstance from "@/helper/api";
import Train from "./train";
import AddKereta from "./addkereta";
export const dynamic = "force-dynamic";

// function to get all data kereta
const getKereta = async () : Promise<keretaType[]> => {
    try {
        // get token from cookie
        const token = await getServerCookie(`token`)
        const url=`/train`
        // hit end point
        const response:any =await axiosInstance.get(url,{
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
const KeretaPage = async () => {
    // call function to load data kereta from back end
    const  dataKereta = await getKereta()
    return(
        <div className=" w-full p-5 bg-white">
            <h1 className="text-xl font-semibold ">DATA KERETA</h1>
            <span className="text-sm">Halaman ini memuat daftar kereta api yang tersedia </span>
            <div className=" my-3">
                <AddKereta/>
                {
                    dataKereta.map((kereta, index) => (
                        <Train
                        item={kereta}
                        key={`kereta-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}
export default KeretaPage
