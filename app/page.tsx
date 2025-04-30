"use client";

import styled from "styled-components";

const Wrapper = styled.main`
  height: 100vh;
  background: linear-gradient(135deg, #fff7d6, #ffe4b5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Courier New", sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #4d3000;
  font-weight: 900;  
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4d3000;
  margin-bottom: 2rem;
  font-weight: 700;  
`;

const LoginButton = styled.button`
  background-color: #ffb347;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
  font-weight: 700;
  &:hover {
    background-color: #ffa033;
  }
`;

export default function HomePage() {
  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "your_client_id_here";
    const redirect_uri = "http://localhost:3000/callback";
    const scope = "read:user user:email";

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;

    window.location.href = authUrl;
  };

  return (
      <Wrapper>
          <Title>Welcome to MP6 OAuth App</Title>
          <Subtitle>Click below to log in with GitHub.</Subtitle>
            <LoginButton onClick={handleLogin}>
            Log in with GitHub </LoginButton>
      </Wrapper>
  );
}
