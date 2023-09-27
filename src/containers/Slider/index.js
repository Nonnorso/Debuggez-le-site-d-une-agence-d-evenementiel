import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateAsc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
  ) || [];

  const nextCard = () => {
    setIndex((index + 1) % byDateAsc.length);
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);

    return () => clearInterval(interval);
  }, [index, byDateAsc]);

  const handleBulletPointClick = (clickedIndex) => {
    setIndex(clickedIndex); 
  };

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((_, radioIdx) => (
            /* eslint-disable react/no-array-index-key */
            <input
              key={`radio-${radioIdx}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx} 
              onChange={() => {}}
              onClick={() => handleBulletPointClick(radioIdx)}
            />
            /* eslint-enable react/no-array-index-key */
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;