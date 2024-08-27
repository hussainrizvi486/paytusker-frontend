// export { generateForm } from "./form";
export { ProtectedRoute } from "./ProtectedRoute";
export { RenderField } from "./Ui";

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

    for (let [key] of formDataObject.entries()) { data[key] = null; }

    for (const [key, value] of formDataObject.entries()) {
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


export const ScrollToTop = () => {
    window.scrollTo(0, 0)
}

export const validatePassword = (password, confirm_password) => {
    if (/\s/.test(password)) {
        return "Remove spaces from password!";
    }
    if (password.length < 8) {
        return "Minimum password length is 8 characters";
    }
    if (password !== confirm_password) {
        return "Passwords do not match!";
    }
    return null;
};