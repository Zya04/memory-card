import React from 'react'

interface Props {
  key: undefined;
  card: {src: string, id: number, matched: boolean};
  imgThresh: string;
  handleChoice: (card: any) => void;
  flipped: boolean
}

export const Card: React.FC<Props> = ({
  key, card, imgThresh, handleChoice = () => {}, flipped
}) => {

const handleClick = (card: any) => {
  if (!flipped) handleChoice(card)
}

  return(
  <div className="card" key={key} onClick={() => handleClick(card.src)}>
    {
      flipped ?
      <img src={card.src}/>
      :
      <img src={imgThresh}/>
    }
  </div>
  )
}