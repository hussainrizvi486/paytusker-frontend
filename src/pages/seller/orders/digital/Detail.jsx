import { CircleDashed, CircleDotDashed, Truck, Box, Anchor, BadgeCheck } from "lucide-react"

const Detail = () => {

    const statusDisplay = [
        { label: "Order Placed", status: "compeleted", icon: <Box /> },
        { label: "Packed", status: "pending", icon: <CircleDotDashed /> },
        { label: "Shipping ", status: "pending", icon: <Anchor />, comments: "Order cancelled by the customer" },
        { label: "Out For Delivery", status: "cancel", icon: <Truck /> },
        { label: "Delivered", status: "draft", icon: <BadgeCheck /> },
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
                    {statusDisplay.map((val, i) => <OrderTimeLine key={i}{...val} />)}
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



const OrderTimeLine = ({ icon, label, comments, status }) => {
    return <div className="timeline-item">
        <header className="timeline-head">
            <div className={`timeline-icon__wrapper ${status}`}>
                {icon || <CircleDashed />}
            </div>
            <div className="font-semibold text-sm fm-poppins">{label}</div>
        </header>

        <main className="timelime-content">
            {comments}
        </main>
    </div>
}