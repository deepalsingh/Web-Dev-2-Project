// TODO: implement material ui component

export default function Donation({ donObj }) {
    return (
        <div>
            <h1>Donation</h1>
            <p>Title: {donObj.title}</p>
            <p>Category: {donObj.category}</p>
            <p>Condition: {donObj.condition}</p>
            <p>Description: {donObj.description}</p>
        </div>
    )
}   