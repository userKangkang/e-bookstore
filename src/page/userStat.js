import React from "react";
import {Space, Table, Flex, DatePicker, Button, Image, message, Input} from "antd";

import {useState, useEffect} from "react";
import { getUserStat } from "../api/getUserRelated";

const {Search} = Input;

const columns = [
  {
    title: "书名",
    dataIndex: "bookName",
    key: "bookName",
    render: (bookName) => <div>{bookName}</div>
  },
  {
    title: "数量",
    key: "number",
    dataIndex: "number",
    render: (number) => <div>{number}</div>
  },
  {
    title: "总金额",
    key: "money",
    dataIndex: "money",
    render: (money) => <div>{money}</div>
  },
  {
    title: "封面",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => <Image src={avatar} width="50px" height="50px" />
  },

  {
    title: "作者",
    key: "author",
    dataIndex: "author",
    render: (author) => (
      <Space size="middle">
        <div>{author}</div>
      </Space>
    )
  }
];

const UserStat = () => {
  const id = localStorage.getItem("id");
  const [stats, setStats] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [date, setDate] = useState([null, null]);
  const [sum, setSum] = useState(0);
  const [total, setTotal] = useState(0);

  const sumFunc = (arr) => {
    return arr.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  };

  useEffect(() => {
    if (date[0] && date[1])
      getUserStat(Number(id), date).then((res) => {
        setStats(res.data);
        setSum(sumFunc(res.data.map((item) => item.money)));
        setTotal(sumFunc(res.data.map((item) => item.number)));
      });
  }, [isRender]);

  return (
    <div className="w-[97%] p-[50px] pt-[20px] self-start h-full">
      <h1>统计用户消费情况</h1>
      <Flex style={{width: "100%"}}>
        <Flex style={{marginBottom: "20px"}} align="center">
          <div>根据日期获取消费情况：</div>
          <DatePicker.RangePicker
            placeholder={["", "Till Now"]}
            allowEmpty={[false, true]}
            onChange={(_, dateString) => {
              setDate(dateString);
            }}
          />
          <Button
            type="primary"
            style={{marginLeft: "5px",marginRight:"20px"}}
            onClick={() => {
              setIsRender(!isRender);
            }}
          >
            确定
          </Button>
          <div>总金额：{sum}￥</div>
          <div style={{marginLeft: "20px"}}>总数量：{total}</div>
        </Flex>
      </Flex>

      <Table columns={columns} dataSource={stats} />
    </div>
  );
};
export default UserStat;
