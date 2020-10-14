import React, {useState, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Button, Spin } from 'antd';
import UserDrawer from './components/UserDrawer'
import SearchDrawer from './components/SearchDrawer'
import {api} from './API/api'

function App() {
  
  let userDrawerKey = React.useRef(0)
  const [showSpinner, setShowSpinner] = useState(false);

  const [visibleSearch, setVisibleSearch] = useState(true);
  const [visibleUsers, setVisibleUsers] = useState(false);

  const [userToEdit, setUserToEdit] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 7,
    total: 9,
    position: ["bottomCenter"],
  });
  const [params, setParams] = useState({
    sortBy: 'firstName', 
    dir: 'asc', 
    phrase: '',
  })

  const fetchUsers = async() => {
    setShowSpinner(true)
    const res = await api.getUsers(pagination, params)
    setDataSource(res.docs)
    setPagination({
      ...pagination,
      current: res.page,
      pageSize: res.limit,
      total: res.totalDocs,
    })
    setShowSpinner(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [pagination.current])

  const showDrawer = (record) => {
    setUserToEdit(record)
    setVisibleUsers(true);
  };

  const onClose = () => {
    setVisibleUsers(false);
    setVisibleSearch(false);
    fetchUsers()
    userDrawerKey.current += 1
  };
  
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstname',
      sorter: (a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastname',
      sorter: (a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <a onClick={() => {showDrawer(record)}} >Edit</a>
          <a onClick={() => {
            setShowSpinner(true)
            api.deleteUser(record._id).then(() => {fetchUsers()})
          }} >Delete</a>
        </>
      ),
    }
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={pagination} onChange={e => {setPagination(e)}} />
      <div className='btn__wrapper'>
        <Button type="primary" onClick={() => setVisibleSearch(true)}>
          Search
        </Button>
        <Button type="primary" onClick={() => showDrawer(null)}>
          Add User
        </Button>
      </div> 
      {showSpinner && <div className='spinner'>
        <Spin size="large" />
      </div>}
      <SearchDrawer user={userToEdit} visible={visibleSearch} params={params} setParams={setParams} onClose={onClose} />
      <UserDrawer key={userToEdit?._id || userDrawerKey.current} user={userToEdit} visible={visibleUsers} onClose={onClose} setShowSpinner={setShowSpinner} />
    </>
  );
}

export default App;
