import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const Book = (props) => (
  <Card hoverable className="w-60 h-96" cover={<img alt="example" src={process.env.PUBLIC_URL + props.path} className="w-full h-72" />}>
    <Meta title={props.name} description={`售价:${props.price}元`} />
  </Card>
);
export default Book;