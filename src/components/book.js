import React from 'react';
import { Card } from 'antd';
import styles from "../css/card.module.css";

console.log(styles);

const {Meta} = Card;
const Book = (props) => (
  <Card hoverable cover={<img alt="example" src={process.env.PUBLIC_URL + props.path} className={styles.img} />}>
    <Meta title={props.name} description={`售价:${props.price}元`} />
  </Card>
);
export default Book;