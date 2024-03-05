import fakeComment from "../assets/fakecomment";
import staticBooks from "../assets/staticdata";
import {useParams} from "react-router-dom";
import React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Comment from "../components/comment";
import {Image, Divider, Card, Button, Input} from "antd";
import {addCart} from "../store/modules/cartStore";
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
  const data = staticBooks.find((book) => book.id === id);
  return (
    <div className="flex-column items-center w-11/12 pt-12">
      <div className="flex flex-row justify-start w-full pl-10 pr-10">
        <Image width="350px" src={process.env.PUBLIC_URL + `/img/${data.path}`} className="w-96" />
        <div className="flex-column justify-start align-start w-7/12 ml-20">
          <h1 className="font-bold text-4xl">{data.name}</h1>
          <Divider>基本信息</Divider>
          <span>作者：Randal E.Bryant</span>
          <span>出版社：机械工业出版社</span>
          <Divider>详细介绍</Divider>
          <p>
            和第2版相比，本版内容上大的变化是，从以IA32和x86-64为基础转变为完全以x86-64为基础。主要更新如下： 基于x86-64，大量地重写代码，首次介绍对处理浮点数据的程序的机器级支持。
            处理器体系结构修改为支持64位字和操作的设计。 引入更多的功能单元和更复杂的控制逻辑，使基于程序数据流表示的程序性能模型预测更加可靠。
            扩充关于用GOT和PLT创建与位置无关代码的讨论，描述了更加强大的链接技术（比如库打桩）。 增加了对信号处理程序更细致的描述，包括异步信号安全的函数等。
            采用新函数，更新了与协议无关和线程安全的网络编程。
          </p>
          <Card className="flex-row justify-between align-center w-92/100 rounded-md bg-orange-100">
            <div>抢购价</div>
            <div className="text-2xl text-orange-500">￥{data.price}</div>
          </Card>
          <div className="flex-row justify-start w-9/10 pl-5">
            <Button className="mr-5 bg-orange-500 text-white rounded-md mt-5 w-24">立即购买</Button>
            <Button
              className="mr-5 bg-orange-100 text-black rounded-md mt-5 w-28"
              onClick={() => {
                dispatch(addCart({id: data.id, name: data.name, price: data.price, number: 1}));
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
              uname: "Xiaoyun",
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
