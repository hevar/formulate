import React from "react";
import { compose, graphql } from "react-apollo";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { GetRestaurant } from "../queries";
import styles from "./Restaurant.module.css";

export interface IItem {
  name: string;
  description: string;
  address: string;
  id: string;
  rating: number;
}

export interface IData {
  getRestaurant: IItem;
  loading: boolean;
}

interface IMatchParams {
  id: string;
}

interface IRestaurantProps extends RouteComponentProps {
  data: IData;
}

const Restaurant = (props: IRestaurantProps) => {
  const { data } = props;

  if (!data) {
    return <Redirect to={{ pathname: "/404" }} />;
  }

  const { loading, getRestaurant } = data;

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (!loading && !getRestaurant) {
    return <Redirect to={{ pathname: "/404" }} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>{getRestaurant.name}</h1>
        <p>{getRestaurant.description}</p>
        <span>{getRestaurant.address}</span>
        <span className={styles.rating}>{getRestaurant.rating}</span>
        <Link to="/">
          <button className={styles.button} type="button">
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default compose(
  graphql(GetRestaurant, {
    options: (props: RouteComponentProps<IMatchParams>) => ({
      variables: { id: props.match.params.id },
    }),
  })
)(Restaurant);
