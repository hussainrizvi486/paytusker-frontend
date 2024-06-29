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

    for (const [key, value] of formDataObject.entries()) {
        if (key && value) {
            data[key] = value;
        }
    }

    return data;
}