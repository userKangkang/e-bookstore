import React from 'react';
import {Space, Table, Tag, InputNumber, Button} from 'antd';

function onChange(value) {
  console.log('changed', value);
}

const columns = [
  {
    title: '书名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '数量',
    key: 'number',
    dataIndex: 'number',
    render: () => <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>购买</a>
        <a>删除</a>
      </Space>
    )
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park'
  }
];
const Cart = () => (
  <div className="w-full p-[20px] self-start h-full">
    <Table columns={columns} dataSource={data} />
    <Button className="mt-4 bg-green-500 text-white rounded-lg">全部购买</Button>
  </div>
);
export default Cart;
