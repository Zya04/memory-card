import React from "react";
import { ImagesCard } from "./CardGrid";

interface Props {
  card: ImagesCard;
  defaultImg: string;
  handleChoice: (card: ImagesCard) => void;
  flipped: boolean;
}

export const Card: React.FC<Props> = ({
  card,
  defaultImg,
  handleChoice = () => {},
  flipped
}) => {
  const onClick = () => {
    if (!flipped) handleChoice(card);
  };

  return (
    <div className="card" onClick={onClick}>
      {flipped ? <img src={card.src} /> : <img src={defaultImg} />}
    </div>
  );
};
