import { useEffect, useState } from "react";
import Header from "./components/Header";
import CardContainer from "./containers/CardsContainer";
import './App.css'
import Alert from "./components/Alert";

// TODO: refactor variables names
// TODO : make the card spin or full blue after each click

export default function App() {
    const [imageUrls, setImageUrls] = useState([]); // Init with an empty array
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const [previousRandomIndex, setPreviousRandomIndex] = useState(null);
    const [previousRoundUrl, setPreviousRoundUrl] = useState(null);

    // Fetch data with the value passed as parameter
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

    const selectRandomIndex = (randomIndexArr) => {
        const selectedIndex = Math.floor(Math.random() * randomIndexArr.length);
        const randomIndex = randomIndexArr[selectedIndex];

        return randomIndex;
    }

    const min = 1;
    const max = 20;

    useEffect(() => {
        async function loadImages() {
            const randomIndexArr = [];
            const setIndex = new Set();

            // Add a random index of previous array to the new one
            if (previousRandomIndex !== null) {
                setIndex.add(previousRandomIndex);
                randomIndexArr.push(previousRandomIndex);

                console.log(previousRandomIndex);
            }

            // Form the array with random index
            while (randomIndexArr.length < 4) { // TODO add a placeholder for 4 so we can easily modify difficulty
                let randomIndex = Math.floor(Math.random() * (max - min) + min);
                if (!setIndex.has(randomIndex)) { // Check if the index is unique
                    setIndex.add(randomIndex);
                    randomIndexArr.push(randomIndex);
                }
            }
            console.log(randomIndexArr);

            // Fetch the image with the index of the formed arr
            const urls = await Promise.all(
                randomIndexArr.map(index => getImage(index))
            );

            // Store the url in the state for later comparison
            const previousUrl = urls[randomIndexArr.indexOf(previousRandomIndex)];
            setPreviousRoundUrl(previousUrl);

            // Select a random index from current arr, will server for next round
            const newPreviousIndex =  selectRandomIndex(randomIndexArr);
            setPreviousRandomIndex(newPreviousIndex);
            
            setImageUrls(urls) // Store urls fetched in the state
        }
        loadImages();
    },[score]); // [] to run only when the button is clicked

    // Compare the clicked url to the one that was added from previous round
    const handleClickButton = (clickedUrl) => {
        console.log(clickedUrl, previousRoundUrl);

        if (clickedUrl === previousRoundUrl) {
            console.log("Selected the same, you lose the round")
            // Send end game alert
        } 
        // else {
        //     setScore((score) => score + 1);
        // }
        setScore((score) => score + 1);
    }
    
    return (
        <>
            <Header 
                score={score} 
            />
            <CardContainer 
                imageUrls={imageUrls} 
                onClick={handleClickButton} 
            />
            <Alert 
                score={score}
            />
        </>
    );
}

            // while (randomIndexArr.length < 4) {
            //     const randomIndex = Math.floor(Math.random() * (max - min) + min);
            //     if (!setIndex.has(randomIndex)) { // Check if the index is unique
            //         setIndex.add(randomIndex);
            //         randomIndexArr.push(randomIndex);
            //     }
            // }
