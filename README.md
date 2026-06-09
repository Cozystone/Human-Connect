# Human Connect

Human Connect는 관심사가 맞는 사람들이 도시형 3D 공간에서 우연히 만나고, 주제 테이블이나 1:1 포드를 통해 진짜 대화를 시작하는 소셜 라운지 프로토타입입니다.

## MVP 프로토타입

- Next.js App Router
- React Three Fiber 기반 3D 오픈월드
- WASD 이동과 3인칭 카메라
- 창업, 개발, 디자인 라운지 프리셋
- 주제 테이블 착석, 1:1 포드, 프로필 카드, 신고/차단 흐름
- Colyseus와 LiveKit 연동 전 단계의 로컬 인터랙션 목업

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 배포

```bash
npm run build
vercel --prod
```
