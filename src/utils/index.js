// export { generateForm } from "./form";
export { ProtectedRoute } from "./ProtectedRoute";

export const FormatCurreny = (v) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(v || 0)
}

export const serializeFormData = (form) => {
    const data = {};
    const formDataObject = new FormData(form);

    for (let [key, value] of formDataObject.entries()) { data[key] = null; }

    for (const [key, value] of formDataObject.entries()) {
        // if (Object.keys(data).includes(key) && value instanceof File && !Array.isArray(data[key])) {
        //     data[key] = [data[key]]
        // }
        // else if (Object.keys(data).includes(key) && Array.isArray(data[key])) {
        //     data[key].push(value || null)
        // }
        // else if (value instanceof File && value.size > 0) {
        //     data[key] = value
        // }
        // else if (!(value instanceof File)) {
        //     data[key] = value || null;
        // }

        if (Object.keys(data).includes(key) && value instanceof File && data[key]) {
            if (!Array.isArray(data[key])) { data[key] = [data[key]] }
            else { Array.isArray(data[key]) } { data[key].push(value) }
        }
        else if (value instanceof File && value.size > 0) {
            data[key] = value
        }
        else if (!(value instanceof File)) {
            data[key] = value
        }
    }

    return data;
}