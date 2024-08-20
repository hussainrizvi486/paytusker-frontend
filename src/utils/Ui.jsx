// renderField.js

import { Select, Input, InputDate } from "@components";

export const RenderField = ({ field, key }) => {
    let { fieldtype } = field;
    fieldtype = String(fieldtype).toLowerCase()
    if (["text", "email", "password"].includes(fieldtype)) {
        return (<Input
            key={key}
            data={field}
        />
        );
    } else if (fieldtype === "select") {
        return (
            <Select
                key={key}
                data={field}
            />
        );
    } else if (fieldtype === "date") {
        return <InputDate key={key} data={field} />;
    }
};
