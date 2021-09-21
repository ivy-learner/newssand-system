import React, { useEffect, useState ,useRef} from 'react'
import { Button, PageHeader, Steps,Form,Input,Select } from 'antd'
import axios from 'axios'
import style from './NewsAdd.module.css'
import NewsEditor from '../../../components/news-manage/NewsEditor'
// import http from '../../../util'

const { Step } = Steps
const {Option} = Select
export default function NewsAdd() {
  const [current, setCurrent] = useState(0)
  const [categoryList,setCategoryList] = useState([])

  const NewsForm = useRef(null)

  useEffect(() => {
    axios.get("http://localhost:5000/categories").then(res=>{
      console.log(res.data)
      setCategoryList(res.data)
    })
  })

  const handleNext = () =>{
    if(current === 0){
      NewsForm.current.validateFields().then(res=>{
        setCurrent(current+1)
      }).catch(err=>{
        console.log(err)
      })
    }else{
      setCurrent(current+1)
    }
  }
  const handlePrevious = () =>{
    setCurrent(current-1)
  }
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="撰写新闻"
        subTitle="This is a subtitle"
      />
      <Steps current={current}>
        <Step title="基本信息" description="新闻标题，新闻分类" />
        <Step title="新闻内容" description="新闻主体内容" />
        <Step title="新闻提交" description="保存草稿或者提交审核" />
      </Steps>
     
     <div className={current===0?'':style.active} style={{marginTop:"40px"}}>
     <Form
      {...layout}
      name="basic"
      ref={NewsForm}
    >
      <Form.Item
        label="新闻标题"
        name="title"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="新闻分类"
        name="categoryId"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Select>
          {
            categoryList.map(item=>(
              <Option value={item.title} key={item.id}>{item.title}</Option>
            )
            )
          }

        </Select>
      </Form.Item>
      
    </Form>
     </div>
     <div className={current===1?'':style.active}>
       <NewsEditor></NewsEditor>
     </div>
     <div className={current===2?'':style.active}>
     </div>

      <div style={{marginTop:"50px"}}>
        {
          current === 2 &&  <span> 
           <Button type="primary">保存草稿箱</Button>
           <Button danger>提交审核</Button>
         </span>
        }
        {
          current < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
        } 
        {
          current > 0 && <Button onClick={handlePrevious}>上一步</Button>
        }    
         </div>
    </div>
  )
}