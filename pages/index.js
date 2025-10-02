// pages/index.js

import axios from 'axios';
import Image from "next/image";

// user 객체가 있으면 로그인 상태, 없으면 로그아웃 상태
export default function Home({ user }) {

    const handleLogin = async () => {

        // 치지직 로그인 페이지로 리디렉션
        const response = await fetch('/api/auth/login', {})
        const responseBody = await response.text()

        window.location.href = responseBody
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm text-center">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Chzzk 로그인 예제
                </h1>
                {user ? (
                    // 로그인 성공 시
                    <div className="flex flex-col items-center justify-center">
                        <Image src={user.channelImageUrl} alt={user.channelId} width={100} height={100} />
                        <p className="text-lg mb-4">
                            <span className="font-semibold">{user.channelName}</span>님, 환영합니다!
                        </p>
                        <p className="text-lg mb-4">
                            현재 팔로워 수: <span className="font-semibold">{user.followerCount}</span>
                        </p>
                        <p className="text-lg mb-4">
                            인증 여부: <span className="font-semibold">{user.verifiedMark ? "✅" : "❎"}</span>
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            채널 ID: {user.channelId}
                        </p>
                        <a
                            href="/api/auth/logout"
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                        >
                            로그아웃
                        </a>
                    </div>
                ) : (
                    // 로그아웃 상태 시
                    <div>
                        <p className="text-gray-600 mb-6">로그인이 필요합니다.</p>
                        <button
                            onClick={handleLogin}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                        >
                            치지직 로그인
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


export async function getServerSideProps(context) {
    const { req } = context;
    const accessToken = req.cookies.accessToken;
    // accessToken 쿠키가 없으면 로그인하지 않은 상태
    if (!accessToken) {
        return { props: { user: null } };
    }

    try {

        const {
            CHZZK_CLIENT_ID,
            CHZZK_CLIENT_SECRET,
        } = process.env;

        // 치지직 유저 정보 조회 API 호출
        const response = await axios.get('https://openapi.chzzk.naver.com/open/v1/users/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        // API 응답에서 필요한 정보 추출
        const { channelId, channelName } = response.data.content;

        const getAdditionalInfo = await axios.get('https://openapi.chzzk.naver.com/open/v1/channels',{
            params: {
                channelIds: channelId
            },
            headers: {
                'Client-Id': CHZZK_CLIENT_ID,
                'Client-Secret': CHZZK_CLIENT_SECRET,
                'Content-Type': 'application/json',
            }
        })

        const { channelImageUrl, followerCount, verifiedMark } = getAdditionalInfo.data.content.data[0]


        return {
            props: {
                user: { channelId, channelName, channelImageUrl, followerCount, verifiedMark },
            },
        };
    } catch (error) {
        // API 호출 실패 시 (토큰 만료 등)
        console.error('Failed to fetch user info:', error.response?.data || error.message);
        // 만약 토큰 갱신 로직을 구현한다면 여기서 처리할 수 있습니다.
        // 이 예제에서는 단순하게 로그아웃된 것으로 처리합니다.
        return { props: { user: null } };
    }
}