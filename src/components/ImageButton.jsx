export default function ImageButton({
    src,
    alt,
    onClick,
}) {
    const handleOnClick = () => {
        onClick(src);
    }

    return (
        <button className="card" onClick={handleOnClick}>
            <img src={src} alt={`${alt} pokemon`} />
        </button>
    );
}
