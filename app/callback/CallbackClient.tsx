"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  font-size: 2rem;
  color: #4d3000;
  margin-bottom: 1rem;
  font-weight: 700;  
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  margin-bottom: 1rem;
`;

const Info = styled.p`
  font-size: 1rem;
  color: #333;
  font-weight: 500;  
`;

interface GitHubUser {
    login: string;
    avatar_url: string;
    email: string | null;
}

export default function CallbackPage() {
    const searchParams = useSearchParams();
    const [userInfo, setUserInfo] = useState<GitHubUser| null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams.get("code");
        if (!code) {
            setError("No code found in URL.");
            return;
        }

        (async () => {
            try {
                const tokenRes = await fetch("/api/exchange", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });

                const tokenData = await tokenRes.json();
                const accessToken = tokenData.access_token;

                if (!accessToken) {
                    setError("Failed to retrieve access token.");
                    return;
                }

                const userRes = await fetch("https://api.github.com/user", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        Accept: "application/json",
                    },
                });

                const user = await userRes.json();
                setUserInfo(user);
            } catch (err) {
                console.error(err);
                setError("An error occurred during OAuth flow.");
            }
        })();
    }, [searchParams]);

    if (error) return <p>{error}</p>;
    if (!userInfo) return <p>Loading user info...</p>;

    return (
        <Wrapper>
            <Title>Welcome, {userInfo.login}!</Title>
            <Avatar  src={userInfo.avatar_url} alt="avatar" width={100} />
            <Info>Email: {userInfo.email || "Not public"}</Info>
        </Wrapper>
    );
}
