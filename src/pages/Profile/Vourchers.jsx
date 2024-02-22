import { Header, UserSidebar } from "../../layouts"

const VourchersData = [
    {
        "Voucher No": "567890",
        "Status": "Inactive",
        "Valid From": "2024-02-05",
        "Valid Until": "2024-03-05"
    },
    {
        "Voucher No": "234567",
        "Status": "Active",
        "Valid From": "2024-05-20",
        "Valid Until": "2024-06-20"
    },
    {
        "Voucher No": "890123",
        "Status": "Active",
        "Valid From": "2024-07-01",
        "Valid Until": "2024-07-31"
    },
    {
        "Voucher No": "456789",
        "Status": "Inactive",
        "Valid From": "2024-04-15",
        "Valid Until": "2024-05-15"
    },
    {
        "Voucher No": "012345",
        "Status": "Active",
        "Valid From": "2024-08-10",
        "Valid Until": "2024-09-10"
    },
    {
        "Voucher No": "678901",
        "Status": "Inactive",
        "Valid From": "2024-06-01",
        "Valid Until": "2024-06-30"
    },
    {
        "Voucher No": "543210",
        "Status": "Active",
        "Valid From": "2024-09-15",
        "Valid Until": "2024-10-15"
    },
    {
        "Voucher No": "987654",
        "Status": "Active",
        "Valid From": "2024-11-01",
        "Valid Until": "2024-12-01"
    },
    {
        "Voucher No": "321098",
        "Status": "Inactive",
        "Valid From": "2024-10-10",
        "Valid Until": "2024-11-10"
    }
]


const Vourchers = () => {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div className="sidebar-page">
                <UserSidebar />

                <div className="sidebar-page__content profile-page">
                    <div>
                        <div className="heading-md">My Vouchers</div>
                        <br />
                        <div className="">
                            <table className="table w-100">
                                <thead>
                                    <tr>
                                        <th>Voucher No</th>
                                        <th>Status</th>
                                        <th>Valid From</th>
                                        <th>Valid Until</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        VourchersData.map((val, index) => (
                                            <tr key={index}>
                                                <td>{val["Voucher No"]}</td>
                                                <td>{val.Status}</td>
                                                <td>{val["Valid From"]}</td>
                                                <td>{val["Valid Until"]}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Vourchers