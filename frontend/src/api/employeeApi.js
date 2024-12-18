import axios  from 'axios';

const API = axios.create({baseURL:"http://localhost:3000/api/v1"});

const api ={
    getEmployee:()=>API.get("/employee"),
    getEmployeeByCode:(employeecode)=>API.get(`/employee/${employeecode}`),
    createEmployee:(data)=>API.post("/employee",data,{headers:{
        "Content-Type": "multipart/form-data",
    }}),
    updateEmployee:(data,employeecode)=>API.put(`/employee/${employeecode}`,data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }),
    deleteEmployee:(employeecode)=>API.delete(`/employee/${employeecode}`)
}

export default api;