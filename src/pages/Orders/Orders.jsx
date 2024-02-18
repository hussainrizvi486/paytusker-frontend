/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useGetCustomerOrdersQuery } from "../../features/api/api"
import { Header, Navbar } from "../../layouts"
import { Freeze } from "../../components"
import { FormatCurreny } from "../../utils"
import { UserSidebar } from "../../layouts"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"


const Orders = () => {
  const OrderQuery = useGetCustomerOrdersQuery()
  const [orders, setOrdersData] = useState([])

  useEffect(() => {
    setOrdersData(OrderQuery.data)

  }, [OrderQuery])


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
            {OrderQuery.isLoading ? <OrderCardLoading  skeleton_count={1} /> :
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