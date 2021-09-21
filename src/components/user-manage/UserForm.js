import React, { forwardRef ,useEffect,useState} from "react"
import { Form, Input, Select } from "antd"

const UserForm = forwardRef((props,ref) => {
  const { option } = Select
  const { regionList, roleList } = props
  const [isDisabled ,setisDisabled] = useState(false)

  useEffect(()=>{
    setisDisabled(props.isUpdateDisabled)
  },[props.isUpdateDisabled])
  return (
    <div>
      <Form ref={ref} layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules= {isDisabled?[]:[
            {
              required: true,
              message: "Please input the title of collection!",
            }
          ]}
        >
          <Select disabled={isDisabled}>
            {regionList.map((item) => (
              <option value={item.value} key={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules= {[
            {
              required: true,
              message: "Please input the title of collection!",
            }
          ]}
        >
          <Select onChange={(value)=>{
            if(value === 1){
              setisDisabled(true)
              ref.current.setFieldsValue({
                region:""
              })
            }else{
              setisDisabled(false)
            }
          }}>
            {roleList.map((item) => (
              <option value={item.id} key={item.id}>
                {item.roleName}
              </option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
})
export default UserForm
