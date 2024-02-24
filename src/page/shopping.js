import React from 'react';
import {Col, Divider, Row} from 'antd';
import Book from '../components/book';
import {Input} from 'antd';
const {Search} = Input;

const style = {
  background: '#0062ff',
  padding: '6px 0'
};
const onSearch = (value) => console.log(value);
const Shopping = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '96%',
        alignItems: 'center'
      }}
    >
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
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
        <Col className="gutter-row" span={6}>
          <Book />
        </Col>
      </Row>
    </div>
  );
};

export default Shopping;
