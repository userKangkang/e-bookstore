import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, add} from "../store/modules/counterStore";
import React from "react";
import {Space, Table, DatePicker, Flex, Button, Image, message, Input} from "antd";
import {staticBooks} from "../assets/staticdata";
import {useState, useEffect} from "react";
import {getOrders} from "../api/getUserRelated";
import {getOrdersByDate, getOrdersByNameAndUid} from "../api/orderRelated";

const {Search} = Input;

const columns = [
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

const Order = () => {
  const id = localStorage.getItem("id");
  const [orders, setOrders] = useState([]);

  const [date, setDate] = useState([null, null]);
  const [isRender, setIsRender] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const getByName = async () => {
      const response = await getOrdersByNameAndUid(search, Number(id)).then((res) => {
        if (res.code === 1) {
          message.success("根据书名筛选成功");
          const orders = res.data.map((order) => {
            return {
              key: order.orderId,
              money: order.money,
              time: order.time,
              address: order.address,
              orderBooks: order.orderBooks
            };
          });
          setOrders(orders);
        } else {
          message.error("根据书名筛选失败");
        }
      });
    };
    const getByDate = async () => {
      const response = await getOrdersByDate(Number(id), date).then((res) => {
        if (res.code === 1) {
          message.success("根据时间筛选成功");
          const orders = res.data.map((order) => {
            return {
              key: order.orderId,
              money: order.money,
              time: order.time,
              address: order.address,
              orderBooks: order.orderBooks
            };
          });
          setOrders(orders);
        } else {
          message.error("根据时间筛选失败");
        }
      });
    };
    const getOrder = async () => {
      const response = await getOrders(Number(id)).then((res) => {
        if (res.code === 1) {
          const orders = res.data.map((order) => {
            return {
              key: order.orderId,
              money: order.money,
              time: order.time,
              address: order.address,
              orderBooks: order.orderBooks
            };
          });
          setOrders(orders);
        } else {
          message.error("获取订单失败");
        }
      });
    };
    if (search !== "") {
      getByName();
    } else if (date[0] === null || date[1] === null) {
      getOrder();
    } else {
      getByDate();
    }
  }, [isRender]);

  return (
    <div className="w-[95%] p-[50px] self-start h-full">
      <Flex style={{width: "100%"}}>
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
            }}
          >
            确定
          </Button>
        </Flex>
        <Flex style={{marginBottom: "20px", marginLeft: "10px"}} align="center">
          <div style={{width: "230px", textAlign: "right"}}>根据书名匹配订单：</div>
          <Search
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onSearch={(e) => {
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
export default Order;
