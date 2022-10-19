import React, { useEffect, useState } from "react";
import "./CardGrid.css";
import Shen from "../img/shen.jpeg";
import Bloodmoon from "../img/bloodmoon.webp";
import Psyops from "../img/psyops.jpeg";
import Pulsefire from "../img/pulsefire.webp";
import Scorpio from "../img/scorpio.webp";
import Shockblade from "../img/shockblade.jpg";
import Subzero from "../img/subzero.jpeg";
import Warlord from "../img/warlord.webp";
import Thresh from "../img/thresh.jpg";
import { Card } from "./Card";

export type ImagesCard = { src: string; matched: boolean; id?: number };

const images: ImagesCard[] = [
  { src: Shen, matched: false },
  { src: Bloodmoon, matched: false },
  { src: Psyops, matched: false },
  { src: Pulsefire, matched: false },
  { src: Scorpio, matched: false },
  { src: Shockblade, matched: false },
  { src: Subzero, matched: false },
  { src: Warlord, matched: false }
];

export const CardGrid: React.FC = () => {
  const [cards, setCards] = useState<Array<ImagesCard>>([]);
  const [card1, setCard1] = useState<ImagesCard | null>(null);
  const [card2, setCard2] = useState<ImagesCard | null>(null);

  const shuffle = () => {
    const shuffled = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card }));

    setCards(shuffled);
  };

  useEffect(() => {
    shuffle();
  }, []);

  const handleChoice = (card: ImagesCard): void => {
    card1 ? setCard2(card) : setCard1(card);
  };

  const resetPair = () => {
    setCard1(null);
    setCard2(null);
  };

  useEffect(() => {
    if (card1 && card2) {
      if (card1.src === card2.src) {
        setCards(prev =>
          prev.map(card => {
            if (card.src === card1.src) {
              return { ...card, matched: true };
            }
            {
              return card;
            }
          })
        );
        resetPair();
      } else {
        setTimeout(() => resetPair(), 500);
      }
    }
  }, [card1, card2]);

  const gameWin = () => {
    const win: boolean = cards.every(card => card.matched === true);
    if (win) {
      alert("vous avez gagné !");
      shuffled();
    }
  };

  gameWin();

  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <Card
          key={card.id || index + 1}
          card={card}
          defaultImg={Thresh}
          handleChoice={() => handleChoice(card)}
          flipped={card === card1 || card === card2 || card.matched}
        />
      ))}
    </div>
  );
};
