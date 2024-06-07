
import React from "react";
import {Space, Table, DatePicker, Flex, Button, Image, message, Input} from "antd";
import {staticBooks} from "../assets/staticdata";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getOrders, getOrderNumberByUid} from "../api/UserRelated";
import {getOrdersByDate, getOrdersByNameAndUid, getOrderNumberByDate, getOrderNumberByName} from "../api/orderRelated";
import { get, set } from "lodash";

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

  const navigate = useNavigate();

  const id = sessionStorage.getItem("id");
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 30
  });
  const [orderNumber, setOrderNumber] = useState(0);

  const [date, setDate] = useState([null, null]);
  const [isRender, setIsRender] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const getByName = async () => {
      const response = await getOrdersByNameAndUid(search, pagination.current - 1, pagination.pageSize).then((res) => {
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
      }, (e)=>{
        if(e.response.status === 401) {
          message.error("请先登录");
          navigate("/");
        }
        else {
          message.error("网络错误");
        }
      });
    };
    const getByDate = async () => {
      const response = await getOrdersByDate(date, pagination.current - 1, pagination.pageSize).then((res) => {
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
      }, (e)=>{
        if(e.response.status === 401) {
          message.error("请先登录");
          navigate("/");
        }
        else {
          message.error("网络错误");
        }
      });
    };
    const getOrder = async () => {
      const response = await getOrders(pagination.current - 1, pagination.pageSize).then((res) => {
        if (res.code === 1) {
          const orders = res.data.map((order) => {
            return {
              key: order.orderId,
              money: order.money / 100,
              time: order.time,
              address: order.address,
              orderBooks: order.orderBooks
            };
          });
          setOrders(orders);
        } else {
          message.error("获取订单失败");
        }
      }, (e)=>{
        if(e.response.status === 401) {
          message.error("请先登录");
          navigate("/");
        }
        else {
          message.error("网络错误");
        }
      });
    };
    if (search !== "") {
      getByName();
      getOrderNumberByName(search).then((res) => {
        setOrderNumber(res.data);
        setPagination({
          ...pagination,
          total: res.data
        });
      }, (e)=>{
        if(e.response.status === 401) {
          message.error("请先登录");
          navigate("/");
        }
        else {
          message.error("网络错误");
        }
      });
    } else if (date[0] === null || date[1] === null) {
      getOrderNumberByUid().then((res) => {
        setOrderNumber(res.data);
        setPagination({
          ...pagination,
          total: res.data
        })
      }, (e)=>{
        if(e.response.status === 401) {
          message.error("请先登录");
          navigate("/");
        }
        else {
          message.error("网络错误");
        }
      });
      getOrder();
    } else {
      getByDate();
      getOrderNumberByDate(date).then((res) => {
        setOrderNumber(res.data);
        setPagination({
          ...pagination,
          total: res.data
        });
      }, (e)=>{
        if(e.response.status === 401) {
          message.error("请先登录");
          navigate("/");
        }
        else {
          message.error("网络错误");
        }
      });
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
        onChange={(pagi)=>{setPagination({
          ...pagi,
          total: pagination.total
        }); setIsRender(!isRender);}}
        pagination={pagination}
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
                price: orderbook.prices / 100,
                path: orderbook.book.path,
                singlePrice: orderbook.book.price / 100
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
