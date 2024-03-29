import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { useGetCartDetailsQuery, useUpdateCartMutation, useGetUserAddressQuery, useCreateCustomerOrderMutation } from "../../api";
import { FormatCurreny } from "../../utils";
import { Navbar } from "../../layouts";
import { Button, Freeze } from "../../components";


const _paymentMethods = [
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: cartApiData, isLoading: getItemsLoading, isSuccess, isError } = useGetCartDetailsQuery();
    const [createOrderApi, createOrderApiRes] = useCreateCustomerOrderMutation();

    const [updateCartApi, qtyResults] = useUpdateCartMutation();
    const [cartDataObject, setCartDataObject] = useState(null);
    const [pageLoading, setPageLoading] = useState(getItemsLoading);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const [availablePaymentMethods, setAvailablePaymentMethods] = useState([])
    const [userAddress, setUserAddress] = useState([])
    const { data: addressApiData } = useGetUserAddressQuery()



    const checkoutCart = () => {
        if (currentSelectedAddress && selectedPaymentMethod) {
            const reqBody = {
                "delivery_address": currentSelectedAddress,
                "payment_method": selectedPaymentMethod,
            }
            createOrderApi(reqBody)
        }
        else {
            toast("Please choose an address and payment method.", { icon: "ℹ" })
        }

    }

    const setSelectedAddress = (id) => {
        setCurrentSelectedAddress(id)
    }

    const getPaymentMethods = () => {
        setAvailablePaymentMethods(_paymentMethods)
    }

    useEffect(() => {
        if (createOrderApiRes.isLoading) {
            setPageLoading(createOrderApiRes.isLoading);
        }
        if (createOrderApiRes.isSuccess) {
            toast.success("Order successfully created!")
            setPageLoading(false);

        }
    }, [createOrderApiRes.isLoading, createOrderApiRes.isSuccess]);

    useEffect(() => {
        if (isSuccess) {
            getPaymentMethods()
            console.log(cartApiData)
            setCartDataObject(cartApiData);
            setPageLoading(false);
        }

    }, [cartApiData, isSuccess])


    useEffect(() => {
        setPageLoading(getItemsLoading)
    }, [getItemsLoading])

    useEffect(() => {
        if (qtyResults.isLoading) { setPageLoading(qtyResults.isLoading) }
    }, [qtyResults.isLoading])

    useEffect(() => { setUserAddress(addressApiData) }, [addressApiData])


    if (isError) { toast.error("Something went wrong.") }
    if (createOrderApiRes.isSuccess) { navigate("/profile/orders") }
    if (pageLoading && !createOrderApiRes.isLoading) return <Freeze />

    return (
        <>
            <div >
                <Navbar title={"Your Cart"} />

                <div className='cart-page'>
                    <div className="cart-items__wrapper">
                        <div className="ci-w2">
                            <div className="cart-items__container">
                                {cartDataObject && cartDataObject.items?.length > 0 ? (
                                    cartDataObject.items.map((item, index) => (
                                        <CartItemCard
                                            key={index}
                                            price={item.rate}
                                            qty={item.qty}
                                            name={item.product_name}
                                            image={item.cover_image}
                                            editQty={updateCartApi}
                                            id={item.id}
                                            setPageLoading={setPageLoading}
                                        />
                                    ))
                                ) : !getItemsLoading && (!cartDataObject || !cartDataObject.items) ? (
                                    <EmptyCart />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="cart-summary__wrapper">
                        <OrderSummary
                            sub_total={cartDataObject?.total_qty}
                            total={cartDataObject?.total_amount}
                            setPaymentMethod={setSelectedPaymentMethod}
                            currentPaymentMethod={selectedPaymentMethod}
                            paymentMethods={availablePaymentMethods}
                            checkoutCart={checkoutCart}
                            userAddressList={userAddress}
                            currentSelectedAddress={currentSelectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            pageLoading={pageLoading}
                        />
                    </div>
                </div>

            </div>
        </>

    )
}

export default Cart

const OrderSummary = ({
    total,
    sub_total,
    checkoutCart,
    paymentMethods,
    setPaymentMethod,
    currentPaymentMethod,
    userAddressList,
    currentSelectedAddress,
    pageLoading,
    setSelectedAddress
}) => {

    return (
        <div className="cart-order-summary-container">
            <div className="order-summary__title">Order Summary</div>
            <div>
                <div className="flex-align-between my-2">
                    <div>Subtotal </div><div> ({sub_total || 0} items)</div>
                </div>
                <div className="flex-align-between my-2 text-lg font-semibold">
                    <div>Total</div><div>{FormatCurreny(total)}</div>
                </div>
            </div>

            <br />
            <div>
                <div className="font-medium mb-2">Payment method</div>
                <div>
                    {paymentMethods?.map((val, i) =>
                        <div key={i} onClick={() => setPaymentMethod(val.id)} >
                            <PaymentMethodCard
                                img={val.image}
                                name={val.name}
                                active={currentPaymentMethod === val.id ? true : false}
                            />
                        </div>
                    )}
                </div>
            </div>

            <br />
            <br />
            <div>
                <div className="font-medium mb-4">Shipping address</div>
                <div>
                    {
                        userAddressList?.map((val, i) => (
                            <div key={i} className="flex-align-start gap-1 mb-2">
                                <input
                                    checked={currentSelectedAddress == val.id}
                                    type="radio" name={i} id={i}
                                    onChange={() => setSelectedAddress(val.id)}
                                />
                                <label htmlFor={i}>
                                    {val.address_display}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <Button
                    className="btn btn-full btn-primary or-sum-btn-checkt"
                    label="Checkout"
                    onClick={checkoutCart}
                    btnLoading={pageLoading}
                />
                {/* <button className="btn btn-full btn-primary or-sum-btn-checkt"
                    onClick={() => checkoutCart()}>
                    Checkout
                </button> */}
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
        <div className="cart-item-card flex ">
            <div className="cart-item-card__image-container ">
                <img src={image} alt=""
                    className="h-100 w-100 img-contain"
                />
            </div>
            <div className="cart-item-card__details-container">
                <div>
                    <div className="text-sm"
                        style={{
                            height: "2rem",
                            overflow: "hidden",
                            maxWidth: "90%"
                        }}
                    >{name || ""}</div>
                </div>

                <div className="flex-align-between">
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
        </div >
    )
}

const EmptyCart = () => {
    return (
        <div className="mt-10 flex-center">
            <div>
                <div>
                    There are no items in this cart
                </div>
                <div className="mt-2 flex-center">
                    <Link to={"/"}>
                        <button className="btn btn-primary">Continue Shopping</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}