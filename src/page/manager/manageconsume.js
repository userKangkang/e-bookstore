import React from "react";
import {Space, Table, Flex, DatePicker, Button, Image, message, Input} from "antd";

import {useState, useEffect} from "react";
import {getUserRank} from "../../api/ManagerRelated";

const {Search} = Input;

const columns = [
  {
    title: "购买金额排名",
    dataIndex: "moneyRank",
    rowScope: "row"
  },
  {
    title: "购买数量排名",
    dataIndex: "numberRank",
    rowScope: "row"
  },
  {
    title: "用户名",
    key: "username",
    dataIndex: "username",
    render: (username) => <div>{username}</div>
  },
  {
    title: "累计购买金额",
    key: "money",
    dataIndex: "money",
    render: (money) => <div>{money / 100}</div>,
    sorter: (a, b) => a.money - b.money,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "累计购买数量",
    dataIndex: "bookNumber",
    key: "bookNumber",
    render: (number) => <div>{number}</div>,
    sorter: (a, b) => a.bookNumber - b.bookNumber,
    sortDirections: ["descend", "ascend"]
  }
];

const ManageConsume = () => {
  const id = sessionStorage.getItem("id");
  const [ranks, setRanks] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [date, setDate] = useState([null, null]);

  useEffect(() => {

    if (date[0] && date[1])
      getUserRank(date).then((res) => {
        setRanks(res.data);
      });
  }, [isRender]);

  return (
    <div className="w-[97%] p-[50px] pt-[20px] self-start h-full">
      <h1>榜单管理</h1>
      <Flex style={{width: "100%"}}>
        <Flex style={{marginBottom: "20px"}} align="center">
          <div>根据日期获取消费榜：</div>
          <DatePicker.RangePicker
            placeholder={["", "Till Now"]}
            allowEmpty={[false, true]}
            onChange={(_, dateString) => {
              setDate(dateString);
            }}
          />
          <Button
            type="primary"
            style={{marginLeft: "5px"}}
            onClick={() => {
              setIsRender(!isRender);
            }}
          >
            确定
          </Button>
        </Flex>
      </Flex>

      <Table
        columns={columns}
        dataSource={ranks}
        showSorterTooltip={{
          target: "sorter-icon"
        }}
      />
    </div>
  );
};
export default ManageConsume;
