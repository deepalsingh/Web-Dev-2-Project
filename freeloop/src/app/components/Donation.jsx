
export default function Donation({ donObj }) {
    return (
        <tr key={donObj.id}>
            <td>{donObj.title}</td>
            <td>{donObj.category}</td>
            <td>{donObj.condition}</td>
            <td>{donObj.description}</td>
        </tr>
    )
}   