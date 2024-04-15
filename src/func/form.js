export const generateForm = (fields, handleSubmit, btnLabel) => {
    const formSubmit = (event) => {
        event.preventDefault()

        const formObject = new FormData(event.target)
        const dataObject = {};

        for (const [key, value] of formObject.entries()) {
            dataObject[key] = value
        }

        handleSubmit(event, dataObject);
    }
    return <form onSubmit={(e) => (formSubmit(e))}>
        <div>
            <button className="btn btn-primary">{btnLabel}</button>
        </div>
    </form>
}