import React, {useState, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Button } from 'antd';
import UserDrawer from './components/UserDrawer'
import SearchDrawer from './components/SearchDrawer'
import {api} from './API/api'

function App() {
  
  let userDrawerKey = React.useRef(0)
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 7,
    total: 9,
  });

  window.userToEdit = userToEdit

  const fetchUsers = async() => {
    const res = await api.getUsers(pagination.current, pagination.pageSize)
    setDataSource(res.docs)
    setPagination({
      current: res.page,
      pageSize: 7,
      total: res.totalDocs,
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [pagination.current, visibleUsers])

  const showDrawer = (record) => {
    console.log(record)
    setUserToEdit(record)
    setVisibleUsers(true);
  };

  const onClose = () => {
    setVisibleUsers(false);
    fetchUsers()
    userDrawerKey.current += 1
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
          <a onClick={() => {api.deleteUser(record._id).then(() => {fetchUsers()})}} >Delete</a>
        </>
      ),
    }
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={pagination} onChange={e => {setPagination(e)}} />
      <Button type="primary" onClick={() => setVisibleSearch(true)}>
        Search
      </Button>
      <Button type="primary" onClick={() => showDrawer(null)}>
        Add User
      </Button>
      <SearchDrawer user={userToEdit} visible={visibleSearch} onClose={onClose} />
      <UserDrawer key={userToEdit?._id || userDrawerKey.current} user={userToEdit} visible={visibleUsers} onClose={onClose} />
    </>
  );
}

export default App;
