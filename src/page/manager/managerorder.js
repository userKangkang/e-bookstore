import React from "react";
import {Space, Table, Flex, DatePicker, Button, Image, message, Input} from "antd";

import {useState, useEffect} from "react";
import {getOrders, getAllOrdersByTime, getOrdersByName} from "../../api/orderRelated";
import {set} from "lodash";

const {Search} = Input;

const columns = [
  {
    title: "用户",
    key: "user",
    dataIndex: "user",
    render: (user) => <div>{user}</div>
  },
  {
    title: "订单号",
    key: "orderId",
    dataIndex: "key",
    render: (orderId) => <div>{orderId}</div>
  },
  {
    title: "总价",
    dataIndex: "money",
    key: "money"
  },

  {
    title: "购买时间",
    key: "time",
    dataIndex: "time",
    render: (time) => (
      <Space size="middle">
        <div>{time}</div>
      </Space>
    )
  },
  {
    title: "收货地址",
    key: "address",
    dataIndex: "address",
    render: (address) => <div>{address}</div>
  }
];

const ManagerOrder = () => {
  const id = localStorage.getItem("id");
  const [orders, setOrders] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [date, setDate] = useState([null, null]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      const response = await getOrders(Number(id));
      const orders = response.data.map((order) => {
        return {
          key: order.orderId,
          money: order.money,
          time: order.time,
          address: order.address,
          orderBooks: order.orderBooks,
          user: order.user.username
        };
      });
      setOrders(orders);
    };
    const getOrderByDate = async () => {
      const response = await getAllOrdersByTime(date).then((res) => {
        if (res.code === 1) {
          message.success("根据时间筛选成功");
          const orders = res.data.map((order) => {
            return {
              key: order.orderId,
              money: order.money,
              time: order.time,
              address: order.address,
              orderBooks: order.orderBooks,
              user: order.user.username
            };
          });
          setOrders(orders);
        } else {
          message.error("根据时间筛选失败");
        }
      });
    };
    const getOrderBySearch = async () => {
      const response = await getOrdersByName(search).then((res) => {
        if (res.code === 1) {
          message.success("根据书名筛选成功");
          const orders = res.data.map((order) => {
            return {
              key: order.orderId,
              money: order.money,
              time: order.time,
              address: order.address,
              orderBooks: order.orderBooks,
              user: order.user.username
            };
          });
          setOrders(orders);
        } else {

          message.error("根据书名筛选失败");
        }
      });
    };
    if (search !== "") {
      getOrderBySearch();
    } else if (date[0] === null || date[1] === null) {
      getOrder();
    } else {
      getOrderByDate();
    }
  }, [isRender]);

  return (
    <div className="w-[97%] p-[50px] pt-[20px] self-start h-full">
      <h1>订单管理</h1>
      <Flex style={{width:"100%"}}>
        <Flex style={{marginBottom: "20px"}} align="center">
          <div>根据日期筛选订单：</div>
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
              console.log(isRender);
            }}
          >
            确定
          </Button>
        </Flex>
        <Flex style={{marginBottom: "20px", marginLeft:"10px"}} align="center">
          <div style={{width:"230px", textAlign:"right"}}>根据书名匹配订单：</div>
          <Search
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onSearch={() => {
              setIsRender(!isRender);
            }}
          />
        </Flex>
      </Flex>

      <Table
        columns={columns}
        dataSource={orders}
        expandable={{
          expandedRowRender: (record) => {
            const columns = [
              {title: "书名", dataIndex: "name", key: "name"},
              {title: "数量", dataIndex: "count", key: "count"},
              {title: "单价", dataIndex: "singlePrice", key: "singlePrice"},
              {title: "总价", dataIndex: "price", key: "price"},
              {title: "封面", dataIndex: "path", key: "path", render: (path) => <Image src={path} width="50px" height="50px" />}
            ];
            const data = record.orderBooks.map((orderbook) => {
              return {
                key: orderbook.book_id,
                name: orderbook.book.name,
                count: orderbook.number,
                price: orderbook.prices,
                path: orderbook.book.path,
                singlePrice: orderbook.book.price
              };
            });
            return <Table columns={columns} dataSource={data} pagination={false} />;
          }
        }}
      />
    </div>
  );
};
export default ManagerOrder;
