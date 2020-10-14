import React, {useState} from 'react'

import { Drawer, Form, Input, Button, Radio } from 'antd';

const options = [
  { label: 'Ascending ', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

const SearchDrawer = ({user, visible, params, setParams, onClose }) => {    

  const [fields, setFields] = useState([
    {
      name: 'phrase',
      value: params.phrase,
    },
    {
      name: 'sortBy',
      value: params.sortBy,
    },
    {
      name: 'dir',
      value: params.dir,
    },
  ]);

  const onFinish = (values) => {
    setParams(values)
  };
  React.useEffect(() => {
    onClose()
  }, [params])

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
        <Form.Item name="phrase" >
          <Input
              placeholder="input search text"
              size="large"
          />
        </Form.Item>

        <Form.Item name="dir" >
          <Radio.Group
            options={options}
            optionType="button"
          />
        </Form.Item>

        <Form.Item name="sortBy" >
          <Radio.Group style={{display: 'flex', flexDirection: 'column'}}>
              <Radio value={'firstName'}>
                  First Name
              </Radio>
              <Radio value={'lastName'}>
                  Last Name
              </Radio>
              <Radio value={'email'}>
                  Email
              </Radio>
          </Radio.Group>
        </Form.Item>

        

        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Search
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default SearchDrawer
