import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Skeleton from "react-loading-skeleton";

import { useGetCustomerOrdersQuery } from "../../api";
import { Header } from "../../layouts";
import { FormatCurreny } from "../../utils";
import { UserSidebar } from "../../layouts";
import { Pagination } from "../../components";


const Orders = () => {
  const ORDER_STATUS_OBJECT = [
    { status: 'Select', code: '' },
    { status: 'Pending', code: '001' },
    { status: 'Confirmed', code: '002' },
    { status: 'In Process', code: '003' },
    { status: 'Going For Delivery', code: '004' },
    { status: 'Delivered', code: '005' },
    { status: 'Cancelled', code: '006' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [orderListFilters, setOrderListFilters] = useState({});
  const OrderQuery = useGetCustomerOrdersQuery(orderListFilters);
  const [orders, setOrdersData] = useState([]);
  const [pageLoading, setPageLoading] = useState(OrderQuery.isLoading)

  const updateFilters = (key, value) => {
    if (value !== null && value !== undefined) {
      const updatedFilters = { ...orderListFilters, [key]: value };
      setPageLoading(true)
      setOrderListFilters(updatedFilters);
    }
  };


  useEffect(() => {
    if (OrderQuery.data && !OrderQuery.isFetching) {
      setOrdersData(OrderQuery.data.results);
      setPageLoading(false)
    }
  }, [OrderQuery.data, OrderQuery.isFetching]);

  useEffect(() => {
    setPageLoading(true)
    setOrderListFilters((prev) => ({ ...prev, page: currentPage }))
  }, [currentPage])
  return (
    <div>
      <Header />
      <div className="sidebar-page">
        <UserSidebar />
        <div className="sidebar-page__content">
          <div className="heading-md">My Orders</div>
          <div className="orderList-filters mt-6">
            <div className="input-box w-max-content" >
              <div className="input-box__label text-sm font-medium"> Order Status</div>
              <div className="input-box__input input-box__select">
                <select className="text-sm"
                  onChange={(e) => updateFilters("order_status", e.target.value)}
                >
                  {ORDER_STATUS_OBJECT.map((val, key) =>
                    <option key={key} value={val.code}>{val.status}</option>
                  )}
                </select>
                <ChevronDown className="input-box__select-icon" />
              </div>
            </div>
          </div>
          <main className="order-page-main">
            {pageLoading ? <OrderCardLoading skeleton_count={1} /> :
              orders?.length == 0 && !pageLoading ?
                <><NoOrders /></> :
                orders?.map((val, index) => (
                  <OrdersCard key={index}
                    data={val} />
                ))}
          </main>
          <div>
            <div className="flex-end">
              <Pagination
                handleNext={() => { if (currentPage <= OrderQuery.data?.total_pages) { setCurrentPage((prev) => prev + 1) } }}
                handlePrev={() => { if (currentPage != 1) { setCurrentPage((prev) => prev - 1) } }}
                currentPage={currentPage}
                pageCount={OrderQuery.data?.total_pages}
                setCurrentPage={(n) => setCurrentPage(n)}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders

const NoOrders = () => {
  return (
    <div className="flex-center">
      <div className="mt-10">
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
        <div className="order-status mt-1 "
          style={{ backgroundColor: data.status_color || "#000" }}
        >
          {data.order_status}
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