import React from 'react';
import {Table, Button, Radio, Space, DatePicker, Checkbox, Select} from 'antd';
import FormatInput from './formatinput.js';
import UploadImg from './uploadimg.js';

// 多选框的选项

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

const gradeOptions = [
  {label: '小学', value: 'primary'},
  {label: '初中', value: 'junior'},
  {label: '高中', value: 'senior'},
]

const areaOptions = [
  {label: '黄浦', value: 'huangpu'},
  {label: '静安', value: 'jingan'},
  {label: '徐汇', value: 'xuhui'},
  {label: '长宁', value: 'changning'},
  {label: '普陀', value: 'putuo'},
  {label: '虹口', value: 'hongkou'},
  {label: '杨浦', value: 'yangpu'},
  {label: '闵行', value: 'minhang'},
  {label: '宝山', value: 'baoshan'},
  {label: '嘉定', value: 'jiading'},
  {label: '浦东', value: 'pudong'},
  {label: '青浦', value: 'qingpu'},
  {label: '奉贤', value: 'fengxian'},
  {label: '金山', value: 'jinshan'},
  {label: '崇明', value: 'chongming'},
]

// 用在选择大学的逻辑函数，在填写部分信息的时候会自动匹配含有填入信息的字符串

const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

// 最终组件

const EditProfile = () => {
  return (
    <div
      style={{
        width: "70%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h1
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "24px",
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        新老师您好！
      </h1>
      {/* 从这下面开始是正式确定要填入的内容，绿色的组件基本上是ant design那边抄过来的 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <label style={{width: "80px"}}>上传照片：</label>
        <UploadImg />
      </div>
      {/* FormatInput是我封装的一个Input输入框，在component文件夹内有 */}
      <FormatInput id="username" label="姓名：" />
      <div>
        {/* 单选 */}
        <label for="gender">性别：</label>
        <Radio.Group id="gender">
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </Radio.Group>
      </div>

      <FormatInput id="email" label="邮箱：" />
      <FormatInput id="phone" label="手机：" />
      <Space direction="horizontal" style={{marginBottom: "20px"}}>
        <label for="birthday">生日：</label>
        {/* 日期选择器 */}
        <DatePicker id="birthday" />
      </Space>
      <div className=" mb-[20px]">
        <label for="subject">您打算教：</label>
        {/* 多选 */}
        <Checkbox.Group id="grade" options={gradeOptions} />
      </div>
      <div className=" mb-[20px]">
        <label for="area">比较合适的家教区域：</label>
        {/* 多选 */}
        <Checkbox.Group id="grade" options={areaOptions} />
      </div>
      <div>
        <label for="subject">擅长科目：</label>
        {/* 多选 */}
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
          marginBottom: "20px"
        }}
        options={[
          {
            value: "jack",
            label: "Jack"
          },
          {
            value: "lucy",
            label: "Lucy"
          },
          {
            value: "tom",
            label: "Tom"
          }
        ]}
      />
      <div>
        <label for="award">所获奖项：</label>
        {/* 这个按钮暂时是无效果的 */}
        <Button style={{backgroundColor: "green", color: "white"}}>添加奖项</Button>
        <Table
          columns={[
            {title: "奖项名称", dataIndex: "name"},
            {title: "科目", dataIndex: "subject"}
          ]}
          dataSource={[]}
        />
      </div>
      <Button style={{alignSelf: "center", marginTop: "20px", backgroundColor: "green", color: "white"}}>保存</Button>
    </div>
  );
};

export default EditProfile;
