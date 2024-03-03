import React from 'react';
import {Card, Space, Divider, Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
const Comment = ({comment}) => {
  const user = (
    <div className="flex flex-row items-center">
      <Avatar size="large" src={comment.avatar} />
      <p className="ml-[20px]">{comment.uname}</p>
    </div>
  );
  return (
    <Space direction="vertical" className="w-full">
      <Card title={user} extra={<a href="#">Like</a>} className=" w-full">
        <p>{comment.text}</p>
      </Card>
    </Space>
  );
};

export default Comment;
