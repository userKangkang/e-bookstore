import React from "react";
import {Col, Divider, Row} from "antd";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import Book from "../components/book";
import {Input, Pagination, Menu} from "antd";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import staticBooks from "../assets/staticdata";
import {useState, useEffect} from "react";
import {getMe} from "../api/getMe";
import {useSelector, useDispatch} from "react-redux";
import {setUsername, setBalance, setAvatar, setId, setHobby, setSignature} from "../store/modules/loginStore";
const {Search} = Input;

const Home = () => {
  // 编程导航
  const user = localStorage.getItem("username");
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    getMe(user).then((res) => {
      if (!res.data) {
        navigate("/");
      } else {
        dispatch(setUsername(res.data.username));
        dispatch(setBalance(res.data.balance));
        dispatch(setAvatar(res.data.avatar));
        dispatch(setId(res.data.id));
        dispatch(setHobby(res.data.hobby));
        dispatch(setSignature(res.data.signature));
      }
    });
  }, [user]);
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
  const string = ["新书上架", "热销图书"];
  const Bokks1 = [0, 4].map((index) => (
    <div className="w-full ml-[20px] mb-[20px]">
      <h2 className="text-2xl font-bold mt-[15px] mb-[5px]">{string[index / 4]}</h2>
      <Row gutter={[40, 40]} wrap={true} className="w-full justify-start items-start">
        {searchedBooks.slice(index, index < 6 ? 4 + index : 6).map((book) => {
          return (
            <Col className="gutter-row" onClick={() => navigate(`/bookdetail/${book.id}`)} span={6}>
              <Book path={`/img/${book.path}`} name={book.name} price={book.price} author={book.author} stock={book.stock} />
            </Col>
          );
        })}
      </Row>
    </div>
  ));

  return (
    <div className=" flex flex-col w-[88%] items-center pt-12">
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
      <img src={process.env.PUBLIC_URL + "/img/homepage.jpg"} className=" w-[95%] mt-[20px] mb-[30px]" />
      <Divider className=" w-[95%]" />
      {Bokks1}
    </div>
  );
};

export default Home;
