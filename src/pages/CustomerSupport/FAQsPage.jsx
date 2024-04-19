import { useEffect, useState } from "react";
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { Header } from "../../layouts";


let FAQsJSONData = null;

const FAQsPage = () => {
    const [FAQsData, setFAQsData] = useState(FAQsJSONData || null);
    const [pageLoading, setPageLoading] = useState(false)

    const fetchFAQs = async () => {
        if (!FAQsJSONData) {
            setPageLoading(true)
            const req = await axios.get("https://crm.paytusker.us/api/method/paytusker.apis.get_website_faqs")
            if (req.status === 200) {
                FAQsJSONData = req.data.data
                setFAQsData(req.data.data);
            }
            await setPageLoading(false)
        }
    }

    const filterFaqs = (query) => {
        const filteredFaqs = FAQsJSONData?.filter(faq => {
            const lowerQuery = query.toLowerCase();
            const lowerQuestion = faq.question.toLowerCase();
            return lowerQuestion.includes(lowerQuery) || lowerQuestion.replace(/\s/g, '').includes(lowerQuery);
        });
        setFAQsData(filteredFaqs.slice(0, 20));
    }

    useEffect(() => { fetchFAQs() }, [])

    return (
        <>
            <Header />
            <main>
                <div className="section-heading text-center mt-4">Paytusker Customer FAQs</div>
                <div className="my-5">
                    <div className="font-bold">Find more solutions</div>
                    <div>
                        <input type="text" placeholder="Enter here" className="input"
                            style={{
                                width: "15rem",
                                margin: '0.5rem 0'
                            }}
                            onChange={(e) => filterFaqs(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-5">
                    {
                        pageLoading ? <> {Array.from({ length: 20 }).map((i) => <FaqLoadingSkeleton key={i} />)} </> : <></>
                    }
                    {FAQsData?.slice(0, 20)?.map((val, i) => (
                        <div key={i} className="mb-4 text-sm p-2"
                            style={{ borderBottom: "1px solid #bbb" }}
                        >
                            <div className="font-bold mb-1">{i + 1}. {val.question}</div>
                            <div>{val.answer}</div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default FAQsPage


const FaqLoadingSkeleton = () => {
    return (
        <div className="mb-3">
            <Skeleton count={3} />
        </div>
    )
}