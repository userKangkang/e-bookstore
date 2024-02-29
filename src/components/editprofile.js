import React from 'react';
import {Table, Button, Radio, Space, DatePicker, Checkbox, Select} from 'antd';
import FormatInput from './formatinput.js';
import UploadImg from './uploadimg.js';

const subjectOptions = [
  {label: '语文', value: 'chinese'},
  {label: '数学', value: 'math'},
  {label: '英语', value: 'english'},
  {label: '物理', value: 'physics'},
  {label: '化学', value: 'chemistry'},
  {label: '生物', value: 'biology'},
  {label: '历史', value: 'history'},
  {label: '地理', value: 'geography'},
  {label: '政治', value: 'politics'},
  {label: '计算机', value: 'computer'}
];

const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const EditProfile = () => {
  return (
    <div
      style={{
        width: '70%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <label style={{width: '80px'}}>上传照片：</label>
        <UploadImg />
      </div>

      <FormatInput id="username" label="姓名：" />
      <div>
        <label for="gender">性别：</label>
        <Radio.Group id="gender">
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </Radio.Group>
      </div>

      <FormatInput id="email" label="邮箱：" />
      <FormatInput id="phone" label="手机：" />
      <Space direction="horizontal" style={{marginBottom: '20px'}}>
        <label for="birthday">生日：</label>
        <DatePicker id="birthday" />
      </Space>
      <div>
        <label for="subject">擅长科目：</label>
        <Checkbox.Group id="subject" options={subjectOptions} />
      </div>
      <FormatInput id="Province" label="高考省份：" />
      <label for="university">大学：</label>
      <Select
        showSearch
        placeholder="请选择你的大学"
        optionFilterProp="children"
        filterOption={filterOption}
        style={{
          marginBottom: '20px'
        }}
        options={[
          {
            value: 'jack',
            label: 'Jack'
          },
          {
            value: 'lucy',
            label: 'Lucy'
          },
          {
            value: 'tom',
            label: 'Tom'
          }
        ]}
      />
      <div>
        <label for="award">所获奖项：</label>
        <Button type="primary">添加奖项</Button>
        <Table
          columns={[
            {title: '奖项名称', dataIndex: 'name'},
            {title: '科目', dataIndex: 'subject'}
          ]}
          dataSource={[]}
        />
      </div>
      <Button type="primary" style={{alignSelf: 'center', marginTop: '20px'}}>
        保存
      </Button>
    </div>
  );
};

export default EditProfile;
