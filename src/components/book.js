import React from 'react';
import { Card } from 'antd';
import styles from "../css/card.module.css";



const {Meta} = Card;
const Book = (props) => (
  <Card hoverable cover={<img alt="example" src={process.env.PUBLIC_URL + props.path} className={styles.img} />}>
    <Meta
      title={props.name}
      description={
        <div>
          <div>售价：{props.price}元</div>
          <div>作者：{props.author}</div>
          <div>ISBN编号：ddd</div>
          <div>库存量：{props.stock}</div>
        </div>
      }
    />
  </Card>
);
export default Book;