import { CircleDashed, CircleDotDashed, Truck, Box, Anchor, BadgeCheck, UndoDot, TruckIcon } from "lucide-react";

const Detail = () => {
    // ORDER_PENDING = "001", "Order Pending"
    // ORDER_CONFIRMED = "002", "Order Confirmed"
    // IN_PROCESS = "003", "In Process"
    // SHIPPING = "004", "Shipping"
    // DELIVERED = "005", "Delivered"
    // CANCELLED = "006", "Cancelled"
    // Refunded = "007", "Refunded"
    const symbolsObject = {
        "001": <Box />,
        "002": <CircleDashed />,
        "003": <CircleDotDashed />,
        "004": <Anchor />,
        "005": <BadgeCheck />,
        "007": <UndoDot />,
    }
    const statusDisplay = [
        { label: "Order Placed", status: "compeleted", icon: <Box /> },
        { label: "Packed", status: "pending", icon: <CircleDotDashed /> },
        { label: "Shipping ", status: "pending", icon: <Anchor />, comments: "Order cancelled by the customer" },
        { label: "Out For Delivery", status: "cancel", icon: <Truck /> },
        { label: "Delivered", status: "draft", icon: <BadgeCheck /> },
    ]

    const orderTImeLine = [
        {

            "id": "001",
            "available": true,
            "status": "Pending",
            "current": true,
            "next": true,
        },
        {
            "id": "002",
            "available": true,
            "status": "Processing",
        },
        {
            "id": "007",
            "available": true,
            "status": "Completed",
        }

    ]


    return (
        <div>
            <div className="mb-6">
                <div className="text-lg font-extrabold">
                    ORDER ID # AXWXEEFC75845EX
                </div>
            </div>

            <div>
                <div className="font-bold fm-poppins">Order Status</div>
                {/* STATUS TIMELINE */}
                <div className="order-status__timeline-wrapper">

                    {orderTImeLine.map((object, i) => {
                        let classNames = "";

                        if (object.next) classNames += " next";
                        if (object.current) classNames += " active";

                        if (object.available) {
                            let propsObject = {
                                label: object.status,
                                icon: symbolsObject[object.id],
                                classNames: classNames,
                            }
                            return <OrderTimeLine {...propsObject} key={i} />
                        }
                    })}
                </div>
            </div>

            <div className="mt-4">
                <div className='font-bold fm-poppins' >
                    Customer Details
                </div>
                <div className="mt-2">
                    <div>
                        <div className='flex gap'>
                            <div>
                                <img src="https://themesbrand.com/velzon/html/modern/assets/images/users/avatar-3.jpg" alt=""
                                    style={{ width: "50px", height: "50px" }}
                                />
                            </div>
                            <div>Joseph Parkers</div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="mb-1 text-sm ">
                            <a href="mailto:josephparker@gmail.com"
                                rel="noreferrer"
                                className="font-medium"
                                target="_blank">josephparker@gmail.com</a></div>
                        <div className="mb-1 text-sm">+(256) 245451 441</div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="font-bold fm-poppins">
                    Product Details
                </div>
                <div className="order-products__table">

                    <div className="order-products__table-row">
                        <div className="row__product-detail flex-auto">
                            <div className="product-image__wrapper">
                                <img src="https://a.media-amazon.com/images/I/81HCDvaj5PL._SL1500_.jpg" alt="" />
                            </div>
                            <div className="mt-2">
                                <div className="text-sm font-medium fm-poppins" >
                                    Quicksilver (The Fae & Alchemy Series Book 1)
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="fm-poppins font-semibold">
                                $14.99
                            </div>
                        </div>
                    </div>



                </div>
            </div>


        </div>
    )
}

export default Detail



const OrderTimeLine = ({ icon, label, comments, classNames = "" }) => {
    return <div className={`timeline-item ${classNames}`} >
        <header className="timeline-head">
            <div className="timeline-dot">
                <div className="timeline-dot--inner"></div>
            </div>
            <div className="font-semibold text-sm fm-poppins flex gap align-item-center timeline-label ">{icon || <CircleDashed />} <span className="">{label}</span></div>
        </header>

        <main className="timelime-content">
            {comments}
        </main>
    </div >
}