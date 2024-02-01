import { Linkedin, Twitter, Facebook } from "lucide-react";
import Logo from "../../assets/logo.png"
{/* <section className="footer-section__logo">
    <img src={Logo} />
</section> */}

export const Footer = () => {
    return (
        <footer className="pg-footer">
            <section className="pg-footer__upper-section">
                <section className="footer-links__tab">
                    
                    <div className="footer-links__container">
                        <div className="font-bold">Follow Us</div>
                        <ul className="footer-links__ul">
                            <li><a href="#" className="text-sm">Facebook</a></li>
                            <li><a href="#" className="text-sm">Instagram</a></li>
                            <li><a href="#" className="text-sm">Linkedin</a></li>
                            <li><a href="#" className="text-sm">TikTok</a></li>
                        </ul>
                    </div>

                    <div className="footer-links__container">
                        <div className="font-bold">Paytuser</div>
                        <ul className="footer-links__ul">
                            <li><a href="#" className="text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm">About Us</a></li>
                            <li><a href="#" className="text-sm">Terms & Conditions</a></li>
                            <li><a href="#" className="text-sm">Contact Us</a></li>
                            <li><a href="#" className="text-sm">Sell on Paytusker</a></li>
                        </ul>
                    </div>
                </section>

                <section className="footer-email__tab">
                    <div className="footer-heading font-bold text-center">Our News Letters</div>
                    <div className="flex-center gap-1 footer-email__input-box">
                        <input type="search" name="email" id="footer-contact__email" className="input text-center" placeholder="Enter email address" />
                        <button className="btn btn-sm btn-primary">Subscribe</button>
                    </div>
                </section>
            </section>


            <section className="pg-footer__copyrights">
                &copy;2024 aytusker,All rights reserved
            </section>
        </footer >
    )
}
