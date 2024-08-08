import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import noImage from "@src/assets/noImage.png";

import {
    useGetCartDetailsQuery,
    useUpdateCartMutation,
    useGetUserAddressQuery,
    useCreateCustomerOrderMutation
} from "../../api";
import { FormatCurreny } from "../../utils";
import { Navbar } from "../../layouts";
import { Button, Freeze } from "../../components";


const _paymentMethods = [
    {
        image: "https://cdn-icons-png.flaticon.com/512/657/657076.png",
        id: "card",
        name: "Credit or Debit Card"
    },
    {
        image: "https://hjk.ie/wp-content/uploads/2022/09/webimage-351D92AA-58D9-411D-A32716893D7AFC96.jpg",
        id: "klarna",
        name: "Klarna"
    },
    // {
    //     image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
    //     id: "paypal",
    //     name: "PayPal"
    // },
]



const Cart = () => {
    const [cartDataObject, setCartDataObject] = useState(null);
    const { data: cartApiData, isLoading: getItemsLoading, isSuccess } = useGetCartDetailsQuery();
    const [createOrderApi, createOrderApiRes] = useCreateCustomerOrderMutation();

    const [updateCartApi, qtyResults] = useUpdateCartMutation();
    const [pageLoading, setPageLoading] = useState(getItemsLoading);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const [availablePaymentMethods, setAvailablePaymentMethods] = useState([]);
    const [userAddress, setUserAddress] = useState([]);
    const { data: addressApiData } = useGetUserAddressQuery();



    const checkoutCart = () => {
        if (currentSelectedAddress && selectedPaymentMethod) {
            const reqBody = { "delivery_address": currentSelectedAddress, "payment_method": selectedPaymentMethod }
            createOrderApi(reqBody)
        }
        else {
            toast("Please choose an address and payment method.", { icon: "ℹ" })
        }
    }

    const setSelectedAddress = (id) => { setCurrentSelectedAddress(id) }
    const getPaymentMethods = () => { setAvailablePaymentMethods(_paymentMethods) }

    useEffect(() => {
        if (createOrderApiRes.isLoading) {
            setPageLoading(createOrderApiRes.isLoading);
        }
        if (createOrderApiRes.isSuccess) {
            toast.success("Order successfully created!")
            setPageLoading(false);
        }
        if (createOrderApiRes.isError) {
            let errorMsg = createOrderApiRes.error?.data?.message || "Internal server error!"
            toast.error(errorMsg)
            setPageLoading(false);
        }
    }, [createOrderApiRes.isLoading, createOrderApiRes.isSuccess, createOrderApiRes.isError]);

    useEffect(() => {
        if (cartApiData) {
            getPaymentMethods()
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


    if (createOrderApiRes.isSuccess) {
        if (createOrderApiRes.data.checkout_url) {
            window.location.href = createOrderApiRes.data.checkout_url
        }
    }
    useEffect(() => {
        document.title = 'Paytusker.com Shopping Cart'
    }, []);

    return (
        <>
            <Freeze show={pageLoading && !createOrderApiRes.isLoading} />
            <div>
                <Navbar title={"Shopping Cart"} />
                <div className='cart-page'>
                    <div className="cart-items__wrapper">
                        <div className="ci-w2">
                            <div className="cart-items__container">
                                {cartDataObject?.items?.length > 0 ?
                                    (
                                        cartDataObject.items.map((item, index) => (
                                            <CartItemCard
                                                data={item}
                                                key={index}
                                                handleQtyUpdate={updateCartApi}
                                            />
                                        ))
                                    ) : !getItemsLoading && (!cartDataObject || !cartDataObject.items) ?
                                        (<EmptyCart />)
                                        : (<></>)}
                            </div>
                        </div>
                    </div>
                    {cartDataObject && cartDataObject.items?.length > 0 ? (
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
                    ) : <></>}
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

    useEffect(() => {
        userAddressList?.forEach((val) => {
            if (val.default) {
                setSelectedAddress(val.id);
            }
        })
    }, [userAddressList])


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
                    {userAddressList ?
                        userAddressList?.map((val, i) => {
                            return (
                                <div key={i} className="flex-align-start gap-1 mb-2">

                                    <input
                                        checked={currentSelectedAddress == val.id}
                                        type="radio" name={i} id={i}

                                        onChange={() => setSelectedAddress(val.id)}
                                    />
                                    <address>
                                        <label htmlFor={i}
                                            dangerouslySetInnerHTML={{ __html: val?.address_display || "" }}
                                        >
                                        </label>
                                    </address>
                                </div>
                            )
                        }) :
                        <div className="text-sm mb-4">Please add a address for delivery</div>
                    }
                </div>
                <Link to={`/profile/address/form/add?redirect-to=${window.location.pathname}`}>
                    <div className="link text-sm flex-align-center gap-1"><Plus className="icon-sm" /> Add new address</div>
                </Link>
            </div>
            <div>
                <Button
                    className="btn btn-full btn-primary or-sum-btn-checkt"
                    label="Checkout"
                    onClick={() => checkoutCart()}
                    btnLoading={pageLoading}
                />

            </div>
        </div >
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
const CartItemCard = ({ data, handleQtyUpdate }) => {
    const [renderData, setRenderData] = useState(data);

    const updateQty = (id, action) => {
        const payload = { cart_item_id: id, action: action };

        if (action == "decrease") {
            setRenderData(prev => {
                let obj = { ...prev };
                obj["qty"] = obj["qty"] - 1;
                return obj
            })
        }
        else if (action == "increase") {
            setRenderData(prev => {
                let obj = { ...prev };
                obj["qty"] = obj["qty"] + 1;
                return obj
            })
        }
        handleQtyUpdate(payload);
    }

    return (
        <div className="cart-item-card flex ">
            <div className="cart-item-card__image-container ">
                <img src={renderData?.cover_image || noImage} alt=""
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
                    >{renderData?.product_name || ""}</div>
                </div>

                <div className="flex-align-between">
                    <div className="font-medium cart-item-price">
                        {FormatCurreny(renderData?.rate || 0)}
                    </div>
                    <div className="remove-cart-item">
                        <Trash2
                            onClick={() => updateQty(renderData?.id, "remove")}
                        />
                    </div>
                </div>
                <div className="cart-qty-wrapper">
                    <div className="cart-qty-container">
                        <button className="cart-qty-btn"
                            onClick={() => updateQty(renderData?.id, "decrease")}>
                            <Minus />
                        </button>
                        <input type="number" readOnly className="cart-qty-input" defaultValue={renderData?.qty || 0} value={renderData?.qty || 0} />
                        <button className="cart-qty-btn"
                            onClick={() => updateQty(renderData?.id, "increase")}>
                            <Plus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
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