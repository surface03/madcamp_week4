import React, { useState, useEffect } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

import useUserStore from "../modules/userStore";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: "", password: "" });

    // Zustand store's isLoggedIn state
    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    const setLoginStatus = useUserStore(state => state.setLoginStatus);

    useEffect(() => {
        console.log("isLoggedIn changed to: ", isLoggedIn);
        // Additional code can be added here if you want to perform actions when isLoggedIn changes
    }, [isLoggedIn]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt');
        try {
            const { id, password } = formData;
            // Get request
            const response = await Axios.get('http://localhost:3000/user/login', { params: { id, password } });
            console.log(response.data);
            //console.log(response.data.message);

            // 서버에서 받은 사용자 정보를 sessionStroage에 저장
            sessionStorage.setItem('user', response.data.user);
            console.log("저장된 사용자 ID:", sessionStorage.getItem("user"));

            // Zustand 사용해서 user state update
            setLoginStatus(true);

            // 로그인 성공시 다음 화면으로 넘어가게 하는 코드 
            navigate('/');


        } catch (error) {
            // 로그인 에러
            setLoginStatus(false);
            console.error('Login error:', error);
        }
    };

    return (
        <AuthTemplate>
            <AuthForm 
                type="login" 
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </AuthTemplate>
    );
};

export default LoginPage;