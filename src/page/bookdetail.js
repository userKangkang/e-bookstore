import fakeComment from "../assets/fakecomment";
import staticBooks from "../assets/staticdata";
import {useParams} from "react-router-dom";
import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Comment from "../components/comment";
import {Image, Divider, Card, Button, Input} from "antd";
import {addCart} from "../store/modules/cartStore";
import {get} from "lodash";
import {getBookDetail} from "../api/getBookDetail";
const {TextArea} = Input;

const commentCard = (comments) => {
  return comments.map((comment) => {
    return <Comment comment={comment} />;
  });
};

const BookDetail = () => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(fakeComment);
  const [content, setContent] = useState("");
  const {id} = useParams();
  const user = useSelector((state) => state.login.username);
  const data = staticBooks.find((book) => book.id.toString() === id);
  // const getdata = getBookDetail(id);
  // console.log(getdata);
  const [book, setBook] = useState({});
  const [isReady, setIsReady] = useState(false);
  //prepare for backend.
  useEffect(() => {
    const fetchData = async () => {
      const response = await getBookDetail(id);
      // const res = response.json();
      setBook(response.data);
      setIsReady(true);
      console.log(book);
    };
    fetchData();
  }, [id]);
  return (
    isReady &&
    <div className="flex-column items-center w-11/12 pt-12">
      <div className="flex flex-row justify-start w-full pl-10 pr-10">
        <Image width="350px" src={process.env.PUBLIC_URL + `/img/${book.path}`} className="w-96" />
        <div className="flex-column justify-start align-start w-7/12 ml-20">
          <h1 className="font-bold text-4xl">{book.name}</h1>
          <Divider>基本信息</Divider>
          <span>作者：{book.author}&nbsp;</span>
          <span>出版社：机械工业出版社</span>
          <Divider>详细介绍</Divider>
          <p>
            {book.detail}
          </p>
          <Card className="flex-row justify-between align-center w-92/100 rounded-md bg-orange-100">
            <div>抢购价</div>
            <div className="text-2xl text-orange-500">￥{book.price}</div>
          </Card>
          <div className="flex-row justify-start w-9/10 pl-5">
            <Button className="mr-5 bg-orange-500 text-white rounded-md mt-5 w-24">立即购买</Button>
            <Button
              className="mr-5 bg-orange-100 text-black rounded-md mt-5 w-28"
              onClick={() => {
                dispatch(addCart({img: book.path, id: book.id, name: book.name, price: book.price, number: 1}));
              }}
            >
              加入购物车
            </Button>
          </div>
        </div>
      </div>
      <TextArea
        rows={4}
        placeholder="这是一条友善的评论"
        className="mt-5 rounded-md mb-[15px]"
        onInput={(e) => {
          setContent(e.target.value);
        }}
        value={content}
      />
      <Button
        className=" bg-green-500 text-white rounded-[8px] mb-[10px]"
        onClick={() => {
          setComments([
            ...comments,
            {
              uname: user || "匿名用户",
              text: content,
              avatar: "https://avatars.githubusercontent.com/u/114564389?v=4"
            }
          ]);
          setContent("");
        }}
      >
        发布评论
      </Button>
      {commentCard(comments)}
    </div>
  );
};

export default BookDetail;
