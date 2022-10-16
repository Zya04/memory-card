import React, { useEffect, useState } from 'react';
import './CardGrid.css';
import Shen from '../img/shen.jpeg';
import Bloodmoon from '../img/bloodmoon.webp';
import Psyops from '../img/psyops.jpeg';
import Pulsefire from '../img/pulsefire.webp';
import Scorpio from '../img/scorpio.webp';
import Shockblade from '../img/shockblade.jpg';
import Subzero from '../img/subzero.jpeg';
import Warlord from '../img/warlord.webp';
import Thresh from '../img/thresh.jpg'

import { Card } from './Card'

const images: {src: string, matched:boolean} [] = [
  {"src": Shen, matched: false},
  {"src": Bloodmoon, matched: false},
  {"src": Psyops, matched: false},
  {"src": Pulsefire, matched: false},
  {"src": Scorpio, matched: false},
  {"src": Shockblade, matched: false},
  {"src": Subzero, matched: false},
  {"src": Warlord, matched: false},
]

export const CardGrid: React.FC = () => {
  const [cards, setCards] = useState<Array<any>> ([])
  const [card1, setCard1] = useState<any>()
  const [card2, setCard2] = useState<any>()

  const shuffle = () => {
    const shuffled = [...images, ...images]
    .sort(() => Math.random() - 0.5)
    .map((card: Object, index: number) => ({ ...card, id: index + 1}))

    setCards(shuffled)
  }   

  useEffect(() => {
    shuffle()
  }, [])

  const handleChoice = (card: Object):void => {
    card1? setCard2(card) : setCard1(card)
  }

  const resetPair = ():void => {
    setCard1(null)
    setCard2(null)
  }

  useEffect(() => {
    if(card1 && card2){
      if(card1.src === card2.src){
        setCards(prev => prev.map(card =>{
          if (card.src === card1.src){
            return {...card, matched:true}
          }{
            return card
          }
        }))
        resetPair()
      }
      else{
        setTimeout(() => resetPair(), 500)
      }
    }
  }, [card1, card2])


  console.log(cards)
  return(
    <div className="card-grid">
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          imgThresh={Thresh}
          handleChoice={()=>handleChoice(card)}
          flipped={card === card1 || card === card2 || card.matched}
        />
      ))}
    </div>
  )
}
