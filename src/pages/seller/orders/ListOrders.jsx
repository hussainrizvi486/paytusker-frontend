import { Pagination } from "../../../components"
import { Header } from "../../../layouts"

const OrdersData = [
    {
        "Order": 1001,
        "Date": "2024-06-01",
        "Customer": "John Doe",
        "Total": 150.75,
        "Payment": "Credit Card",
        "Item": "Laptop",
        "Items": [
            {
                "ItemName": "Laptop",
                "Qty": 1,
                "Rate": 150.75,
                "Amount": 150.75
            }
        ]
    },
    {
        "Order": 1002,
        "Date": "2024-06-02",
        "Customer": "Jane Smith",
        "Total": 89.99,
        "Payment": "Paypal",
        "Item": "Wireless Headphones",
        "Items": [
            {
                "ItemName": "Gaming Mouse",
                "Qty": 1,
                "Rate": 60.00,
                "Amount": 60.00
            },
            {
                "ItemName": "Fitness Tracker",
                "Qty": 1,
                "Rate": 75.20,
                "Amount": 75.20
            },
            {
                "ItemName": "Smartwatch",
                "Qty": 1,
                "Rate": 120.00,
                "Amount": 120.00
            },
            {
                "ItemName": "Wireless Headphones",
                "Qty": 1,
                "Rate": 89.99,
                "Amount": 89.99
            }
        ]
    },
    {
        "Order": 1003,
        "Date": "2024-06-03",
        "Customer": "Mike Johnson",
        "Total": 45.50,
        "Payment": "Debit Card",
        "Item": "Bluetooth Speaker",
        "Items": [
            {
                "ItemName": "Bluetooth Speaker",
                "Qty": 1,
                "Rate": 45.50,
                "Amount": 45.50
            }
        ]
    },
    {
        "Order": 1004,
        "Date": "2024-06-04",
        "Customer": "Emily Davis",
        "Total": 120.00,
        "Payment": "Credit Card",
        "Item": "Smartwatch",
        "Items": [
            {
                "ItemName": "Smartwatch",
                "Qty": 1,
                "Rate": 120.00,
                "Amount": 120.00
            }
        ]
    },
    {
        "Order": 1005,
        "Date": "2024-06-05",
        "Customer": "David Wilson",
        "Total": 75.20,
        "Payment": "Cash",
        "Item": "Fitness Tracker",
        "Items": [
            {
                "ItemName": "Gaming Mouse",
                "Qty": 1,
                "Rate": 60.00,
                "Amount": 60.00
            },
            {
                "ItemName": "Fitness Tracker",
                "Qty": 1,
                "Rate": 75.20,
                "Amount": 75.20
            },
            {
                "ItemName": "Smartwatch",
                "Qty": 1,
                "Rate": 120.00,
                "Amount": 120.00
            }
        ]
    },
    {
        "Order": 1006,
        "Date": "2024-06-06",
        "Customer": "Anna Brown",
        "Total": 230.99,
        "Payment": "Credit Card",
        "Item": "Tablet",
        "Items": [
            {
                "ItemName": "Tablet",
                "Qty": 1,
                "Rate": 230.99,
                "Amount": 230.99
            }
        ]
    },
    {
        "Order": 1007,
        "Date": "2024-06-07",
        "Customer": "James Taylor",
        "Total": 60.00,
        "Payment": "Credit Card",
        "Item": "Gaming Mouse",
        "Items": [
            {
                "ItemName": "Gaming Mouse",
                "Qty": 1,
                "Rate": 60.00,
                "Amount": 60.00
            }
        ]
    },
    {
        "Order": 1008,
        "Date": "2024-06-08",
        "Customer": "Laura Martin",
        "Total": 145.00,
        "Payment": "Paypal",
        "Item": "External Hard Drive",
        "Items": [
            {
                "ItemName": "External Hard Drive",
                "Qty": 1,
                "Rate": 145.00,
                "Amount": 145.00
            },
            {
                "ItemName": "Monitor",
                "Qty": 1,
                "Rate": 210.45,
                "Amount": 210.45
            }
        ]
    },
    {
        "Order": 1009,
        "Date": "2024-06-09",
        "Customer": "Robert Lee",
        "Total": 210.45,
        "Payment": "Debit Card",
        "Item": "Monitor",
        "Items": [
            {
                "ItemName": "Keyboard",
                "Qty": 1,
                "Rate": 89.99,
                "Amount": 89.99
            },
            {
                "ItemName": "External Hard Drive",
                "Qty": 1,
                "Rate": 145.00,
                "Amount": 145.00
            },
            {
                "ItemName": "Monitor",
                "Qty": 1,
                "Rate": 210.45,
                "Amount": 210.45
            }
        ]
    },
    {
        "Order": 1010,
        "Date": "2024-06-10",
        "Customer": "Sarah Harris",
        "Total": 89.99,
        "Payment": "Credit Card",
        "Item": "Keyboard",
        "Items": [
            {
                "ItemName": "Keyboard",
                "Qty": 1,
                "Rate": 89.99,
                "Amount": 89.99
            },
            {
                "ItemName": "Monitor",
                "Qty": 1,
                "Rate": 210.45,
                "Amount": 210.45
            }
        ]
    }
]

const ListOrders = () => {
    const statusArray = ["Cancelled", "Declined", "Refunded", "Completed", "Pending",]
    return (
        <div>
            <Header />
            <div className="list-view-main">
                <div className="list-view__heading">My Orders</div>
                <br />
                <div>
                    <div className="orders-dasbord__grid">
                        <div className="orders-dasbord__grid-card">
                            <div className="font-medium">
                                <div>All</div>
                                <div className="mt-1">90</div>
                            </div>
                        </div>
                        <div className="orders-dasbord__grid-card">
                            <div className="font-medium">
                                <div>All</div>
                                <div className="mt-1">90</div>
                            </div>
                        </div>
                        <div className="orders-dasbord__grid-card">
                            <div className="font-medium">
                                <div>All</div>
                                <div className="mt-1">90</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1 order-status__filter-row">
                        {statusArray.map(val => <div className="order-status__filter-card" key={val}>{val}</div>)}
                    </div>


                    <div className="data-grid data-grid--full data-grid--border ">
                        <div className="data-row data-row--head">
                            <div className="data-cell">Order</div>
                            <div className="data-cell">Date</div>
                            <div className="data-cell">Customer</div>
                            <div className="data-cell text-right">Total</div>
                            <div className="data-cell  text-right">Items</div>
                            <div className="data-cell">Payment</div>
                        </div>
                        {OrdersData.map((val, index) => (
                            <div key={index} className="data-row">
                                <div className="data-cell">{val.Order}</div>
                                <div className="data-cell">{val.Date}</div>
                                <div className="data-cell">{val.Customer}</div>
                                <div className="data-cell text-right">{val.Total}</div>
                                <div className="data-cell  text-right">{val.Items.length}</div>
                                <div className="data-cell">{val.Payment}</div>
                            </div>))}
                    </div>


                    <div className="list-view__pagination">
                        <Pagination pageCount={10} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ListOrders