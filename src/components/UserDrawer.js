import React, {useState} from 'react'
import {api} from '../API/api'

import { Drawer, Form, Input, Button } from 'antd';

const UserDrawer = ({user, visible, onClose }) => {    

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
      api.createUser(values).then(res => {
        if ( res.status < 300) {
          onClose()
        } else {
          alert(res.response?.data?.message || 'Something went wrong')
        }
      })
    } else {
      api.updateUser({...user, ...values}).then(res => {
        console.log(res)
        if ( res.status < 300) {
          onClose()
        } else {
          alert(res.response?.data?.message || 'Something went wrong')
        }
      })
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
        {user ? <h2>Update User Data</h2> : <h2>Add New User</h2>}
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
          label="Your email"
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default UserDrawer
