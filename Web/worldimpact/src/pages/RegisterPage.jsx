import React, {useState, useEffect} from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const nevigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        name: '1',      // 임시로 넣음
        age: '1',       // 임시로 넣음
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log('회원가입 시도중');
        try{
            const response = await Axios.post('http://localhost:3000/user/signup', 
            formData);  // { withCredentials: true } 없애니까 회원가입됨..
            // 회원가입 성공
            console.log(response.data);
            
            // 회원가입 성공시 로그인 페이지로 이동
            nevigate('/login');

          } catch (error) {
            // 회원가입 실패
            console.error('Signup error:', error);
          }
        };

    return(
        <AuthTemplate>
            <AuthForm 
            type='register'
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            />
        </AuthTemplate>
    );
};

export default RegisterPage;
