import { KursiType } from "../../types"
import DropSeat from "./dropSeat"
import EditSeat from "./editSeat"

type props = {
    item: KursiType
}
const Seat = (myProp:props) => {
    return (
        <div className="relative">
            <div className="top-0 left-0 absolute">
                <EditSeat item={myProp.item} />
            </div>
            <div className="top-0 right-0 absolute">
                <DropSeat item={myProp.item} />
            </div>
            <div className="size-20 rounded-sm flex items-center justify-center bg-sky-900">
                <span className="text-white font-semibold">
                    {myProp.item.seat_number}
                </span>
            </div>
        </div>
    )
}

export default Seat