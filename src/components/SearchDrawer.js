import React, {useState} from 'react'
import {api} from '../API/api'

import { Drawer, Form, Input, Button, Radio } from 'antd';


const { Search } = Input

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

const SearchDrawer = ({user, visible, onClose }) => {    

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
        api.createUser(values).then(res => {
          console.log(res)
          if ( res.status < 300) {
            onClose()
          } else {
            alert(res.response.data.message)
          }
        })
      } else {
        const r = {...user, ...values}
        console.log(r)
        api.updateUser(r)
        onClose()
      }
    };

    return (
    <Drawer
      width={'25vw'}
      placement="left"
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
          <Form.Item name="search" >
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                style={{width: '300px'}}
                onSearch={value => console.log(value)}
            />
          </Form.Item>

          <Form.Item name="radio" >
            <Radio.Group style={{display: 'flex', flexDirection: 'column'}} value={1}>
                <Radio value={1}>
                    First Name
                </Radio>
                <Radio value={2}>
                    Last Name
                </Radio>
                <Radio value={3}>
                    Email
                </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" >
              Search
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    )
}

export default SearchDrawer
