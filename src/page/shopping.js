import React from 'react';
import {Col, Divider, Row} from 'antd';
import Book from "../components/book";
import {Input, Pagination, Menu} from "antd";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import staticBooks from "../assets/staticdata";
import {useState} from "react";
const {Search} = Input;

const Shopping = () => {
  // 编程导航
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const bookname = params.get("search");
  console.log(bookname);
  const [search, setSearch] = useState(null);
  const searchedBooks = staticBooks.filter((book) => {
    if (bookname === null) {
      return true;
    }
    return book.name.includes(bookname);
  });
  const Books = searchedBooks.map((book) => {
    return (
      <Col className="gutter-row" onClick={() => navigate(`/bookdetail/${book.id}`)} span={6}>
        <Book path={`/img/${book.path}`} name={book.name} price={book.price} author={book.author} stock={book.stock} />
      </Col>
    );
  });
  return (
    <div className=" w-11/12 flex">
      <div className=" flex flex-col w-[100%] items-center pt-12">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onInput={(e) => {
            setSearch(e.target.value);
          }}
          onSearch={() => {
            if (search !== null) {
              navigate(`/book/shopping?search=${search}`);
            }
          }}
          className=" w-[95%] mb-[20px] bg-green-400"
        />
        <Divider className=" w-[95%]" />
        <Row gutter={[40, 40]} wrap={true} className="w-full justify-start items-start">
          {Books}
        </Row>
        <Pagination defaultCurrent={1} total={50} className=" mt-8 mb-8" />
      </div>
    </div>
  );
};

export default Shopping;
