import React from "react";
import {Col, Divider, Row} from "antd";
import Book from "../../components/book";
import {Input, Pagination, Menu} from "antd";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {getBookList, getSearchBookList} from "../../api/ManagerRelated";
import {useState, useEffect} from "react";

const {Search} = Input;

const Shopping = () => {
  // 编程导航
  const [bookList, setBookList] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [search, setSearch] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 50
  });

  useEffect(() => {
    const getBooks = async () => {
      getBookList().then((res) => {
        setBookList(res.data);
      });
    };
    const getSearchedBooks = async () => {
      getSearchBookList(search).then((res) => {
        setBookList(res.data);
      });
    };
    if (search === "" || search === null) {
      getBooks();
    } else {
      getSearchedBooks(search);
    }
  }, [isRender]);

  const navigate = useNavigate();

  const slicedBooks = bookList.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize);
  const Books = slicedBooks.map((book) => {
    return (
      <Col className="gutter-row" onClick={() => navigate(`/bookdetail/${book.id}`)} span={6}>
        <Book path={book.path} name={book.name} price={book.price} author={book.author} stock={book.stock} />
      </Col>
    );
  });
  const handleChange = (page) => {
    // 在表格翻页时，更新当前页码
    setPagination({...pagination, current: page});

  };
  return (
    <div className=" w-11/12 flex">
      <div className=" flex flex-col w-[100%] items-center pt-12">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onSearch={() => {
            if (search !== null && search !== "") {
              navigate(`/book/shopping?search=${search}`);
            } else {
              navigate("/book/shopping");
            }
            setIsRender(!isRender);
          }}
          className=" w-[95%] mb-[20px] bg-green-400"
        />
        <Divider className=" w-[95%]" />
        <Row gutter={[40, 40]} wrap={true} className="w-full justify-start items-start h-[900px]">
          {Books}
        </Row>
        <Pagination pageSize={pagination.pageSize} total={bookList.length} current={pagination.current} onChange={handleChange} className=" mt-8 mb-8" />
      </div>
    </div>
  );
};

export default Shopping;
