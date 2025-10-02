// pages/api/auth/callback.js

import axios from 'axios';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    // 쿼리 파라미터에서 code와 state를 가져옵니다.
    const { code, state } = req.query;

    // CSRF 공격을 막기 위해 실제 프로덕션에서는 state 값을 검증해야 합니다.
    // 예: 세션에 저장해둔 state와 받아온 state가 일치하는지 확인

    if (!code) {
        return res.status(400).send('Authorization code is missing.');
    }

    const {
        CHZZK_CLIENT_ID,
        CHZZK_CLIENT_SECRET,
    } = process.env;

    const tokenUrl = 'https://openapi.chzzk.naver.com/auth/v1/token';

    try {
        // 인증 코드를 사용해 Access Token을 요청합니다.
        const response = await axios.post(tokenUrl, {
            grantType: 'authorization_code',
            code: code,
            clientId: CHZZK_CLIENT_ID,
            clientSecret: CHZZK_CLIENT_SECRET,
            state: state,
        });
        const { accessToken, refreshToken, expiresIn } = response.data.content;

        // Access Token을 httpOnly 쿠키에 저장 (XSS 공격 방지)
        const accessTokenCookie = serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // 프로덕션에서는 true
            path: '/',
            maxAge: expiresIn, // 토큰 만료 시간과 동일하게 설정 (1일)
        });

        // Refresh Token도 httpOnly 쿠키에 저장
        const refreshTokenCookie = serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30일
        });

        // 응답 헤더에 쿠키 설정
        res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

        // 로그인 성공 후 메인 페이지로 리디렉션
        res.redirect('/');

    } catch (error) {
        console.error('Failed to get access token:', error.response?.data || error.message);
        res.status(500).send('Authentication failed.');
    }
}