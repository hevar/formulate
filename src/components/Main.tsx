import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { ListRestaurants, SearchRestaurants } from "../queries";
import debounce from "../utils/debounce";
import { List } from "./List";
import styles from "./Main.module.css";
import { Search } from "./Search";

export interface IItem {
  name: string;
  description: string;
  address: string;
  id: string;
  rating: number;
}

export interface IData {
  listRestaurants: {
    items: IItem[];
  };
  loading: boolean;
}

type MainProps = {
  onSearch: (searchQuery: string) => void;
  data: IData;
};

type MainState = {
  searchQuery: string;
};

class Main extends Component<MainProps, MainState> {
  searchRef: React.RefObject<HTMLInputElement>;

  constructor(props: MainProps) {
    super(props);

    this.state = {
      searchQuery: "",
    };

    this.searchRef = React.createRef();
  }

  componentDidMount() {
    if (this.searchRef && this.searchRef.current) {
      this.searchRef.current.focus();
    }
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.handleFilter(value);
  };

  handleFilter = debounce((val) => {
    this.props.onSearch(val);
  }, 250);

  handleClear = () => {
    localStorage.removeItem("shownCards");
    this.forceUpdate();
  };

  handleClick = (id: string) => {
    let shownCards = JSON.parse(localStorage.getItem("shownCards") as string);

    if (shownCards && shownCards.length) {
      const index = shownCards.findIndex((card: string) => {
        return card === id;
      });

      // add
      if (index === -1) {
        let updatedShownCards = [...shownCards, id];
        localStorage.setItem("shownCards", JSON.stringify(updatedShownCards));
        return;
      }

      // remove
      shownCards.splice(index, 1);
      localStorage.setItem("shownCards", JSON.stringify(shownCards));
      return;
    }

    // create
    let addShownCards = [id];
    localStorage.setItem("shownCards", JSON.stringify(addShownCards));
  };

  render() {
    const { data } = this.props;

    const loading = data && data.loading ? data.loading : null;
    const items =
      data && data.listRestaurants && data.listRestaurants.items
        ? data.listRestaurants.items
        : [];

    return (
      <>
        <Search
          onChange={this.onChange}
          ref={this.searchRef}
          loading={loading}
        />

        <button
          className={styles.button}
          type="button"
          onClick={this.handleClear}
        >
          Clear history
        </button>

        {!loading && !items.length && (
          <p style={{ textAlign: "center" }}>Sorry, no results.</p>
        )}

        {!loading && items ? (
          <List items={items} handleClick={this.handleClick} />
        ) : null}
      </>
    );
  }
}

export default compose(
  graphql(ListRestaurants, {
    options: (data) => ({
      fetchPolicy: "cache-and-network",
    }),
    props: (props) => {
      return {
        onSearch: (searchQuery: string) => {
          searchQuery = searchQuery.toLowerCase();

          // @ts-ignore
          return props.data.fetchMore({
            query: searchQuery === "" ? ListRestaurants : SearchRestaurants,
            variables: {
              searchQuery,
            },
            updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
              return {
                ...previousResult,
                listRestaurants: {
                  ...previousResult.listRestaurants,
                  items: fetchMoreResult.listRestaurants.items,
                },
              };
            },
          });
        },
        data: props.data,
      };
    },
  })
)(Main);
