import ImageButton from "../components/ImageButton";

export default function CardContainer({
    imageUrls,
    names,
    onCardClick,
}) {
    const handleOnClick = (url) => {
        onCardClick(url);
    }

    return (
        <main role="main" className="cards-container">
            {imageUrls.map((url, index) => (
                <ImageButton 
                    key={index} // Each child of list need to have a unique key prop
                    src={url} 
                    alt={names[index]}  // Access the names arr with the index of the imageUrls
                    onClick={() => handleOnClick(url)}
                />
            ))}
        </main>
    );
}
