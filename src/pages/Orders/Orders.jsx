/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useGetCustomerOrdersQuery, useGetUserDetailsQuery } from "../../features/api/api"
import { Header, Navbar } from "../../layouts"
import { Freeze } from "../../components"
import { FormatCurreny } from "../../utils"
import { UserSidebar } from "../../layouts"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"


const Orders = () => {
  // const OrderQuery = useGetCustomerOrdersQuery()

  const [OrderQuery, setQ] = useState({
    isLoading: true
  })

  const [orders, setOrdersData] = useState([
    {
      "order_id": "ORD-09909-3ADM4-09456",
      "grand_total": 1129.7,
      "total_qty": 2,
      "order_date": "2024-02-17",
      "delivery_date": "2024-02-17",
      "payment_status": false,
      "payment_method": "004",
      "delivery_status": false,
      "order_status": "001",
      "items": [
        {
          "product_name": "Infant-Toddler Book Display",
          "cover_image": "https://crm.paytusker.us/files/wb1858.2.jpg",
          "rate": 258.7,
          "qty": 1,
          "amount": 258.7
        }
      ]
    },
    {
      "order_id": "7166918228290215936",
      "grand_total": 143,
      "total_qty": 1,
      "order_date": "2024-02-24",
      "delivery_date": "2024-02-24",
      "payment_status": false,
      "payment_method": "003",
      "delivery_status": false,
      "order_status": "001",
      "items": [
        {
          "product_name": "Dee Ocleppo Galant Classic Shoe",
          "cover_image": "https://crm.paytusker.us/files/IMG_0587.webp",
          "rate": 143,
          "qty": 1,
          "amount": 143
        }
      ]
    },
    {
      "order_id": "7166918621392969728",
      "grand_total": 143,
      "total_qty": 1,
      "order_date": "2024-02-24",
      "delivery_date": "2024-02-24",
      "payment_status": false,
      "payment_method": "003",
      "delivery_status": false,
      "order_status": "001",
      "items": [
        {
          "product_name": "Dee Ocleppo Galant Classic Shoe",
          "cover_image": "https://crm.paytusker.us/files/IMG_0587.webp",
          "rate": 143,
          "qty": 1,
          "amount": 143
        }
      ]
    },
    {
      "order_id": "7166918741148737536",
      "grand_total": 143,
      "total_qty": 1,
      "order_date": "2024-02-24",
      "delivery_date": "2024-02-24",
      "payment_status": false,
      "payment_method": "004",
      "delivery_status": false,
      "order_status": "001",
      "items": [
        {
          "product_name": "Dee Ocleppo Galant Classic Shoe",
          "cover_image": "https://crm.paytusker.us/files/IMG_0587.webp",
          "rate": 143,
          "qty": 1,
          "amount": 143
        }
      ]
    },
    {
      "order_id": "7166918789559394304",
      "grand_total": 143,
      "total_qty": 1,
      "order_date": "2024-02-24",
      "delivery_date": "2024-02-24",
      "payment_status": false,
      "payment_method": "",
      "delivery_status": false,
      "order_status": "001",
      "items": [
        {
          "product_name": "Dee Ocleppo Galant Classic Shoe",
          "cover_image": "https://crm.paytusker.us/files/IMG_0587.webp",
          "rate": 143,
          "qty": 1,
          "amount": 143
        }
      ]
    },
    {
      "order_id": "7166919533951885312",
      "grand_total": 143,
      "total_qty": 1,
      "order_date": "2024-02-24",
      "delivery_date": "2024-02-24",
      "payment_status": false,
      "payment_method": "",
      "delivery_status": false,
      "order_status": "001",
      "items": [
        {
          "product_name": "Dee Ocleppo Galant Classic Shoe",
          "cover_image": "https://crm.paytusker.us/files/IMG_0587.webp",
          "rate": 143,
          "qty": 1,
          "amount": 143
        }
      ]
    }
  ])

  useEffect(() => {


    setTimeout(() => {
      setQ((prev) => prev.isLoading = false)
    }, 2000);
    // setOrdersData(OrderQuery.data)

  }, [])


  return (
    <div>
      <Header />
      <div className="sidebar-page">
        <UserSidebar />
        <div className="sidebar-page__content">
          <div className="heading-md">
            Your Orders
          </div>

          {/* <OrderCardLoading  skeleton_count={1} /> */}
          <main className="order-page-main">
            {OrderQuery.isLoading ? <OrderCardLoading skeleton_count={1} /> :
              OrderQuery.data?.length && !OrderQuery.isLoading === 0 ? <><NoOrders /></> :
                orders?.map((val, index) => (
                  <OrdersCard key={index}
                    data={val} />
                ))}


          </main>
        </div>
      </div>
    </div>
  )
}

export default Orders

const NoOrders = () => {
  return (
    <div className="flex-center">
      <div className="my-5">
        <div className="text-center">Currently, there are no orders placed.</div>
        <div className="flex-center my-2">
          <Link to={"/"}>
            <button className="btn btn-primary btn-sm">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  )
}


const OrdersCard = ({ data }) => {
  return (
    <div className="order-card">
      <div>
        <div>
          <span className="font-semibold">ORDER ID:</span> {data?.order_id}</div>
        <div className="order-status mt-1">
          Delivered
        </div>

        <div className="my-2">
          <div className="text-sm font-semibold">
            <span >Total Amount: </span>
            {FormatCurreny(data?.grand_total)}</div>
          <div className="text-sm font-semibold">
            <span className="text-sm">Total Qty: </span>
            {data?.total_qty}</div>
        </div>

      </div>
      <div>
        {data?.items?.map((val, index) => <OrderItemCard key={index} itemData={val} />)}
      </div>
    </div>
  )
}

const OrderItemCard = ({ itemData }) => {
  return (
    <div className="order-item__card">
      <div className="order-item__card-img">
        <img src={itemData?.cover_image || ""} alt="" />
      </div>

      <div className="order-item__card-details">
        <div className="order-item-card-detail__left">
          <div className="text-sm order-item__card-name">{itemData?.product_name}</div>
          <div className="text-sm font-semibold order-item__card-rate">{FormatCurreny(itemData?.rate)}</div>
        </div>

        <div className="order-item-card-detail__right">
          <div className="text-sm order-item__card-qty">
            {/* <div className="text-sm font-semibold">Quantity </div> */}
            {itemData?.qty}
          </div>

          <div className="text-sm order-item__card-amount">
            <div>
              {/* <div className="text-sm font-semibold ">Amount </div> */}
              <span className="font-semibold">
                {FormatCurreny(itemData?.amount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const OrderCardLoading = ({ skeleton_count = 1 }) => {
  let count_arr = []
  for (let i = 0; i < skeleton_count; i++) {
    count_arr.push(i)
  }

  return (
    <>
      {count_arr.map(i =>
      (<div
        key={i}
        className="order-card">
        <Skeleton count={4} />
        <br />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </div>)
      )}

    </>
  )
}