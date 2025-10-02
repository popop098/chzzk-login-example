export default function handler(req, res) {
    const state = 'RANDOM_STATE_STRING'; // `openssl rand -hex 32`로 생성하여 값을 대입할것.
    const clientId = process.env.CHZZK_CLIENT_ID;
    const redirectUri = process.env.CHZZK_REDIRECT_URI;

    // 치지직 인증 코드 요청 URL
    const chzzkLoginUrl = `https://chzzk.naver.com/account-interlock?clientId=${clientId}&redirectUri=${redirectUri}&state=${state}`;

    return res.status(200).send(chzzkLoginUrl);

}