import React from "react";
import {Col, Divider, Row, message} from "antd";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import Book from "../../components/book";
import {Input, Pagination, Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {getBookList} from "../../api/ManagerRelated";
import {useState, useEffect} from "react";
import {getMe} from "../../api/UserRelated";
import {useContext} from "react";
import {UserContext} from "../../App";

const {Search} = Input;

const Home = () => {
  // 编程导航
  const [bookList, setBookList] = useState([]);

  const {userChange, setUserChange} = useContext(UserContext);

  const user = sessionStorage.getItem("username");

  useEffect(() => {
    getMe(user).then(
      (res) => {
        if (!res.data) {
          navigate("/");
        } else {
          console.log(res.data);
          sessionStorage.setItem("id", res.data.id);
          sessionStorage.setItem("balance", res.data.balance);
          sessionStorage.setItem("avatar", res.data.avatar);
          sessionStorage.setItem("hobby", res.data.hobby);
          sessionStorage.setItem("signature", res.data.signature);
          sessionStorage.setItem("identity", res.data.identity);
          setUserChange(!userChange);
        }
      },
      (e) => {
        if (e.response.status === 401) {
          message.error("请先登录");
          navigate("/");
        } else {
          message.error("网络错误");
        }
      }
    );

    const getBooks = async () => {
      getBookList().then(
        (res) => {
          setBookList(res.data);
        },
        (e) => {
          if (e.response.status === 401) {
            message.error("请先登录");
            navigate("/");
          } else {
            message.error("网络错误");
          }
        }
      );
    };
    getBooks();
  }, [user]);
  const navigate = useNavigate();

  const string = ["新书上架", "热销图书"];
  const Bokks1 = [0, 4].map((index) => (
    <div className="w-full ml-[20px] mb-[20px]">
      <h2 className="text-2xl font-bold mt-[15px] mb-[5px]">{string[index / 4]}</h2>
      <Row gutter={[40, 40]} wrap={true} className="w-full justify-start items-start">
        {bookList.slice(index, index < 6 ? 4 + index : 6).map((book) => {
          return (
            <Col className="gutter-row" onClick={() => navigate(`/bookdetail/${book.id}`)} span={6}>
              <Book path={book.path} name={book.name} price={book.price / 100} author={book.author} stock={book.stock} />
            </Col>
          );
        })}
      </Row>
    </div>
  ));

  return (
    <div className=" flex flex-col w-[88%] items-center pt-12">
      <img src={process.env.PUBLIC_URL + "/img/homepage.jpg"} className=" w-[95%] mt-[20px] mb-[30px]" />
      <Divider className=" w-[95%]" />
      {Bokks1}
    </div>
  );
};

export default Home;
