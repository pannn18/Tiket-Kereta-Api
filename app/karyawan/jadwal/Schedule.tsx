import { ScheduleType } from "../types"
import DropSchedule from "./dropSchecule";
import EditSchedule from "./editSchedule";

type Props = {
    item:ScheduleType
}
const showTime = (date: string) => {
    const curretDate = new Date(date);
    return curretDate
    .toLocaleDateString(
        `id-ID`,
        {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }
    )
}
const Schedule = (myProps: Props) => {
    return(
        <div className="w-full flex flex-wrap border rounded-md shadow-md my-w">
            <div className="w-full md:w-3/12 p-3 flex flex-col">
            <small className="text-xs font-semibold text-red-700">
                Berangkat dari
            </small>
            <strong>
                {myProps.item.departured_location}
            </strong>
            <small className="text-xs font-semibold text-red-700">
                Waktu Keberangkatan
            </small>
            <strong>
                {showTime(myProps.item.departured_time)}
            </strong>
            </div>
            <div className="w-full md:w-3/12 p-3 flex flex-col">
            <small className="text-xs font-semibold text-red-700">
                Tiba Di
            </small>
            <strong>
                {myProps.item.arrived_location}
            </strong>
            <small className="text-xs font-semibold text-red-700">
                Waktu Kedatangan
            </small>
            <strong>
                {showTime(myProps.item.arrived_time)}
            </strong>
            </div>
            <div className="w-full md:w-3/12 p-3 flex flex-col">
            <small className="text-xs font-semibold text-red-700">
                Unit Kereta
            </small>
            <strong>
                {myProps.item.train_details.name}
            </strong>
            <small className="text-xs font-semibold text-red-700">
                Harga
            </small>
            <strong>
                {myProps.item.price.toLocaleString(`en-US`, {style: `currency`, currency: `IDR`})}
            </strong>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <DropSchedule schedule={myProps.item}/> 
                    <EditSchedule schedule={myProps.item}/>
                </div>
            </div>
        </div>
    )
}
export default Schedule