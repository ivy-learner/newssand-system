import React ,{useEffect, useState} from 'react'
import {Table,Tag,Button,Modal,Popover, Switch} from 'antd'
import axios from 'axios'
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

const {confirm} = Modal


export default function RightList(){
  const [dataSource, setdataSource] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/rights?_embed=children").then
    (res=>{
      const list=res.data
      list.forEach(item=>{
        if(item.children.length===0){
          item.children=""
        }
      })
      setdataSource(list)
    })
  },[])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
       return<b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key)=>{
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return <div>
                <Button danger shape="circle" icon={<DeleteOutlined />} 
                onClick={()=>confirmMethod(item)}/>
                <Popover content={<div style={{textAlign:"center"}}>
                  <Switch checked={true}></Switch></div>} title="配置项" trigger={item.pagepermisson===undefined?'':'click'}>
                <Button type="primary" shape="circle" icon={<EditOutlined />} 
                disabled={item.pagepermisson === undefined}/>
               </Popover>
        </div>
      }
    },
  ];
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
     if(item.grade===1){
      setdataSource(dataSource.filter(data=>data.id!==item.id))
      axios.delete(`http://localhost:5000/rights/${item.id}`)
     }else{
      //  console.log(item.rightId)
       let list=dataSource.filter(data=>data.id===item.rightId)
      //  console.log(list)
       list[0].children=list[0].children.filter(data=>data.id!==item.id)
       setdataSource([...dataSource])
       axios.delete(`http://localhost:5000/children/${item.id}`)
     }
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize:'5'}} />
    </div>
  )
}