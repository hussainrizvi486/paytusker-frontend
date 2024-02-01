/* eslint-disable react/prop-types */
import { Minus, Plus, Trash2 } from "lucide-react"
import { useGetCartDetailsQuery, useUpdateQtyMutation } from "../../features/api/api"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateCart } from "../../redux/slices/cartSlice"
import { useSelector } from 'react-redux'
import { Freeze } from "../../components/Loaders/Freeze"
import { FormatCurreny } from "../../utils"
import { CreateOrder } from "../../redux/actions/User"
import { Navbar } from "../../layouts"

const paymentMethods = [
    {
        image: "https://4a7efb2d53317100f611-1d7064c4f7b6de25658a4199efb34975.ssl.cf1.rackcdn.com/visa-mastercard-agree-to-give-gas-pumps-break-on-emv-shift-showcase_image-9-p-2335.jpg",
        id: "002",
        name: "Credit Card / Debit Card"
    },
    {
        image: "https://logohistory.net/wp-content/uploads/2023/08/PayPal-Logo.jpg",
        id: "003",
        name: "PayPal"
    },
    {
        name: "Binance",
        id: "004",
        image: "https://www.investopedia.com/thmb/F5w0M48xTFtv-VQE9GFpYDMA2-k=/fit-in/1500x750/filters:format(png):fill(white):max_bytes(150000):strip_icc()/Binance-0e4c4bfb014e4d9ca8f0b6e11c9db562.jpg"
    }
]



const Cart = () => {
    const { data, isLoading, isSuccess } = useGetCartDetailsQuery({});
    const [cartData, setCartData] = useState({})
    const [pageLoading, setPageLoading] = useState(isLoading)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const dispatch = useDispatch();
    const [editQty, qtyResults] = useUpdateQtyMutation();
    let cart_state = useSelector((state) => state.cart);

    const CheckoutCart = () => {
        let data = {
            "payment_method": paymentMethod
        }
        CreateOrder(data)
    }


    useEffect(() => {
        if (data && isSuccess) {
            setPageLoading(isLoading)
            const payload = {
                items: data.items, total_qty: data.total_qty, total_amount: data.total_amount,
            }
            setCartData(payload)
            dispatch(updateCart(payload));
        }

    }, [data, dispatch, cart_state, isLoading, isSuccess]);


    useEffect(() => {
        if (qtyResults.isLoading) {
            setPageLoading(qtyResults.isLoading)
        }

    }, [qtyResults])

    if (pageLoading) return <Freeze />

    return (
        <>
            <div className='cart-page'>
                {/* <Header /> */}
                <Navbar title={"Your Cart"} />

                <div className="cart-items__wrapper">
                    <div className="ci-w2">

                        <div className="cart-items__container">
                            {cartData?.items?.map((item, index) =>
                                <CartItemCard key={index}
                                    price={item.rate}
                                    qty={item.qty}
                                    name={item.product_name}
                                    image={item.cover_image}
                                    editQty={editQty}
                                    id={item.id}
                                    setPageLoading={setPageLoading}
                                />

                            )}
                        </div>
                    </div>
                </div>

                <div className="cart-summary__wrapper">
                    <OrderSummary sub_total={cartData.total_qty} total={cartData.total_amount} setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} CheckoutCart={CheckoutCart} />
                </div>
            </div>
        </>

    )
}

export default Cart

const OrderSummary = ({ total, sub_total, setPaymentMethod, paymentMethod, CheckoutCart }) => {
    return (
        <div className="cart-order-summary-container">
            <div className="order-summary__title">Order Summary</div>
            <div>
                <div className="flex-jbt-atc my-2">
                    <div>Subtotal </div><div> ({sub_total || 0} items)</div>
                </div>
                <div className="flex-jbt-atc my-2 text-lg font-semibold">
                    <div>Total</div><div>{FormatCurreny(total)}</div>
                </div>
            </div>
            <div>
                {paymentMethods.map((val, i) =>
                    <div key={i} onClick={() => setPaymentMethod(val.id)} >
                        <PaymentMethodCard
                            img={val.image}
                            name={val.name}
                            active={paymentMethod === val.id ? true : false}
                        />
                    </div>
                )}
            </div>
            <div>
                <button className="btn btn-full btn-primary or-sum-btn-checkt"
                    onClick={CheckoutCart}>
                    Checkout
                </button>
            </div>
        </div>
    )
}

export const PaymentMethodCard = ({ name, img, active }) => {
    return (
        <div className={`payment-method-card ${active ? "active" : ""}`}>
            <div className="pm-card__img-wrapper">
                <img src={img} alt="" />
            </div>

            <div className="text-sm font-bold">{name}</div>
        </div>
    )
}

const CartItemCard = ({ price, name, qty, image, id, editQty }) => {
    const updateQty = (id, action) => {
        const payload = { cart_item_id: id, action: action }
        editQty(payload)
    }
    return (
        <div className="cart-item-card d-flex ">
            <div className="cart-item-card__image-container ">
                <img src={image} alt=""
                    className="h-100 w-100 img-contain"
                />
            </div>
            <div className="cart-item-card__details-container">
                <div>
                    <div className="text-sm">{name || ""}</div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="font-medium cart-item-price">{FormatCurreny(price) || ""}</div>

                    <div className="remove-cart-item">
                        <Trash2
                            onClick={() => updateQty(id, "remove")}
                        />
                    </div>
                </div>

                <div className="cart-qty-wrapper">
                    <div className="cart-qty-container">
                        <button className="cart-qty-btn"
                            onClick={() => updateQty(id, "decrease")}
                        ><Minus /></button>
                        <input type="number" readOnly className="cart-qty-input" defaultValue={qty} />
                        <button className="cart-qty-btn"
                            onClick={() => updateQty(id, "increase")}
                        ><Plus /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
