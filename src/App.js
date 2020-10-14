import React, {useState, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Button } from 'antd';
import Drawer from './components/Drawer'
import {api} from './API/api'

function App() {
  
  const [visible, setVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 7,
    total: 9,
  });

  window.userToEdit = userToEdit

  useEffect(() => {
    async function func() {
      const res = await api.getUsers(pagination.current, pagination.pageSize)
      setDataSource(res.docs)
      setPagination({
        current: res.page,
        pageSize: 7,
        total: res.totalDocs,
      })
    }
    func()
  }, [pagination.current, visible])

  const showDrawer = (record) => {
    if (record) {
      console.log(record)
      setUserToEdit(record)
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <a onClick={() => {showDrawer(record)}} >Edit</a>
          <a onClick={() => {api.deleteUser(record._id)}} >Delete</a>
        </>
      ),
    }
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={pagination} onChange={e => {setPagination(e)}} />
      <Button type="primary" onClick={() => showDrawer()}>
        Open
      </Button>
      <Drawer key={userToEdit?._id} user={userToEdit} visible={visible} onClose={onClose} />
    </>
  );
}

export default App;
