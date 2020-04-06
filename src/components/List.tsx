import React from "react";
import { Link } from "react-router-dom";
import { IItem } from "./Main";
import styles from "./List.module.css";

type ListProps = {
  items: IItem[];
  handleClick: (id: string) => void;
};

export const List = ({ items, handleClick }: ListProps) => {
  return (
    <div className={styles.list}>
      {items.slice(0, 20).map((item: IItem, index: number) => {
        let shownCards = JSON.parse(
          localStorage.getItem("shownCards") as string
        );

        const isTransparent =
          shownCards && shownCards.includes(item.id) ? styles.transparent : "";

        return (
          <div key={index} className={`${styles.card} ${isTransparent}`}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>

            <Link to={`/restaurant/${item.id}`}>
              <button
                className={styles.button}
                type="button"
                onClick={() => handleClick(item.id)}
              >
                Show more
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
