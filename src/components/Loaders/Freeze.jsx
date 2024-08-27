/* eslint-disable react/prop-types */
import { Spinner } from "./Spinner"

export const Freeze = ({ show = false, message = "Loading..", children, backdropStyle = {} }) => {

    if (show) {

        return (
            <div className="freeze-backdrop"
                style={backdropStyle}
            >
                {children ? children :
                    <div className="freeze-spinner-wrapper">
                        <Spinner />
                        <div className="text-center font-bold">{message}</div>
                    </div>}
            </div>
        )
    }
}
