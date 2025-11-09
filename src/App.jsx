import { useEffect, useState } from "react";
import Header from "./components/Header";
import CardContainer from "./containers/CardsContainer";
import Alert from "./components/Alert";

import './App.css'

// TODO : make the card spin or full blue after each click

export default function App() {
    const [imageUrls, setImageUrls] = useState([]);
    const [names, setNames] = useState([]);

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const [previousRandomIndex, setPreviousRandomIndex] = useState(null);
    const [previousRoundUrl, setPreviousRoundUrl] = useState(null);

    const [showAlert, setShowAlert] = useState(false);

    // Fetch data with the value passed as parameter
    async function getImage(nameOrId) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`);
            const data = await response.json();

            // Return data with the JSON path
            return {
                imageUrl: data.sprites.front_default,
                name: data.name
            }
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
    const totalImagesNb = 4;

    useEffect(() => {
        async function loadImages() {
            const randomIndexArr = [];
            const setIndex = new Set();

            // Add a random index of the previous array to the new one
            if (previousRandomIndex !== null) {
                setIndex.add(previousRandomIndex);
                randomIndexArr.push(previousRandomIndex);
            }

            // Form the array with random index
            while (randomIndexArr.length < totalImagesNb) {
                let randomIndex = Math.floor(Math.random() * (max - min) + min);
                if (!setIndex.has(randomIndex)) { // Check if the index is unique
                    setIndex.add(randomIndex);
                    randomIndexArr.push(randomIndex);
                }
            }

            // Fetch the pokemon data with the index of the formed arr
            const pokemonData = await Promise.all(
                randomIndexArr.map(index => getImage(index))
            );

            // Create arrays for pokenon urls and names
            const urls = pokemonData.map(pokemon => pokemon.imageUrl);
            const names = pokemonData.map(pokemon => pokemon.name);

            // Store the URL in the state for later comparison
            const previousUrl = urls[randomIndexArr.indexOf(previousRandomIndex)];
            setPreviousRoundUrl(previousUrl);

            // Select a random index from current arr, will serve for next round
            const newPreviousIndex = selectRandomIndex(randomIndexArr);
            setPreviousRandomIndex(newPreviousIndex);
            
            // Store pokemon urls and names in the state
            setImageUrls(urls)
            setNames(names);
        }
        loadImages();
    },[score]); // [] to run only when the score is updated

    // Compare the clicked url to the one that was added from previous round
    const handleCardClick = (clickedUrl) => {
        if (clickedUrl === previousRoundUrl) {
            console.log("You selected the same image, you lose this round")

            if (score > highScore) {
                setHighScore(score);
            }
            setShowAlert(true);
        } 
        else {
            setShowAlert(false);
            setScore((score) => score + 1);
        }
    }

    // When the alert button clicked, reset state values
    const handleAlertClick = (bool) => {
        if (bool) {
            setShowAlert(false);
            setScore(0);
            setImageUrls([]);
            setPreviousRandomIndex(null);
            setPreviousRoundUrl(null);
        }
    }

    return (
        <>
            <Header 
                score={score} 
                highScore={highScore}
            />
            <CardContainer 
                imageUrls={imageUrls}
                names={names}
                onCardClick={handleCardClick} 
            />
            {showAlert && (
                <Alert 
                    score={score}
                    highScore={highScore}
                    onAlertClick={handleAlertClick}
                />
            )}
        </>
    );
}
