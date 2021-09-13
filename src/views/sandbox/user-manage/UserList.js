import React, { useEffect, useState } from 'react'
import {Table,Button,Modal,Switch} from 'antd'
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

import axios from 'axios'

const {confirm} = Modal

export default function UserList(){
  const [dataSource,setdataSource]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/users?_expand=role").then(res=>{
      setdataSource(res.data)
    })
   },[])
  const columns=[ {
    title: '区域',
    dataIndex: 'region',
    render:(region)=>{
     return<b>{region===''?'全球':region}</b>
    }
  },
  {
    title: '角色名称',
    dataIndex: 'roleId',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '用户状态',
    dataIndex: 'roleState',
    render:(key)=>{
      return <Switch color="orange">{key}</Switch>
    }
  },
  {
    title: '操作',
    render:(item)=>{
      return <div>
              <Button danger shape="circle" icon={<DeleteOutlined />} 
              onClick={()=>confirmMethod(item)}/>
              <Button type="primary" shape="circle" icon={<EditOutlined />}
                />                      
      </div>
    }
  }
]
const confirmMethod = (item) =>{
  confirm({
    title: '你确定要删除吗？',
    icon: <ExclamationCircleOutlined />,
    // content: 'Some descriptions',
    onOk() {
      deleteMethod(item)
          },
    onCancel() {
      console.log('Cancel');
    },
  });
}  
const deleteMethod = (item) =>{
  //删除的时候哦，不经当前页面同步删除状态，后端的数据也需要删除
        setdataSource(dataSource.filter(data=>data.id!==item.id))
        axios.delete(`http://localhost:5000/users/${item.id}`)
       
    }





   
  return(
    <div>
      <Button type="primary">添加用户</Button>
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}}
      rowKey={(item)=>item.id}></Table>
    </div>
  )
}