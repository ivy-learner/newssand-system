import React, { useEffect, useState } from 'react'
import {Table,Button,Modal,Tree} from 'antd'
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

import axios from 'axios'

const {confirm} = Modal

export default function RoleList(){
  const [dataSource,setdataSource]=useState([])
  const [rightList,setRightList]=useState([])
  const [currentRights,setcurrentRights]=useState([])
  const [currentId,setcurrentId]=useState(0)
  const [isModalVisible,setisModalVisible]=useState(false)
  const columns=[ {
    title: 'ID',
    dataIndex: 'id',
    render:(id)=>{
     return<b>{id}</b>
    }
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '操作',
    render:(item)=>{
      return <div>
              <Button danger shape="circle" icon={<DeleteOutlined />} 
              onClick={()=>confirmMethod(item)}/>
              <Button type="primary" shape="circle" icon={<EditOutlined />}
               onClick={()=>{ setisModalVisible(true) 
                              setcurrentRights(item.rights)
                              setcurrentId(item.id)
                              }
                }/>                      
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
        axios.delete(`http://localhost:5000/roles/${item.id}`)
       
    }
const handleOk = (checkkeys) =>{
  setisModalVisible(false)
  //同步dataSource
  setdataSource(dataSource.map(item=>{
    if(item.id===currentId){
      return {
        ...item,
        rights:currentRights
      }
    }
    return item
  }))
  axios.patch(`http://localhost:5000/roles/${currentId}`,{
  rights:currentRights
})
}

const handleCancel = () =>{
  setisModalVisible(false)
}
const onCheck = (checkkeys) => {
  // console.log(checkkeys)
setcurrentRights(checkkeys.checked)
}
  useEffect(()=>{
       axios.get("http://localhost:5000/roles").then(res=>{
         setdataSource(res.data)
       })
      },[])
   useEffect(()=>{
        axios.get("http://localhost:5000/rights?_embed=children").then(res=>{
          setRightList(res.data)
        })
       },[])   
  return(
    <div>
      <Table dataSource={dataSource} columns={columns} 
      rowKey={(item)=>item.id}></Table>
       <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <Tree
      checkable
      checkedKeys={currentRights}
      onCheck={onCheck}
      checkStrictly={true}
      treeData={rightList}
    />
      </Modal>
    </div>
  )
}