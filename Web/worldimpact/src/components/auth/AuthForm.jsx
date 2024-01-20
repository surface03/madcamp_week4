import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";


/**
 * 회원가입 또는 로그인 폼
 */

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: #fff123;
        margin-bottom: 1rem; 
    }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input` 
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #14fd3d;
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus{
        color: $oc-teal-7;
        border-bottom: 1px solid #678321;
    }
    & + & {
        margin-top: 1rem;
    } 
`;

/**
 * Button 커스텀
 */
const FullWidthButton = styled(Button)`
    && {
        width: 100%;
        margin-top: 1rem;
         background-color: #add8e6;
    }
`;

/**
 *  폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: #534222;
        text-decoration: underline;
        &:hover{
            color: #534221;
        }
    }
`;

const textMap = {
    login: 'Login',
    register: 'Sign up',
};

const AuthForm = ({ type, formData, onChange, onSubmit }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput 
                autoComplete="username" 
                name='id' 
                placeholder='ID'
                value={formData.id}
                onChange={onChange}
                />

                <StyledInput
                    autoComplete='new-password'
                    name='password'
                    placeholder='password'
                    type='password'
                    value={formData.password}
                    onChange={onChange}
                />

                { type === 'register' && (
                    <StyledInput
                        autoComplete='new-password'
                        name='passwordConfirm'
                        placeholder='Confirm password'
                        type='password'
                        value={formData.passwordConfirm}
                        onChange={onChange}
                    />
                )}

                <FullWidthButton 
                variant="contained"
                onClick={onSubmit}
                >
                    {text}
                </FullWidthButton>

            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register">Sign up</Link>
                ): (
                    <Link to="/login">Login</Link>
                )}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;