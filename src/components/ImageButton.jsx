export default function ImageButton({
    src,
    buttonId,
    onClick,
}) {
    const handleOnClick = () => {
        onClick(src);
    }

    return (
        <button className="card" onClick={handleOnClick}>
            <img src={src} alt={buttonId} />
        </button>
    );
}
// TODO: add an alt for the image
// TODO: take off buttonId after

{/* <p>{count}</p> */}