export default function PointAutomation() {

    const handleClick = () => {
        fetch("https://localhost:5001/api/automations/point")
            .then(res => res.json())
            .then(res => console.log(res))
    }

    return (
        <button onClick={handleClick}>Bater ponto</button>
    )
}