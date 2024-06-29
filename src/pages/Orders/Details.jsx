import { ClipboardCheck, MapPin, Package, Truck } from "lucide-react"
import { Navbar } from "../../layouts"



const Details = () => {
    const OrderTimeLineStatus = [
        { "icon": <Package className="icon-md" />, "name": "Order Processing" },
        { "icon": <ClipboardCheck className="icon-md" />, "name": "Order Confirmed" },
        { "icon": <Truck className="icon-md" />, "name": "Going For Delivery" },
        { "icon": <MapPin className="icon-md" />, "name": "Delivered" },
    ]

    return (
        <>
            <Navbar title="Order Details"
            />
            <main className="order-detail-page">
                <header className="order-detail__header">
                    <div className="font-bold">ORDER ID: #035245ABC</div>
                    <div className="text-sm my-2">
                        <div>Order Date: 05/05/24</div>
                        <div>Delivery Date: 03/06/24</div>
                    </div>
                    <div className="timeline-status__wrapper">
                        {OrderTimeLineStatus.map((val, i) => (<OrderStatusBox
                            index={i}
                            key={i} data={val} />))}
                    </div>
                </header>
                <div className="mt-4">
                    <div className="font-bold">Items Ordered</div>
                    <div className="order-detail__items-wrapper">
                        <div className="order-detail__items-row">
                            <div className="order-detail__items-col">
                                <div className="order-detail__item-info">
                                    <img src="https://m.media-amazon.com/images/I/6105amhSy4L._AC_SL1500_.jpg" />
                                    <div className="text-sm">TOOBUR Smart Watch for Women Alexa Built-in, 1,95 Fitness Tracker with</div>
                                </div>
                            </div>
                            <div className="order-detail__items-col ">
                                <div className="text-right font-medium font-bold">$19.00</div>
                            </div>
                        </div>
                    </div>


                    <div className=" mt-4 font-bold">
                        <div className="flex-between ">
                            <div>Subtal</div>
                            <div className="text-right">3 items</div>
                        </div>
                        <div className="flex-between font-bold ">
                            <div>Shipping Amount</div>
                            <div className="text-right">$10,00</div>
                        </div>
                        <div className="flex-between font-bold ">
                            <div>Total Amount</div>
                            <div className="text-right">$90,00</div>
                        </div>
                    </div>

                    <div className="text-sm font-bold mt-9 flex-between">
                        <div>Payment Method</div>
                        <div>Credit/Debit Card</div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Details

const OrderStatusBox = ({ data, index }) => {

    return (
        <div className="timeline-box order-status__box flex-align-center gap">
            <div className="timeline-box__icon-wrapper">
                {data?.icon}
            </div>
            <div className="font-medium order text-sm">{data?.name}</div>
        </div>
    )
}