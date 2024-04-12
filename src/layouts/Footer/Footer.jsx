export const Footer = () => {
    const socialMediaLinks = [
        { "label": "Twitter", "href": "https://mobile.twitter.com/paytusker" }, { "label": "Facebook", "href": "https://m.facebook.com/#!/TuPublish/?tsid=0.584001426281142&source=result" }, { "label": "LinkedIn", "href": "https://www.linkedin.com/company/tupublish/" }, { "label": "YouTube", "href": "https://youtube.com/channel/UCgIsSYLJzBLOl5yRhDlwPaQ" }, { "label": "Discord", "href": "https://discord.gg/TV3M28nD" }
    ]
    return (
        <footer className="pg-footer">
            <section className="pg-footer__upper-section">
                <section className="footer-links__tab">

                    <div className="footer-links__container">
                        <div className="font-bold">Follow Us</div>
                        <ul className="footer-links__ul">
                            {
                                socialMediaLinks.map((val, i) => (
                                    <li key={i}>
                                        <a href={val.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm">
                                            {val.label}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="footer-links__container">
                        <div className="font-bold">Paytuser</div>
                        <ul className="footer-links__ul">
                            <li>
                                <a href="/faqs">FAQs</a>
                            </li>
                            <li><a href="#" className="text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm">About Us</a></li>
                            <li><a href="#" className="text-sm">Terms & Conditions</a></li>
                            <li><a href="#" className="text-sm">Contact Us</a></li>
                            <li><a href="#" className="text-sm">Sell on Paytusker</a></li>
                        </ul>
                    </div>


                    <div className="footer-links__container">
                        <div className="font-bold">Paymemt Methods</div>
                        <div className="footer-payment-methods__wrapper">
                            <img src="https://d28wu8o6itv89t.cloudfront.net/images/visalogopngtransparentpng-1579588235384.png" alt="" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1158px-Mastercard-logo.svg.png" alt="" />

                            <img src="https://www.investopedia.com/thmb/F5w0M48xTFtv-VQE9GFpYDMA2-k=/fit-in/1500x750/filters:format(png):fill(white):max_bytes(150000):strip_icc()/Binance-0e4c4bfb014e4d9ca8f0b6e11c9db562.jpg" alt="" />
                        </div>
                    </div>

                </section>

            </section>


            <section className="pg-footer__copyrights">
                &copy;2024 aytusker,All rights reserved
            </section>
        </footer >
    )
}
