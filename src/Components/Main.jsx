import React, { useState } from 'react'
import Card from './Card'
import { assets } from './assets'
export default function Main() {
    const [score, updateScore] = useState({current: 0, best: 0})
    const imagesUnModified = assets.map((asset) => {
        return {image: asset, clicked: false}
    })
    const [images, updateImages] = useState(imagesUnModified)

    function calculateScore(isNotClicked) {
        if (!isNotClicked) {
            updateScore({
                ...score,
                current: 0
            })
        } else {
            score.current + 1 > score.best ? updateScore({...score, current: score.current + 1, best: score.current + 1}) : updateScore({...score, current: score.current + 1})
        }
    }
    function reset() {
        updateImages(imagesUnModified)
    }
    function shuffleImages() {
        let shuffled = images
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            updateImages(shuffled)
        }
    }
    function newGame() {
        updateImages(imagesUnModified)
        updateScore({current: 0, best: 0})
    }
    function handleClick(e) {
        let index = e.target.id
        if (images[index].clicked === true) {
            calculateScore(false)
            reset()
        } else {
            calculateScore(true)
            images[index].clicked = true
            shuffleImages()
        }
    }
    if(score.current !== 12) {
        return (
            <div className='Main'>
                <div>Score: {score.current}</div>
                <div>Best Score: {score.best}</div>
                <div className='Cards'>
                    {images.map((image, indx) => {
                        return (
                                <div key={indx}>
                                    <Card index={indx} source={image.image} handleClick={handleClick}/>
                                </div>
                        )
                    })}
                </div>
            </div>
          )
    } else {
        return (
                <div className="modal">
                    <span>You Win!</span>
                    <button onClick={newGame}>Reset Game</button>
                </div>
        )
    }
}
