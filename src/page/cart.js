import React from "react";
import {Space, Table, Input, InputNumber, Button, message, Flex, ConfigProvider} from "antd";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getCarts, removeCart, removeAllCart, updateSingleCartNumber} from "../api/CartRelated";
import CartBuyModal from "../components/modals/cartBuyModal";
import {set} from "lodash";

const {Search} = Input;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const id = sessionStorage.getItem("id");

  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      getCarts(id).then(
        (res) => {
          const carts = res.data.map((cart) => {
            return {
              key: cart.id,
              book_id: cart.book_id,
              path: cart.book.path,
              name: cart.book.name,
              prices: cart.prices,
              number: cart.number,
              address: cart.address
            };
          });
          setCart(carts);
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
    getCart();
  }, [isRender]);

  const columns = [
    {
      title: "图片",
      dataIndex: "path",
      key: "path",
      render: (path) => <img src={path} className="w-20" />
    },
    {
      title: "书名",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "价格",
      dataIndex: "prices",
      key: "prices",
      render: (prices) => <span>{prices / 100}元</span>
    },
    {
      title: "数量",
      key: "number",
      render: (data) => (
        <InputNumber
          min={1}
          max={10}
          defaultValue={data.number}
          onChange={(value) => {
            data.number = value;
          }}
        />
      )
    },
    {
      title: "操作",
      key: "action",
      render: (data) => {
        return (
          <Space size="middle">
            <CartBuyModal
              books={[
                {
                  book_id: data.book_id,
                  path: data.path,
                  name: data.name,
                  prices: data.prices,
                  number: data.number
                }
              ]}
              text="直接购买"
              removeCart={() => {
                removeCart(data.key).then(
                  (res) => {
                    if (res.code) {
                      message.success("删除成功");
                      setIsRender(!isRender);
                    } else {
                      message.error("删除失败");
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
              }}
            />
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimaryBorderHover: "#f5222d",
                    colorPrimaryHover: "#f5222d",
                    colorPrimary: "#f5222d",
                    colorPrimaryActive: "#f5222d",
                    colorPrimaryTextHover: "#f5222d"
                  }
                }
              }}
            >
              <Button
                style={{borderRadius: "5px"}}
                type="primary"
                onClick={() => {
                  removeCart(data.key).then(
                    (res) => {
                      if (res.code) {
                        message.success("删除成功");
                        setIsRender(!isRender);
                      } else {
                        message.error("删除失败");
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
                }}
              >
                删除
              </Button>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimaryBorderHover: "#ffc069",
                    colorPrimaryHover: "#ffc069",
                    colorPrimary: "#ffc069",
                    colorPrimaryActive: "#ffc069",
                    colorPrimaryTextHover: "#ffc069"
                  }
                }
              }}
            >
              <Button
                style={{
                  borderRadius: "5px"
                }}
                type="primary"
                onClick={() => {
                  updateSingleCartNumber(data.key, data.number).then(
                    (res) => {
                      if (res.code) {
                        message.success("修改成功");
                        setIsRender(!isRender);
                      } else {
                        message.error("修改失败");
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
                }}
              >
                保存修改
              </Button>
            </ConfigProvider>
          </Space>
        );
      }
    }
  ];
  return (
    <div className="w-[95%] p-[20px] self-start h-full">
      <Flex style={{width: "100%", height: "90px"}} justify="space-around" align="center">
        <Search placeholder="input search text" allowClear enterButton="Search" size="large" className=" w-[75%] bg-green-400" />
        <CartBuyModal
          books={cart}
          text="全部购买"
          removeCart={() => {
            removeAllCart(id).then(
              (res) => {
                if (res.code) {
                  message.success("删除成功");
                  setIsRender(!isRender);
                } else {
                  message.error("删除失败");
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
          }}
        />
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimaryBorderHover: "#f5222d",
                colorPrimaryHover: "#f5222d",
                colorPrimary: "#f5222d",
                colorPrimaryActive: "#f5222d",
                colorPrimaryTextHover: "#f5222d"
              }
            }
          }}
        >
          <Button
            style={{borderRadius: "5px"}}
            type="primary"
            onClick={() => {
              removeAllCart(id).then(
                (res) => {
                  if (res.code) {
                    message.success("删除成功");
                    setIsRender(!isRender);
                  } else {
                    message.error("删除失败");
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
            }}
            disabled={cart.length === 0}
          >
            全部删除
          </Button>
        </ConfigProvider>
      </Flex>
      <Table columns={columns} dataSource={cart} />
    </div>
  );
};
export default Cart;
