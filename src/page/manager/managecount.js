import React from "react";
import {Space, Table, Flex, DatePicker, Button, Image, message, Input} from "antd";

import {useState, useEffect} from "react";
import {getBookRank} from "../../api/ManagerRelated";

const {Search} = Input;

const columns = [
  {
    title: "排名",
    dataIndex: "rank",
    rowScope: "row",
  },
  {
    title: "书名",
    key: "name",
    dataIndex: "name",
    render: (name) => <div>{name}</div>
  },
  {
    title: "销量",
    key: "totalNumber",
    dataIndex: "totalNumber",
    render: (totalNumber) => <div>{totalNumber}</div>
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

const ManageCount = () => {
  const id = localStorage.getItem("id");
  const [ranks, setRanks] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [date, setDate] = useState([null, null]);

  useEffect(() => {

    if (date[0] && date[1])
      getBookRank(date).then((res) => {
        setRanks(res.data);
      });
  }, [isRender]);

  return (
    <div className="w-[97%] p-[50px] pt-[20px] self-start h-full">
      <h1>榜单管理</h1>
      <Flex style={{width: "100%"}}>
        <Flex style={{marginBottom: "20px"}} align="center">
          <div>根据日期获取热销榜：</div>
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

      <Table columns={columns} dataSource={ranks} />
    </div>
  );
};
export default ManageCount;
