import { Youtube, Linkedin, Facebook, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

export const Footer = () => {
    const socialMediaLinks = [
        {
            "label": "Twitter",
            "href": "https://mobile.twitter.com/paytusker",
            "icon": <Twitter className="icon-md" />
        },
        {
            "label": "Facebook",
            "href": "https://www.facebook.com/TuPublish?mibextid=LQQJ4d",
            "icon": <Facebook className="icon-md" />
        },
        {
            "label": "LinkedIn",
            "href": "https://www.linkedin.com/company/tupublish/",
            "icon": <Linkedin className="icon-md" />
        },
        {
            "label": "YouTube",
            "href": "https://youtube.com/channel/UCgIsSYLJzBLOl5yRhDlwPaQ",
            "icon": <Youtube className="icon-md" />
        },
        {
            "label": "Discord",
            "href": "https://discord.gg/TV3M28nD",
            "icon": <svg className="icon-md" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        },
    ]

    return (
        <footer className="pg-footer">
            <section className="pg-footer__upper-section">
                <section className="footer-links__tab">

                    <div className="footer-links__container">
                        <div className="font-bold">Follow Us</div>
                        <ul className="footer-links__ul  follow-us__lg">
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

                        <ul className="footer-links__ul follow-us__sm">
                            {
                                socialMediaLinks.map((val, i) => (
                                    <li key={i}>
                                        <a href={val.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm">
                                            {val.icon}
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
                                <Link to="/faqs">FAQs</Link>
                            </li>
                            <li><Link to="/privacy-policy" className="text-sm">Privacy Policy</Link></li>
                            <li><Link to="/about-us" className="text-sm">About Us</Link></li>
                            {/* <li><Link to="#" className="text-sm">Terms & Conditions</Link></li>
                            <li><Link to="#" className="text-sm">Contact Us</Link></li>
                            <li><Link to="#" className="text-sm">Sell on Paytusker</Link></li> */}
                        </ul>
                    </div>


                    <div className="footer-links__container">
                        <div className="font-bold">Payment Methods</div>
                        <div className="footer-payment-methods__wrapper">
                            <img src="https://cdn-icons-png.flaticon.com/512/657/657076.png" alt="" />
                            <img src="https://hjk.ie/wp-content/uploads/2022/09/webimage-351D92AA-58D9-411D-A32716893D7AFC96.jpg" alt="" />

                            {/* <img src="https://d28wu8o6itv89t.cloudfront.net/images/visalogopngtransparentpng-1579588235384.png" alt="" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1158px-Mastercard-logo.svg.png" alt="" />
                            <img src="https://www.investopedia.com/thmb/F5w0M48xTFtv-VQE9GFpYDMA2-k=/fit-in/1500x750/filters:format(png):fill(white):max_bytes(150000):strip_icc()/Binance-0e4c4bfb014e4d9ca8f0b6e11c9db562.jpg" alt="" /> */}
                        </div>
                    </div>

                </section>

            </section>


            <section className="pg-footer__copyrights">
                &copy;2024 Paytusker. All rights reserved
            </section>
        </footer >
    )
}
