import React from  'react'
import {Button} from 'antd'
import axios from 'axios'

export default function Home(){
  const ajax =()=>{
  // 取数据
  //   axios.get("http://localhost:8000/posts").then(res =>{
  //     console.log(res.data)
  // })
  //增加 post
  //  axios.post("http://localhost:8000/posts",{
  //    title:"6666",
  //    author:"jhhhh"
  //   })
  //更新 patch
  // axios.patch("http://localhost:8000/posts/1",{
  //   title:"111-修改-1112"
  // }

  //删除
  // axios.delete("http://localhost:8000/posts/1")

  // _embed  新闻关联评论 向下关联
  // axios.get("http://localhost:8000/posts?_embed=comments").then(
  //   res=>{
  //     console.log(res.data)
  //   }
  // )

  //_expand 评论关联新闻 向上关联
  // axios.get("http://localhost:8000/posts?_expand=comments").then(
  //   res=>{
  //     console.log(res.data)
  //   }
  // )
}
   
  return (
    <div>
          <Button type="primary" onClick={ajax}>Button</Button>
    </div>
  )
}
