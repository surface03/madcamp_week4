import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const colors = {
  primary: '#305f72',
  secondary: '#5f879e',
  accent: '#ffa500',
  background: '#f4f4f4',
  text: '#333',
  error: '#ff3860',
};

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid ${colors.accent};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  margin-top: 1rem;
  &:focus {
    border-bottom: 2px solid ${colors.primary};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const AuthFormBlock = styled.div`
  background-color: ${colors.background};
  padding: 3rem; // Increased padding
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
  // You can also add a specific width or max-width if needed
  // width: 500px;
  // max-width: 90%;
  // ...
`;

const FullWidthButton = styled(Button)`
  && {
    width: 100%;
    margin-top: 1rem;
    background-color: ${colors.accent};
    color: white;
    &:hover {
      background-color: ${colors.secondary};
    }
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${colors.text};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  &.MuiToggleButtonGroup-root {
    margin-top: 1rem;
    display: block;
  }
`;

const StyledToggleButton = styled(ToggleButton)`
  &&& {
    border-color: ${colors.accent};
    color: ${colors.text};
    font-size: 0.8rem; // Smaller font size
    padding: 5px 5px; // Smaller padding
    // You can also adjust the height and width if needed
    // height: 30px;
    // width: auto; // or a specific width
    &.Mui-selected {
      background-color: ${colors.primary};
      color: white;
    }
    &:hover {
      background-color: ${colors.secondary};
    }
  }
`;

const AuthForm = ({ type, formData, onChange, onGenderChange, onPoliticalChange, onSubmit }) => {
  const text = type === 'login' ? 'Login' : 'Sign up';

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={onChange}
        />
        {type === 'register' && (
          <>
            <StyledInput
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={onChange}
            />
            <StyledInput
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={onChange}
            />
            <StyledToggleButtonGroup
            value={formData.gender}
            exclusive
            onChange={onGenderChange}
            aria-label="gender"
            >
            <StyledToggleButton value="male" aria-label="male">
                Male
            </StyledToggleButton>
            <StyledToggleButton value="female" aria-label="female">
                Female
            </StyledToggleButton>
            </StyledToggleButtonGroup>

            <StyledToggleButtonGroup
                value={formData.politicalOrientation}
                exclusive
                onChange={onPoliticalChange}
                aria-label="politicalOrientation"
            >
            <StyledToggleButton value="conservative" aria-label="conservative">
                Cons
            </StyledToggleButton>
            <StyledToggleButton value="progressive" aria-label="progressive">
                Prog
            </StyledToggleButton>
            <StyledToggleButton value="moderate" aria-label="moderate">
                Mod
            </StyledToggleButton>
            <StyledToggleButton value="unawareness" aria-label="unawareness">
                Unaware
            </StyledToggleButton>
            </StyledToggleButtonGroup>
            
          </>
        )}
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={onChange}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            type="password"
            value={formData.passwordConfirm}
            onChange={onChange}
          />
        )}
        <FullWidthButton
          variant="contained"
          type="submit"
        >
          {text}
        </FullWidthButton>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">Sign up</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
