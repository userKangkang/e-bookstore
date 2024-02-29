import React from 'react';
import {Divider, Form, Radio, Select, Input, Button} from 'antd';
import FormatInput from './formatinput';
const {TextArea} = Input;

const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const Reservation = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '55%',
        alignItems: 'center'
      }}
    >
      <h2
        style={{
          color: 'green',
          alignSelf: 'center'
        }}
      >
        立即预约
      </h2>
      <Divider />
      <h3 style={{display: 'block', alignSelf: 'start'}}>学员信息：</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <FormatInput id="name" label="姓名：" />
        <div>
          <label for="gender">性别：</label>
          <Radio.Group id="gender">
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </div>
        <FormatInput id="phone" label="手机：" />
        <FormatInput id="email" label="邮箱：" />
        <FormatInput id="wechat" label="微信：" />
        <div>
          <label for="university">需求科目：</label>
          <Select
            showSearch
            placeholder="请选择你的科目"
            optionFilterProp="children"
            filterOption={filterOption}
            style={{
              marginBottom: '20px'
            }}
            options={[
              {
                value: 'chinese',
                label: '语文'
              },
              {
                value: 'math',
                label: '数学'
              },
              {
                value: 'english',
                label: '英语'
              }
            ]}
          />
        </div>
        <div>
          <label>学员描述：</label>
          <TextArea rows={4} />
        </div>
        <FormatInput id="address" label="地址：" />
      </div>
      <Divider />
      <h3 style={{display: 'block', alignSelf: 'start'}}>需要这样的老师：</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div
          style={{
            marginBottom: '20px'
          }}
        >
          <label for="gender">性别：</label>
          <Radio.Group id="gender">
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
            <Radio value={3}>均可</Radio>
          </Radio.Group>
        </div>
        <div
          style={{
            marginBottom: '20px'
          }}
        >
          <label for="teacher">老师类型：</label>
          <Radio.Group id="teacher">
            <Radio value={1}>在校大学生</Radio>
            <Radio value={2}>专职老师</Radio>
          </Radio.Group>
        </div>
        <div>
          <label>理想老师：</label>
          <TextArea rows={4} />
        </div>
      </div>
      <Button type="primary" style={{alignSelf: 'center', marginTop: '20px'}}>
        提交
      </Button>
    </div>
  );
};

export default Reservation;
