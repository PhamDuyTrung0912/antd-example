import "./App.css";
import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Typography,
  Form,
  Button,
  Divider,
  List,
  Space,
} from "antd";

function App() {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [todoEdit, setTodoEdit] = useState(null);

  //handleSubmit
  const handleSubmit = (values) => {
    if (!todoEdit) {
      const ObjectData = {
        id: data.length + 1,
        name: values.name,
      };
      setData([...data, ObjectData]);
    } else {
      const rs = data.map((item) => {
        if (item.id === todoEdit.id) {
          return {
            ...item,
            name: values.name,
          };
        }
        return item;
      });
      setData(rs);
      setTodoEdit(null);
    }
    form.resetFields();
  };

  //handleDelete
  const handleDelete = (id) => {
    const rs = data.filter((item) => item.id !== id);
    setData(rs);
  };

  //handleEdit
  const handleEdit = (item) => {
    form.setFieldsValue({
      name: item.name,
    });
    setTodoEdit(item);
  };

  return (
    <div className="App">
      <Title level={2}>Example</Title>
      <Form onFinish={handleSubmit} form={form}>
        <Row>
          <Col span="12">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>
          </Col>
          <Col span="12">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider></Divider>

      <List
        size="small"
        header={<Title level={5}>Todolist</Title>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <React.Fragment>
              <Text>
                {item.id} - {item.name}
              </Text>
              <Space>
                <Button onClick={() => handleEdit(item)} type="primary">
                  Sửa
                </Button>
                <Button onClick={() => handleDelete(item.id)} type="primary">
                  Xóa
                </Button>
              </Space>
            </React.Fragment>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
