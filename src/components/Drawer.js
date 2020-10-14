import React, {useState} from 'react'
import {api} from '../API/api'

import { Drawer, Form, Input, Button } from 'antd';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Drawer1 = ({user, visible, onClose }) => {    

  const [fields, setFields] = useState([
    {
      name: 'firstName',
      value: user?.firstName,
    },
    {
      name: 'lastName',
      value: user?.lastName,
    },
    {
      name: 'email',
      value: user?.email,
    },
  ]);

    const onFinish = (values) => {
      if (!user) {
        console.log('Success:', values);
        api.createUser(values)
      } else {
        const r = {...user, ...values}
        console.log(r)
        api.updateUser(r)
      }
    };

    return (
    <Drawer
      width={'25vw'}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
        <Form
          name="basic"
          style={{paddingTop: '300px'}}
          fields={fields}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {user ? <h3>Update User Data</h3> : <h3>Add New User</h3>}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Email is invalid"
              },
              {
                required: true,
                message: "Please input your email!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    )
}

export default Drawer1
