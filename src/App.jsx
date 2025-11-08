import { useEffect, useState } from "react";
import Header from "./components/Header";
import CardContainer from "./containers/CardsContainer";
import './App.css'


export default function App() {
    const [imageUrls, setImageUrls] = useState([]); // Init with an empty array
    const [selectedImage, setSelectedImage] = useState();
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [pastRandomUrl, setPastRandomUrl] = useState(null);

    async function getImage(nameOrId) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`);
            const data = await response.json();

            const imageUrl = data.sprites.front_default; // Access the image with the JSON path
            return imageUrl
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
            throw error;
        }
    }

    const selectRandomUrl = (randomIndexArr) => {
        const selectedIndex = Math.floor(Math.random() * randomIndexArr.length);
        const randomUrl = randomIndexArr[selectedIndex];

        return randomUrl;
    }

    const min = 1;
    const max = 20;

    useEffect(() => {
        async function loadImages() {
            const randomIndexArr = [];
            const setIndex = new Set();

            if (pastRandomUrl !== null) {
                setIndex.add(pastRandomUrl);
                randomIndexArr.push(pastRandomUrl);

                console.log(pastRandomUrl);
            }

            while (randomIndexArr.length < 4) { // TODO add a placeholder for 4 so we can easily modify difficulty
                let randomIndex = Math.floor(Math.random() * (max - min) + min);
                if (!setIndex.has(randomIndex)) { // Check if the index is unique
                    setIndex.add(randomIndex);
                    randomIndexArr.push(randomIndex);
                }
            }

            console.log(randomIndexArr);

            const newPastUrl =  selectRandomUrl(randomIndexArr); // Update state value
            setPastRandomUrl(newPastUrl);

            const urls = await Promise.all( // Wait for all the images to be loaded
                randomIndexArr.map(index => getImage(index))
            );
            setImageUrls(urls) // Set the state with the ulrs fetched
        }
        loadImages();
    },[score]); // [] to run only when the button is clicked
    
    // console.log(randomIndexArr)

    const handleClickButton = () => {
        setScore((score) => score + 1);
    }
    
    return (
        <>
            <Header score={score} />
            <CardContainer imageUrls={imageUrls} onClick={handleClickButton} />
        </>
    );
}

// TODO : make the card spin or full blue after each click

            // while (randomIndexArr.length < 4) {
            //     const randomIndex = Math.floor(Math.random() * (max - min) + min);
            //     if (!setIndex.has(randomIndex)) { // Check if the index is unique
            //         setIndex.add(randomIndex);
            //         randomIndexArr.push(randomIndex);
            //     }
            // }