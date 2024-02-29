import React from 'react';
import {Col, Divider, Row} from 'antd';
import Book from '../components/book';
import {Input} from 'antd';
import {Link} from 'react-router-dom';
import staticBooks from '../assets/staticdata';
const {Search} = Input;

const style = {
  background: '#0062ff',
  padding: '6px 0'
};
const onSearch = (value) => console.log(value);
const Shopping = () => {
  const Books = staticBooks.map((book) => {
    return (
      <Col className="gutter-row" span={6}>
        <Link to={`/bookdetail/${book.id}`}>
          <Book path={`/img/${book.path}`} name={book.name} price={book.price} />
        </Link>
      </Col>
    );
  });
  return (
    <div className=" flex flex-col w-11/12 items-center">
      <Search placeholder="input search text" allowClear enterButton="Search" size="large" onSearch={onSearch} style={{width: '90%', marginBottom: '20px'}} />
      <Row
        gutter={[40, 40]}
        wrap={true}
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        {Books}
      </Row>
    </div>
  );
};

export default Shopping;
