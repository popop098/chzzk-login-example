# 치지직(Chzzk) Next.js 로그인/로그아웃 구현 예제

해당 프로젝트는 [네이버 치지직 개발자 문서](https://chzzk.gitbook.io/chzzk)를 토대로 구현한 Next.js 예제 레포지토리입니다.

## 시작하기 전에...
프로젝트 시작하시기전에 아래의 섹션을 **꼭!** 참고하여 주십시오.
- [#.env.local 설정](#envlocal-설정)
- [⚠️ 주의사항 ️⚠️](#-주의사항-)

## 환경

- Next.js@15.5.4
- axios@^1.12.2
- cookie@^1.0.2
- tailwindcss@4

### Next.js 환경
- js기반
- Page Route구조
- turbo 사용

## 구조
```aiignore
 .                                                                                                                                                                                                                                                                            │
 ├── .gitignore                                                                                                                                                                                                                                                               │
 ├── biome.json                                                                                                                                                                                                                                                               │
 ├── jsconfig.json                                                                                                                                                                                                                                                            │
 ├── next.config.mjs                                                                                                                                                                                                                                                          │
 ├── package.json                                                                                                                                                                                                                                                             │
 ├── postcss.config.mjs                                                                                                                                                                                                                                                       │
 ├── README.md                                                                                                                                                                                                                                                                │
 ├── pages/                                                                                                                                                                                                                                                                   │
 │   ├── _app.js                                                                                                                                                                                                                                                              │
 │   ├── _document.js                                                                                                                                                                                                                                                         │
 │   ├── index.js                                                                                                                                                                                                                                                             │
 │   └── api/                                                                                                                                                                                                                                                                 │
 │       ├── hello.js                                                                                                                                                                                                                                                         │
 │       └── auth/                                                                                                                                                                                                                                                            │
 │           ├── callback.js                                                                                                                                                                                                                                                  │
 │           ├── login.js                                                                                                                                                                                                                                                     │
 │           └── logout.js                                                                                                                                                                                                                                                    │
 ├── public/                                                                                                                                                                                                                                                                  │
 │   ├── favicon.ico                                                                                                                                                                                                                                                          │
 │   ├── file.svg                                                                                                                                                                                                                                                             │
 │   ├── globe.svg                                                                                                                                                                                                                                                            │
 │   ├── next.svg                                                                                                                                                                                                                                                             │
 │   ├── vercel.svg                                                                                                                                                                                                                                                           │
 │   └── window.svg                                                                                                                                                                                                                                                           │
 └── styles/                                                                                                                                                                                                                                                                  │
     └── globals.css
```

## 시작하기
1. 해당 프로젝트를 `.zip`파일로 내려받거나 `bash` 혹은 `cmd`로 `git clone https://github.com/popop098/chzzk-login-example.git` 하기.
2. `.zip`파일로 내려받았을 경우, 압축해제하기.
3. `cd chzzk-login-example`
4. `npm install` 혹은 `yarn`으로 라이브러리 설치하기.
5. `.env.local`파일 생성, "[#.env.local 설정](#envlocal-설정)"섹션을 참고하여 설정하기.
6. `npm run dev` 혹은 `yarn dev`로 개발 서버 구동하기.
7. `http://localhost:3000`접속

## .env.local 설정
```
# 치지직 개발자 센터에서 발급받은 Client ID
CHZZK_CLIENT_ID=

# 치지직 개발자 센터에서 발급받은 Client Secret
CHZZK_CLIENT_SECRET=

# 현재 실행 중인 Next.js 앱의 전체 주소
# 로컬 개발 환경에서는 보통 http://localhost:3000 입니다.
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 치지직 애플리케이션에 등록한 '로그인 리디렉션 URL'과 반드시 일치해야 합니다.
CHZZK_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

## ⚠️ 주의사항 ️⚠️
### [pages/api/auth/login](pages/api/auth/login.js)내의 `const state = 'RANDOM_STATE_STRING';`은 웬만하면 *'openssl rand -hex 32'로 생성하여 값을 대입* 하시는것이 안전합니다.
### 혹은 아래의 코드를 사용하여 랜덤 string값을 생성하셔도 됩니다.
```javascript
const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
```

### 크레딧
#### - 📺 치지직 채널: [재능낭비개발자](https://chzzk.naver.com/adbe2fb7d09ff708f016e8a3f76453b9)
#### - 📧 이메일: [popop0982@naver.com](mailto:popop0982@naver.com)