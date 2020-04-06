import React from "react";
import styles from "./Search.module.css";

interface ISearchProps extends React.HTMLProps<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean | null;
}

export const Search = React.forwardRef<HTMLInputElement, ISearchProps>(
  (props, ref) => {
    return (
      <div className={styles.wrap}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchTerm}
            onChange={props.onChange}
            ref={ref}
            placeholder="Search for a restaurant"
          />
        </div>
        {props.loading && <span className={styles.loading}>Searching...</span>}
      </div>
    );
  }
);
