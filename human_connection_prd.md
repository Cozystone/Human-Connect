# 휴먼커넥션 PRD

> **제품명:** 휴먼커넥션 / Human Connection  
> **문서 목적:** Codex 기반 개발을 위한 통합 제품 요구사항 문서  
> **작성일:** 2026-06-09  
> **버전:** v0.1 Draft  
> **핵심 방향:** 브라우저 기반 3D 전문 대화 라운지 + 인간형 아바타 상호작용 + 주제별 커뮤니티 + 1대1 연결

---

## 0. Executive Summary

휴먼커넥션은 **“우연히 만났지만, 의미 있게 이어지는 사람들”**을 위한 웹 기반 3D 자유공간이다.

사용자는 앱 설치 없이 웹 브라우저로 접속한다. 창업, 디자인, 개발, 투자, 환경, 예술 등 주제별 라운지에 들어가 3인칭 인간형 아바타로 공간을 이동하고, 테이블에 앉아 실시간 음성/텍스트 대화를 나눈다. 그룹 대화에서 더 이야기하고 싶은 사람을 만나면 별도의 1대1 공간으로 이동해 개인 대화를 이어갈 수 있다.

휴먼커넥션은 단순한 메타버스가 아니다. 이 제품의 목적은 거대한 월드 탐험이나 아바타 꾸미기가 아니라, **지금 이 순간 같은 관심사를 가진 사람과 자연스럽게 마주 앉아 대화하는 경험**을 만드는 것이다.

핵심 포지셔닝은 다음과 같다.

> **랜덤채팅의 즉흥성, 블라인드의 익명성, 링크드인의 전문성, 오프라인 네트워킹의 분위기를 결합한 브라우저 기반 3D 전문 대화 플랫폼.**

---

## 1. 제품 비전

### 1.1 한 문장 비전

**휴먼커넥션은 관심사 기반 3D 라운지에서 익명 아바타로 만나, 부담 없이 대화하고 의미 있는 관계로 이어지는 온라인 전문 네트워킹 공간이다.**

### 1.2 브랜드 문장 후보

- **관심사가 같으면, 처음 만난 사람도 어색하지 않다.**
- **우연히 앉은 자리에서, 다음 프로젝트가 시작된다.**
- **지금 대화할 수 있는 사람들이 모여 있는 3D 라운지.**
- **글이 아니라, 사람을 만나는 커뮤니티.**
- **익명으로 들어와, 관심사로 만나고, 대화로 신뢰를 만든다.**

### 1.3 제품이 해결하려는 근본 문제

현재 온라인에서 새로운 사람을 만나는 방식은 극단적으로 나뉘어 있다.

| 방식 | 장점 | 한계 |
|---|---|---|
| 게시판 커뮤니티 | 진입이 쉽고 기록이 남음 | 관계 형성이 약하고, 댓글 논쟁으로 흐르기 쉬움 |
| 랜덤채팅 | 즉흥적이고 빠름 | 맥락이 없고 신뢰가 낮음 |
| 화상회의 | 깊은 대화 가능 | 너무 공식적이고 부담스러움 |
| 링크드인/커리어 네트워킹 | 전문성 있음 | 실명 기반이라 접근이 딱딱함 |
| 디스코드/오픈채팅 | 실시간성 있음 | 기존 멤버 중심 문화가 강하고 신규 진입이 어려움 |
| 기존 메타버스 | 공간감 있음 | “그래서 여기서 뭘 해야 하는가?”가 약함 |

휴먼커넥션은 이 사이의 빈 공간을 차지한다.

**가볍게 들어오지만, 의미 없는 랜덤은 아니다.**  
**익명으로 말하지만, 주제가 있어 대화의 깊이는 유지된다.**  
**3D 공간을 걷지만, 목적은 월드 탐험이 아니라 사람과의 대화다.**

---

## 2. 기존 서비스와의 차별점

### 2.1 블라인드와의 차이

블라인드는 익명성과 커리어 기반 대화에 강하다. 하지만 기본 구조는 게시판이다. 글과 댓글 중심 구조에서는 사용자가 사람을 만나기보다 의견을 소비한다. 논쟁은 빠르게 생기지만 관계는 천천히 생긴다.

휴먼커넥션은 의견보다 **사람의 존재감**을 먼저 만든다. 사용자는 아바타를 보고, 같은 테이블에 앉고, 말하는 사람 쪽으로 고개를 돌리고, 손을 흔들고, 반응한다. 이 작은 몸짓이 텍스트 게시판에서 사라진 인간성을 복원한다.

### 2.2 에브리타임과의 차이

에브리타임은 학교라는 소속 기반 커뮤니티에 강하다. 그러나 학교 밖 관심사, 예를 들어 창업, 투자, 개발, 디자인, 환경 프로젝트처럼 학교를 넘어선 연결에는 한계가 있다.

휴먼커넥션은 학교, 회사, 지역보다 **주제**를 중심으로 사람을 모은다.

- “나는 어느 학교 학생인가?”보다 “나는 지금 무엇에 관심 있는가?”가 중요하다.
- 같은 학교 사람이 아니라도 같은 문제의식을 가진 사람과 만날 수 있다.
- 창업자는 개발자와 디자이너를 만나고, 개발자는 프로젝트를 찾고, 디자이너는 피드백과 협업 기회를 얻는다.

### 2.3 일반 메타버스와의 차이

기존 메타버스의 많은 실패는 “공간은 만들었지만, 사용자가 그 공간에 들어가야 할 명확한 이유를 만들지 못한 것”에서 발생했다.

휴먼커넥션은 메타버스를 목표로 하지 않는다. 휴먼커넥션의 3D는 **대화 인터페이스**다.

- 목적 없는 대형 월드가 아니다.
- 그래픽 과시형 가상도시가 아니다.
- VR 기기 중심 서비스가 아니다.
- 사용자가 들어오는 이유는 “구경”이 아니라 “지금 대화할 사람을 만나기 위해서”다.

### 2.4 핵심 차별화 공식

```text
휴먼커넥션 =
  주제별 전문 커뮤니티
+ 실시간 음성 대화
+ 3D 아바타 존재감
+ 익명 진입
+ 1대1 전환
+ 공간 기반 자정작용
```

---

## 3. 타깃 사용자

### 3.1 1차 타깃

#### A. 예비 창업자 / 초기 창업자

- 팀원, 디자이너, 개발자, 조언자, 초기 투자자와 만나고 싶다.
- 링크드인 DM은 부담스럽고, 오프라인 네트워킹은 시간이 많이 든다.
- 아이디어를 가볍게 말해보고 반응을 얻고 싶다.

#### B. 개발자 / 디자이너 / 기획자

- 사이드 프로젝트를 찾고 싶다.
- 포트폴리오 피드백을 받고 싶다.
- 실력과 관심사가 맞는 사람을 자연스럽게 만나고 싶다.

#### C. 학생 / 청년 크리에이터

- 학교 밖에서 같은 관심사를 가진 사람을 만나고 싶다.
- 실명 공개 없이 아이디어, 진로, 프로젝트를 이야기하고 싶다.
- 커뮤니티에는 들어가고 싶지만, 이미 형성된 무리에 끼는 것이 어렵다.

### 3.2 2차 타깃

#### D. 투자자 / 멘토 / 현업자

- 딱딱한 멘토링 세션보다 자연스럽게 사람과 아이디어를 보고 싶다.
- 초기 팀의 분위기와 사람 자체를 관찰하고 싶다.

#### E. 예술 / 환경 / 사회문제 활동가

- 같은 문제의식을 가진 사람들과 느슨하게 연결되고 싶다.
- 프로젝트 팀, 캠페인, 전시, 협업 기회를 찾고 싶다.

---

## 4. 핵심 사용자 시나리오

### 4.1 창업 라운지 입장 시나리오

1. 사용자가 웹사이트에 접속한다.
2. 라운지 목록에서 `창업 라운지`를 선택한다.
3. 닉네임, 관심 태그, 오늘 이야기하고 싶은 주제를 입력한다.
4. 기본 아바타를 선택하고 입장한다.
5. 중앙 라운지에서 현재 열려 있는 테이블을 본다.
6. “고등학생 창업”, “AI 서비스 MVP”, “투자자 피드백” 테이블 중 하나를 선택한다.
7. 테이블 근처로 이동하거나 클릭해 앉는다.
8. 같은 테이블 사용자들과 음성 대화를 시작한다.
9. 한 사용자와 더 깊은 이야기를 하고 싶어 1대1 대화 요청을 보낸다.
10. 상대가 수락하면 두 사용자는 프라이빗 포드로 이동한다.
11. 대화 후 프로필 카드를 교환하거나 연결을 저장한다.

### 4.2 디자인 피드백 시나리오

1. 사용자가 디자인 라운지에 입장한다.
2. “포트폴리오 피드백” 테이블에 앉는다.
3. 텍스트 채팅으로 Figma 링크를 공유한다.
4. 다른 사용자가 음성으로 피드백한다.
5. 사용자는 상대의 프로필에서 “UI/UX”, “브랜딩”, “웹디자인” 태그를 확인한다.
6. 대화 후 피드백에 긍정 반응을 남긴다.

### 4.3 개발 협업 시나리오

1. 창업자가 개발 라운지에 들어온다.
2. “Next.js”, “AI 앱”, “오픈소스” 테이블을 둘러본다.
3. 한 개발자와 대화가 잘 맞아 1대1 공간으로 이동한다.
4. 서로 GitHub/포트폴리오 링크를 공유한다.
5. 연결을 저장하고 다음 만남을 잡는다.

---

## 5. 제품 원칙

### 5.1 3D 공간은 목적이 아니라 대화 인터페이스다

휴먼커넥션은 거대한 월드를 만드는 제품이 아니다. 사용자가 빠르게 사람을 발견하고, 대화에 들어가고, 자연스럽게 빠져나올 수 있는 **대화 밀도 높은 공간**을 만드는 제품이다.

### 5.2 월드는 작고 명확해야 한다

초기 라운지는 크게 만들지 않는다. 작은 공간 안에 다음 요소가 명확히 보여야 한다.

- 현재 어디에서 대화가 일어나고 있는지
- 어느 테이블이 비어 있는지
- 어떤 주제가 이야기되고 있는지
- 어디로 가면 1대1 대화를 할 수 있는지
- 어디에 발표/피칭 공간이 있는지

### 5.3 익명성은 진입장벽을 낮추고, 주제성은 대화 품질을 높인다

익명성만 있으면 무질서해질 수 있다. 주제성만 있으면 진입이 딱딱해질 수 있다. 휴먼커넥션은 두 가지를 조합한다.

```text
닉네임 기반 진입 + 전문분야별 라운지 + 관심 태그 + 신뢰 신호
```

### 5.4 관계는 강요하지 않는다

친구 추가, 팔로우, DM보다 먼저 자연스러운 대화가 있어야 한다. 사용자는 대화가 맞으면 연결을 저장하고, 맞지 않으면 조용히 떠날 수 있어야 한다.

---

## 6. MVP 범위

### 6.1 반드시 포함할 기능

- 웹 브라우저 접속
- 닉네임 기반 게스트 입장
- 주제별 라운지 목록
- 3D 라운지 입장
- 3인칭 아바타 이동
- 기본 인간형 아바타
- 기본 동작: idle, walk, sit, wave, nod, clap, talk/listen
- 테이블 착석
- 근거리 음성 대화
- 텍스트 보조 채팅
- 1대1 대화 요청
- 1대1 프라이빗 포드
- 간단 프로필 카드
- 관심 태그
- 사용자 음소거
- 신고/차단
- 운영자용 최소 관리 화면
- 라운지별 접속자 수 표시

### 6.2 MVP에서 제외할 기능

- 완전한 아바타 커스터마이저
- 사용자 제작 월드 공개 기능
- 복잡한 월드 빌더
- NFT/블록체인
- VR 기기 지원
- 모바일 네이티브 앱
- 화상 통화
- AI 실시간 요약
- 고도화된 추천 알고리즘
- 현실적 손가락/표정 캡처
- 사용자 간 파일 저장소

### 6.3 MVP 라운지 추천

초기에는 라운지를 많이 만들지 않는다. 연결 가능성이 높은 3개 라운지로 시작한다.

1. **창업 라운지**
2. **개발 라운지**
3. **디자인 라운지**

이 세 라운지는 서로 강하게 연결된다.

- 창업자는 개발자/디자이너를 찾는다.
- 개발자는 흥미로운 프로젝트를 찾는다.
- 디자이너는 포트폴리오와 협업 기회를 찾는다.
- 세 집단이 섞이면 초기 네트워크 효과가 생긴다.

---

## 7. 3D 공간 설계

### 7.1 공간 설계 방향

휴먼커넥션의 공간은 “멋진 가상도시”가 아니라 “대화가 잘 일어나는 실내 라운지”여야 한다.

핵심 원칙은 다음과 같다.

- 넓은 광장보다 작은 살롱
- 이동보다 착석
- 탐험보다 발견
- 장식보다 대화 유도
- 복잡한 월드보다 명확한 시야

### 7.2 기본 라운지 구성 요소

| 구성 요소 | 설명 | MVP 포함 여부 |
|---|---|---|
| Spawn Area | 사용자가 처음 등장하는 위치 | 필수 |
| Central Lounge | 현재 대화 중인 테이블들이 보이는 중심 공간 | 필수 |
| Topic Tables | 4~6명이 앉아 대화하는 테이블 | 필수 |
| 1:1 Pods | 개인 대화용 작은 독립 공간 | 필수 |
| Stage / Pitch Zone | 발표, 피칭, 라이트닝 토크 공간 | Alpha |
| Question Board | 오늘의 질문, 대화 주제, 공지 표시 | MVP |
| Mentor Booth | 멘토/전문가가 앉아 있는 공간 | Alpha |
| Wall Signage | 라운지 정체성을 보여주는 벽면 그래픽 | MVP |
| Mini Map | 사용자의 위치와 활성 테이블 표시 | Alpha |
| Quiet Zone | 음성 대화 없이 텍스트/링크 공유하는 공간 | Alpha |

### 7.3 라운지별 공간 콘셉트

#### 창업 라운지

분위기: 스타트업 코워킹 라운지 + 피칭룸

구성:

- 중앙 원형 테이블
- 피칭 스테이지
- 화이트보드/아이디어 보드
- 투자자/멘토 부스
- 1대1 미팅룸
- 벽면에 “MVP”, “PMF”, “Team Building”, “Fundraising” 같은 키워드 표시

#### 개발 라운지

분위기: 해커스페이스 + 오픈소스 커뮤니티 룸

구성:

- 모니터가 있는 작업 테이블
- 코드 리뷰 테이블
- 오픈소스 보드
- AI 앱 개발 테이블
- 서버/네트워크 느낌의 장식
- GitHub 링크 공유 UI와 잘 어울리는 벽면 패널

#### 디자인 라운지

분위기: 디자인 스튜디오 + 포트폴리오 크리틱룸

구성:

- 작품 전시 벽
- 포트폴리오 피드백 테이블
- 컬러 팔레트 패널
- UI/UX 리뷰 보드
- 부드러운 조명과 식물
- Figma 링크 공유와 어울리는 스크린 오브젝트

---

## 8. 3D 공간 꾸미기 / 월드 제작 전략

### 8.1 결론

초기부터 완전한 월드 에디터를 만들지 않는다.

추천 방식은 다음과 같다.

```text
Base GLB Scene
+ Asset Catalog
+ JSON Scene Manifest
+ Admin-only Decoration Editor
+ Runtime Loader
```

즉, 라운지의 기본 구조는 Blender 등 외부 툴로 만든 GLB 파일로 관리하고, 테이블, 의자, 식물, 조명, 벽면 패널 같은 소품은 에셋 카탈로그와 JSON 배치 데이터로 관리한다.

이렇게 하면 다음 장점이 있다.

- Codex가 구현할 범위가 명확하다.
- 디자이너는 Blender/외부 에셋으로 공간을 만들 수 있다.
- 개발자는 런타임 로딩과 상호작용만 관리하면 된다.
- 나중에 운영자용 인테리어 에디터로 확장할 수 있다.
- 사용자 제작 월드를 바로 열지 않아도, 라운지 분위기를 빠르게 바꿀 수 있다.

### 8.2 공간 데이터 구조 예시

```json
{
  "loungeId": "startup_lounge",
  "version": "1.0.0",
  "baseSceneUrl": "/assets/environments/startup_lounge_v1.glb",
  "lightingPreset": "warm_coworking",
  "spawnPoints": [
    {
      "id": "spawn_main",
      "position": [0, 0, 4],
      "rotation": [0, 3.14, 0]
    }
  ],
  "talkZones": [
    {
      "id": "table_mvp",
      "label": "MVP 이야기",
      "type": "table",
      "position": [2, 0, 0],
      "radius": 2.5,
      "maxSeats": 6,
      "seatAnchors": [
        { "id": "seat_1", "position": [1.2, 0, 0.8], "rotationY": 2.4 },
        { "id": "seat_2", "position": [2.0, 0, 1.0], "rotationY": 3.1 }
      ]
    }
  ],
  "privatePods": [
    {
      "id": "pod_01",
      "position": [-4, 0, -2],
      "capacity": 2,
      "audioIsolation": true
    }
  ],
  "props": [
    {
      "id": "prop_001",
      "assetId": "kenney_chair_01",
      "position": [1, 0, 1],
      "rotation": [0, 1.57, 0],
      "scale": [1, 1, 1],
      "collider": "box",
      "tags": ["chair", "seat", "furniture"]
    }
  ]
}
```

### 8.3 공간 꾸미기 단계

#### Phase 0: 하드코딩된 프로토타입

- React Three Fiber로 바닥, 벽, 테이블, 의자를 직접 배치한다.
- 빠르게 이동/착석/음성 범위를 검증한다.
- 공간 미감보다 대화 UX 검증이 목적이다.

#### Phase 1: GLB 라운지 템플릿

- Blender에서 기본 라운지 공간을 만든다.
- 라운지별 GLB 파일을 로드한다.
- 상호작용 zone은 JSON으로 별도 관리한다.
- 의자/테이블 anchor와 collision proxy를 설정한다.

#### Phase 2: 운영자용 Decoration Editor

운영자만 접근 가능한 간단한 인테리어 에디터를 만든다.

기능:

- 에셋 카탈로그 열기
- 소품 배치
- 이동/회전/스케일 조정
- 바닥 스냅
- 그리드 스냅
- 충돌 프리뷰
- 라운지별 저장
- JSON manifest export/import
- 미리보기 모드

#### Phase 3: 라운지 호스트 커스터마이징

라운지 운영자 또는 호스트가 일부 요소를 바꿀 수 있게 한다.

허용 범위:

- 벽면 이미지
- 안내문
- 테이블 주제
- 식물/조명/소품
- 배경음 분위기
- 스테이지 배너

제한 범위:

- 이동 가능한 바닥 구조 변경 금지
- 1대1 포드 위치 변경 제한
- navmesh를 망가뜨리는 오브젝트 배치 금지
- 선정적/폭력적/저작권 불명 에셋 업로드 금지

#### Phase 4: 사용자 제작 프라이빗 라운지

장기적으로 사용자가 자신의 작은 라운지를 만들 수 있게 한다.

단, 공개 라운지 등록은 운영자 검수 후 가능하게 한다.

---

## 9. 공간 제작에 참고할 Repo / Tool / Asset Source

### 9.1 공간 에디터 / 월드 빌더 참고

| 이름 | 용도 | 추천 활용 |
|---|---|---|
| Hubs Foundation Spoke | 웹 기반 3D scene editor | 운영자용 라운지 에디터 UX 참고. 완전 통합보다는 기능 참고 또는 export workflow 검토 |
| Triplex | React Three Fiber용 visual workspace | R3F 기반 장면을 시각적으로 조정하는 개발자 도구로 검토 |
| react-planner | 2D 도면 기반 건물/공간 모델링 컴포넌트 | 라운지 floor plan editor의 참고 구현 |
| PlayCanvas Editor | 브라우저 기반 WebGL/WebGPU/WebXR 에디터 | 별도 엔진 대안 또는 에디터 UX 참고 |
| three.js editor | Three.js 공식 에디터 | 간단한 scene test/import/export 도구로 활용 |
| A-Frame environment component | 간단한 procedural environment | 빠른 배경 프로토타입용 참고 |
| Hyperfy | 오픈소스 3D virtual world framework | 실시간 월드/앱 시스템 구조 참고. MVP에 직접 도입은 신중 |
| iR Engine | 소셜 spatial web / WebXR 엔진 | 장기적 소셜 메타버스 아키텍처 참고. MVP에는 과함 |

### 9.2 3D 에셋 소스

| 이름 | 특징 | 추천 사용처 |
|---|---|---|
| Kenney Furniture Kit | CC0 기반 low-poly 가구 세트 | MVP 가구, 의자, 테이블, 소품 |
| Poly Haven | CC0 HDRI, texture, model | 조명 HDRI, 현실적 텍스처, 일부 모델 |
| ambientCG | CC0 PBR material, HDRI, model | 바닥/벽/천 재질, 목재, 콘크리트, 패브릭 |
| Quaternius | CC0 low-poly 모델 팩 | 저용량 라운지 소품, 건물, 자연물, 인테리어 팩 |

주의:

- 모든 에셋은 source, license, author, original URL을 metadata로 남긴다.
- 무기류, 선정적 에셋, 저작권 불명 에셋은 카탈로그에 포함하지 않는다.
- 에셋은 반드시 최적화 후 배포한다.

### 9.3 추천 공간 제작 파이프라인

```text
1. 에셋 수집 / 직접 제작
2. Blender에서 정리
3. 스케일 통일: 1 unit = 1 meter
4. 불필요한 mesh 삭제
5. material 병합
6. collision proxy 생성
7. navmesh 또는 walkable area 설정
8. GLB export
9. glTF Transform으로 최적화
10. R2/S3 업로드
11. asset catalog JSON 등록
12. runtime에서 lazy loading
```

### 9.4 glTF/GLB 최적화 원칙

- 가능하면 GLB 사용
- texture는 KTX2 또는 WebP 변환 검토
- static prop은 mesh 병합
- Draco 또는 Meshopt 압축 사용
- base scene과 props를 분리해 lazy loading
- collision mesh는 render mesh와 분리
- 멀리 있는 소품은 LOD 적용
- 라이트맵 bake 검토
- 실시간 조명은 최소화

권장 용량 예산:

| 항목 | 목표 |
|---|---|
| 기본 라운지 GLB | 5~12MB 이하 |
| 개별 prop | 100KB~1MB 권장 |
| 아바타 1개 | 5~10MB 이하 |
| 라운지 초기 로딩 | 5초 이내 목표 |
| 동시 표시 아바타 | MVP 20명, Alpha 50명 목표 |

---

## 10. 아바타 시스템

### 10.1 아바타 방향

아바타는 외부 SaaS에 핵심 의존하지 않고, **자가 호스팅 가능한 VRM/GLB 기반**으로 설계한다.

추천 구조:

```text
VRM / GLB avatar
+ @pixiv/three-vrm
+ @pixiv/three-vrm-animation / VRMA
+ Three.js AnimationMixer
+ Mixamo/Blender motion pipeline
+ optional IK layer
```

### 10.2 기본 아바타 상태

| 상태 | 설명 | MVP |
|---|---|---|
| idle | 가만히 서 있음 | 필수 |
| walk | 걷기 | 필수 |
| run | 빠른 이동 | 선택 |
| sit | 의자/테이블 착석 | 필수 |
| wave | 손 흔들기 | 필수 |
| nod | 고개 끄덕임 | 필수 |
| clap | 박수 | MVP 또는 Alpha |
| talk | 말하는 중 입/몸 반응 | 필수 |
| listen | 듣는 중 고개/시선 반응 | 필수 |
| handshake | 악수 | Alpha |
| point | 가리키기 | Alpha |
| think | 고민/팔짱/턱 괴기 | Beta |

### 10.3 사람처럼 보이는 핵심

자연스러운 아바타는 고해상도 모델보다 작은 반응이 중요하다.

MVP에서 우선 구현할 반응:

- 말하는 사람을 바라보기
- 가까운 사람에게 고개 돌리기
- idle breathing
- 눈 깜빡임
- 말할 때 입 움직임
- 듣는 중 고개 끄덕임
- 테이블 착석 시 방향 자동 보정
- 너무 오래 가만히 있을 때 미세한 자세 변화

### 10.4 손 흔들기 구현

```text
1. 사용자가 Wave 버튼 클릭
2. 클라이언트가 Colyseus에 interaction:wave 전송
3. 서버가 같은 room 사용자에게 broadcast
4. 각 클라이언트가 해당 avatar의 wave animation 재생
5. animation 종료 후 이전 상태로 복귀
```

### 10.5 악수 구현

악수는 단일 애니메이션이 아니라 두 아바타의 동기화된 상호작용이다.

```text
1. A가 B에게 handshake request
2. B가 accept
3. 서버가 A/B의 위치와 회전을 anchor point로 고정
4. A/B가 서로 마주 보도록 보정
5. 서버 timestamp 기준으로 handshake_start_at broadcast
6. A는 handshake_A, B는 handshake_B animation 재생
7. 종료 후 idle 또는 previous state 복귀
8. Alpha 이후 손목 IK로 손 위치 보정
```

MVP에서는 악수를 필수로 넣지 않아도 된다. 우선 wave, nod, sit, talk/listen의 완성도를 높인다.

### 10.6 참고 Repo / Library

| 이름 | 용도 | 활용 방향 |
|---|---|---|
| pixiv/three-vrm | Three.js에서 VRM 로딩/제어 | 기본 아바타 런타임 |
| VRM Animation / VRMA | VRM용 애니메이션 포맷 | wave, sit, gesture 재사용 |
| met4citizen/TalkingHead | 3D avatar + lip sync + Mixamo FBX | AI 안내자/NPC 또는 대화형 호스트 참고 |
| vladmandic/human-three-vrm | 웹캠 기반 VRM body/face/hand tracking | 장기적 실시간 몸동작 참고 |
| dev-fun-collab-v2-public | Next.js/R3F/VRM/VRMA 대화형 데모 | 아바타 상호작용 UX 참고 |
| Mixamo | 캐릭터 애니메이션 소스 | 걷기/앉기/제스처 FBX 제작 후 변환 |

---

## 11. 실시간 대화 / 음성 시스템

### 11.1 음성 기본 원칙

- 사용자는 같은 라운지 안에 있어도 모든 음성을 듣지 않는다.
- 가까이 있는 사람의 음성이 더 크게 들린다.
- 테이블에 앉으면 같은 테이블 사용자의 음성이 우선된다.
- 1대1 포드에 들어가면 외부 음성은 차단된다.

### 11.2 LiveKit 사용 방향

LiveKit을 음성/WebRTC 인프라로 사용한다.

필수 기능:

- 라운지 입장 시 LiveKit room join
- 서버에서 token 발급
- mute/unmute
- 특정 사용자 음소거
- spatial audio 또는 거리 기반 볼륨 계산
- table zone 기반 audio priority
- private pod audio isolation

### 11.3 음성 UX

- 기본은 push-to-talk 또는 mute 상태 시작을 검토한다.
- 처음 입장한 사용자는 마이크 테스트를 거친다.
- 마이크 권한이 없으면 텍스트 모드로 입장 가능해야 한다.
- 말하는 사용자 위에는 작은 speaking indicator를 표시한다.
- 테이블별 현재 말하는 사람을 UI로 표시한다.

---

## 12. 실시간 상태 동기화

### 12.1 Colyseus 사용 방향

Colyseus를 아바타 위치, 회전, 상태, 라운지 입장/퇴장, 테이블 착석, 1대1 요청, 제스처 이벤트 동기화에 사용한다.

동기화 대상:

- player position
- player rotation
- avatar animation state
- lounge presence
- table membership
- seat occupancy
- private pod state
- interaction events
- moderation events

### 12.2 동기화 원칙

- 위치/회전은 빈번히 전송하되 interpolation 적용
- 애니메이션 상태는 이벤트 기반 전송
- 악수/동시 상호작용은 서버 timestamp 기준 동기화
- idle/walk 전환은 클라이언트 예측 + 서버 보정
- 네트워크 지연 시 순간이동보다 부드러운 보간 우선

---

## 13. 주요 기능 요구사항

### 13.1 온보딩

사용자는 회원가입 없이 게스트로 입장할 수 있다.

입력 항목:

- 닉네임
- 관심 분야 태그
- 오늘 이야기하고 싶은 주제
- 기본 아바타 선택
- 음성 사용 여부

선택 회원가입 시 제공:

- 프로필 저장
- 연결 저장
- 신뢰 신호 누적
- 관심 라운지 저장
- 신고/차단 목록 유지

### 13.2 라운지 목록

라운지 카드 표시 항목:

- 라운지 이름
- 라운지 설명
- 현재 접속자 수
- 활성 테이블 수
- 현재 인기 대화 주제
- 멘토/운영자 접속 여부
- 입장 버튼

### 13.3 라운지 내부 UI

필수 UI:

- 현재 라운지 이름
- 현재 접속자 수
- 테이블 목록
- 내 마이크 상태
- 텍스트 채팅
- 프로필 버튼
- 신고/도움말 버튼
- 나가기 버튼
- 제스처 버튼: 손 흔들기, 끄덕임, 박수

### 13.4 테이블 착석

플로우:

1. 사용자가 테이블 근처로 이동
2. 테이블 주제와 현재 참여자 표시
3. `앉기` 버튼 또는 자동 prompt 표시
4. 착석 시 seat anchor로 위치 보정
5. sit animation 재생
6. 같은 테이블 사용자의 음성 우선
7. 떠나기 버튼으로 seat 해제

### 13.5 1대1 대화

플로우:

1. 사용자 A가 사용자 B 클릭
2. 미니 프로필 카드 표시
3. `1대1 대화 요청` 클릭
4. B에게 요청 알림
5. B가 수락하면 두 사용자가 private pod로 이동
6. 외부 음성 차단
7. 대화 종료 시 원래 라운지로 복귀

안전장치:

- 요청 거절
- 반복 요청 rate limit
- 1대1 중 즉시 나가기
- 차단
- 신고
- 운영자 호출

### 13.6 프로필 카드

기본 정보:

- 닉네임
- 관심 태그
- 한 줄 소개
- 오늘 이야기하고 싶은 주제
- 선택 공개 링크: GitHub, LinkedIn, 포트폴리오, 개인 웹사이트
- 신뢰 신호

신뢰 신호 예시:

- 신고 이력 없음
- 대화 완료 수
- 받은 긍정 피드백
- 멘토 배지
- 운영자 인증 배지
- 새 사용자 배지

주의:

- 신뢰 점수를 과도하게 랭킹화하지 않는다.
- 목적은 경쟁이 아니라 안심 신호다.

### 13.7 신고 / 차단 / 자정작용

MVP 필수:

- 사용자 신고
- 사용자 차단
- 사용자 음소거
- 운영자 강제 퇴장
- 운영자 라운지 공지
- 반복 신고 사용자 자동 제한

신고 사유:

- 욕설/혐오
- 성희롱
- 스팸/광고
- 도배
- 개인정보 요구
- 미성년자 보호 위반
- 기타

---

## 14. 비기능 요구사항

### 14.1 성능

목표:

- 데스크톱 60fps 목표
- 저사양/모바일 30fps 이상
- 초기 로딩 5초 이내 목표
- MVP 동시 접속 20명/라운지
- Alpha 동시 접속 50명/라운지

최적화:

- GLB compression
- texture compression
- lazy loading
- avatar LOD
- distant avatar update throttling
- static batching
- light baking
- physics collider simplification

### 14.2 브라우저 지원

MVP:

- Chrome
- Edge
- Safari 최신 버전

Alpha:

- Firefox
- Mobile Safari
- Android Chrome

### 14.3 접근성

- 음성 없이 텍스트 채팅으로 참여 가능
- 자막형 말풍선 옵션
- 키보드 이동
- 색약 고려 UI
- 카메라 흔들림 최소화
- 모션 멀미 방지 옵션
- UI scale 조정

### 14.4 보안 / 프라이버시

- 게스트 세션 토큰
- LiveKit token 서버 발급
- WebSocket 인증
- 신고 로그 저장
- 음성 녹음 기본 비활성
- 1대1 대화 상호 동의 필수
- 미성년자 보호 정책
- 프로필 링크 공개 여부 선택
- 차단 사용자의 재요청 제한

---

## 15. 시스템 아키텍처

```text
[Browser Client]
  ├─ Next.js App
  ├─ React Three Fiber Scene
  ├─ Avatar Controller
  ├─ World Runtime Loader
  ├─ Animation State Machine
  ├─ LiveKit Client
  ├─ Colyseus Client
  └─ UI Layer

        │ HTTPS
        ▼

[API Server]
  ├─ Auth / Guest Session
  ├─ Profile
  ├─ Lounge Directory
  ├─ Asset Catalog
  ├─ Scene Manifest
  ├─ Report / Block
  ├─ LiveKit Token Issuer
  └─ Admin API

        │ WebSocket
        ▼

[Colyseus Realtime Server]
  ├─ Lounge Room
  ├─ Player Position
  ├─ Avatar State
  ├─ Table State
  ├─ Interaction Events
  ├─ Private Pod State
  └─ Moderation Events

        │ WebRTC
        ▼

[LiveKit]
  ├─ Spatial Voice
  ├─ Table Audio
  ├─ 1:1 Private Audio
  └─ Optional Data Channel

        │
        ▼

[Storage]
  ├─ PostgreSQL
  ├─ Redis
  ├─ S3/R2 Assets
  └─ Analytics/Event Store
```

---

## 16. 추천 기술 스택

### 16.1 Frontend

- Next.js
- TypeScript
- React Three Fiber
- Three.js
- @react-three/drei
- @react-three/rapier
- Zustand
- Tailwind CSS
- shadcn/ui

### 16.2 Avatar

- VRM / GLB
- @pixiv/three-vrm
- @pixiv/three-vrm-animation
- Three.js AnimationMixer
- Mixamo / Blender motion workflow
- optional IK layer

### 16.3 World / Space

- GLB base scene
- JSON scene manifest
- asset catalog
- glTF Transform
- Blender
- optional Triplex for R3F scene editing
- optional react-planner-style admin floor tool

### 16.4 Realtime

- Colyseus
- LiveKit
- Redis

### 16.5 Backend

- Fastify 또는 NestJS
- Prisma
- PostgreSQL
- Redis
- S3/R2

### 16.6 Deploy / Infra

- Vercel: web
- Fly.io / Render / Railway: API + realtime
- LiveKit Cloud 또는 self-hosted LiveKit
- Cloudflare R2: 3D assets
- Sentry: error monitoring
- PostHog: product analytics

---

## 17. 데이터 모델 초안

```ts
type User = {
  id: string
  nickname: string
  avatarUrl: string
  tags: string[]
  trustLevel: number
  isGuest: boolean
  createdAt: Date
}

type Profile = {
  userId: string
  bio: string
  interests: string[]
  expertiseTags: string[]
  links: ProfileLink[]
  visibility: "anonymous" | "partial" | "verified"
}

type Lounge = {
  id: string
  slug: string
  name: string
  category: string
  description: string
  sceneManifestId: string
  maxUsers: number
  isActive: boolean
}

type SceneManifest = {
  id: string
  loungeId: string
  version: string
  baseSceneUrl: string
  lightingPreset: string
  spawnPoints: SpawnPoint[]
  talkZones: TalkZone[]
  privatePods: PrivatePod[]
  props: SceneProp[]
}

type AssetCatalogItem = {
  id: string
  name: string
  category: "furniture" | "plant" | "lighting" | "wall" | "signage" | "prop" | "environment"
  url: string
  thumbnailUrl: string
  license: string
  sourceUrl: string
  author?: string
  defaultScale: [number, number, number]
  colliderType: "none" | "box" | "sphere" | "mesh"
  tags: string[]
}

type Table = {
  id: string
  loungeId: string
  name: string
  topic: string
  maxSeats: number
  currentUsers: string[]
}

type Connection = {
  id: string
  fromUserId: string
  toUserId: string
  status: "pending" | "accepted" | "blocked"
  createdAt: Date
}

type Report = {
  id: string
  reporterId: string
  targetUserId: string
  loungeId: string
  reason: string
  metadata: Record<string, unknown>
  createdAt: Date
}
```

---

## 18. 이벤트 프로토콜 초안

```ts
type AvatarAnimation =
  | "idle"
  | "walk"
  | "run"
  | "sit"
  | "wave"
  | "nod"
  | "clap"
  | "talk"
  | "listen"
  | "handshake"

type ClientToServerEvent =
  | {
      type: "player:move"
      x: number
      y: number
      z: number
      rotationY: number
      velocity: number
    }
  | {
      type: "player:animation"
      animation: AvatarAnimation
    }
  | {
      type: "table:join"
      tableId: string
      seatId?: string
    }
  | {
      type: "table:leave"
      tableId: string
    }
  | {
      type: "interaction:wave"
      targetUserId?: string
    }
  | {
      type: "interaction:handshake_request"
      targetUserId: string
    }
  | {
      type: "interaction:handshake_accept"
      requestId: string
    }
  | {
      type: "private:request"
      targetUserId: string
    }
  | {
      type: "private:accept"
      requestId: string
    }
  | {
      type: "moderation:report"
      targetUserId: string
      reason: string
    }

type ServerToClientEvent =
  | {
      type: "player:joined"
      player: PlayerState
    }
  | {
      type: "player:left"
      userId: string
    }
  | {
      type: "player:state"
      userId: string
      state: Partial<PlayerState>
    }
  | {
      type: "interaction:handshake_start"
      a: string
      b: string
      startAt: number
      anchorA: Transform
      anchorB: Transform
    }
  | {
      type: "private:move_to_pod"
      podId: string
      users: string[]
    }
  | {
      type: "moderation:action"
      action: "mute" | "kick" | "ban"
      targetUserId: string
    }
```

---

## 19. Codex 개발 계획

### 19.1 개발 원칙

Codex에는 “전체 서비스를 한 번에 만들어줘”라고 지시하지 않는다. 다음처럼 기능 단위로 쪼개서 진행한다.

- 수직 기능 단위로 작업
- 각 작업은 독립 PR 형태로 완료
- 테스트 가능한 acceptance criteria 포함
- mock data 우선
- 3D/Realtime/Voice를 한 번에 묶지 않고 분리

### 19.2 레포 구조

```text
human-connection/
  apps/
    web/
      src/
        app/
        components/
        features/
          lounge/
          avatar/
          world/
          voice/
          profile/
          moderation/
        lib/
        styles/
    api/
      src/
        auth/
        users/
        lounges/
        assets/
        scenes/
        reports/
        livekit/
    realtime/
      src/
        rooms/
          LoungeRoom.ts
          PrivateRoom.ts
        schema/
          PlayerState.ts
          LoungeState.ts
        commands/
  packages/
    avatar-core/
      src/
        AvatarController.ts
        AnimationController.ts
        InteractionController.ts
        LookAtController.ts
        IKController.ts
    world-core/
      src/
        SceneManifestLoader.ts
        AssetCatalog.ts
        ZoneManager.ts
        SeatAnchorManager.ts
        CollisionManager.ts
    protocol/
      src/
        events.ts
        room-types.ts
    ui/
    config/
  assets/
    avatars/
    animations/
      idle/
      locomotion/
      gestures/
      interactions/
    environments/
    props/
  docs/
    PRD.md
    ARCHITECTURE.md
    CODEX_TASKS.md
```

### 19.3 Codex Task Breakdown

#### Task 1. Monorepo Bootstrap

목표:

- pnpm workspace / Turborepo 구성
- Next.js web app
- Fastify API app
- Colyseus realtime app
- 공통 TypeScript config
- ESLint/Prettier
- 기본 README

Codex prompt:

```text
Create a Turborepo monorepo for a browser-based 3D social platform named Human Connection.
Apps: web Next.js TypeScript, api Fastify TypeScript, realtime Colyseus TypeScript.
Packages: avatar-core, world-core, protocol, ui, config.
Use pnpm workspaces. Add shared tsconfig, eslint, prettier, and local dev commands.
Do not implement business logic yet. Add README with commands.
```

Acceptance criteria:

- `pnpm install` 성공
- `pnpm dev`로 web/api/realtime 실행
- TypeScript build 성공

#### Task 2. Basic 3D Lounge Shell

목표:

- React Three Fiber Canvas
- 기본 바닥/벽/테이블
- 3인칭 카메라
- WASD 이동
- placeholder avatar

Codex prompt:

```text
Implement a basic 3D lounge scene in apps/web using React Three Fiber.
Create floor, walls, 3 tables, and a third-person camera following a placeholder capsule avatar.
Support WASD movement and smooth rotation. Keep physics simple.
Add a debug panel showing position and current movement state.
```

#### Task 3. Scene Manifest Runtime Loader

목표:

- JSON scene manifest 타입 정의
- baseSceneUrl 로드
- props 로드
- spawn/talk/private zone debug 표시

Codex prompt:

```text
Create a world-core package that loads a SceneManifest JSON.
It should load a base GLB scene and prop GLB assets by assetId using an AssetCatalog.
Render debug helpers for spawn points, talk zones, seat anchors, and private pods.
Use React Three Fiber integration in apps/web.
```

#### Task 4. Asset Catalog + Admin Decoration Editor MVP

목표:

- 관리자 화면에서 prop 추가/이동/회전/삭제
- JSON 저장/불러오기
- grid snap

Codex prompt:

```text
Build an admin-only decoration editor MVP.
Use mock auth for now.
Show an asset catalog sidebar with furniture/plant/signage categories.
Allow placing props into the current scene, selecting them, moving/rotating/scaling with transform controls, grid snapping, and exporting the updated SceneManifest JSON.
```

#### Task 5. VRM Avatar Loader

목표:

- @pixiv/three-vrm 설치
- 기본 VRM 아바타 로드
- idle animation
- 아바타 방향/카메라 follow 연결

Codex prompt:

```text
Implement a VRM avatar loader in packages/avatar-core using @pixiv/three-vrm.
Load a default VRM from /assets/avatars/default.vrm.
Expose AvatarController with setPosition, setRotation, playAnimation, lookAt, and dispose methods.
Integrate it into the web lounge scene, replacing the placeholder capsule.
```

#### Task 6. Avatar Animation State Machine

목표:

- idle/walk/sit/wave/nod/talk/listen
- AnimationMixer 기반 crossfade
- 버튼으로 gesture 테스트

Codex prompt:

```text
Create an AnimationController for VRM avatars.
Support idle, walk, sit, wave, nod, clap, talk, and listen states.
Use Three.js AnimationMixer with crossfades.
Add a dev UI to trigger each animation.
If real animation files are missing, create placeholder clips or stubs with clear TODOs.
```

#### Task 7. Colyseus Lounge Sync

목표:

- room join/leave
- 위치/회전 동기화
- animation state 동기화
- remote avatars 표시

Codex prompt:

```text
Implement Colyseus realtime sync for LoungeRoom.
Sync player id, nickname, avatarUrl, position, rotationY, and animationState.
Render remote avatars in the web client with interpolation.
Handle join, leave, reconnect, and stale players.
```

#### Task 8. LiveKit Voice MVP

목표:

- API 서버 token 발급
- 클라이언트 room join
- mute/unmute
- speaking indicator

Codex prompt:

```text
Add LiveKit voice integration.
API server should issue LiveKit access tokens for a lounge room.
Web client should join the LiveKit room, publish microphone audio, support mute/unmute, and show speaking indicators above avatars.
Use environment variables for LiveKit URL and API keys.
```

#### Task 9. Table Seating + Audio Zone

목표:

- 테이블 zone 접근/착석
- seat anchor 이동
- sit animation
- table membership sync
- 같은 테이블 UI

Codex prompt:

```text
Implement table seating.
Use talkZones and seatAnchors from SceneManifest.
When a player joins a table, move them to an available seat anchor, rotate them toward the table center, play sit animation, and sync table membership via Colyseus.
Show current table topic and participants in the UI.
```

#### Task 10. 1:1 Private Pod

목표:

- 사용자 클릭
- 1대1 요청/수락/거절
- private pod 이동
- 외부 음성 차단 또는 별도 LiveKit room 전환

Codex prompt:

```text
Implement 1:1 private conversation requests.
A user can click another user, send a request, and the target can accept or decline.
On accept, move both players to an available private pod and isolate their audio.
Add leave private conversation action that returns users to the lounge spawn or previous location.
```

#### Task 11. Moderation MVP

목표:

- 신고/차단/음소거
- 운영자 kick
- 신고 로그 API

Codex prompt:

```text
Implement moderation MVP.
Users can mute, block, and report other users.
Reports are stored through the API.
Admin users can view active lounge users and kick a user from a lounge.
Blocked users cannot send private requests to the blocker.
```

#### Task 12. Metrics + Admin Dashboard

목표:

- 입장/퇴장 이벤트
- 테이블 착석 시간
- 1대1 전환
- 긍정 피드백
- 신고율

Codex prompt:

```text
Add basic product analytics events.
Track lounge_enter, lounge_exit, table_join, table_leave, private_request, private_accept, report_created, positive_feedback.
Create an admin dashboard showing active lounges, active users, table occupancy, private conversations, and reports.
```

---

## 20. 성공 지표

초기에는 가입자 수보다 **대화 성공률**을 봐야 한다.

### 20.1 North Star Metric

**의미 있는 대화 세션 수**

정의:

> 2명 이상이 같은 테이블 또는 1대1 공간에서 3분 이상 음성/텍스트 상호작용을 하고, 세션 종료 후 최소 한 명이 긍정 피드백을 남긴 대화.

### 20.2 핵심 지표

| 지표 | 의미 |
|---|---|
| 라운지 입장 후 3분 이상 체류율 | 첫 경험이 어색하지 않은가 |
| 첫 대화 참여까지 걸린 시간 | 대화 진입이 빠른가 |
| 테이블 착석률 | 공간 구조가 대화를 유도하는가 |
| 1대1 대화 전환율 | 그룹 대화가 관계로 이어지는가 |
| 대화 후 연결 저장률 | 만남이 의미 있었는가 |
| 재방문율 | 다시 들어올 이유가 있는가 |
| 신고율 | 자정작용이 작동하는가 |
| 라운지별 평균 대화 시간 | 주제별 밀도가 충분한가 |

---

## 21. 로드맵

### Phase 0. Prototype

목표: “3D 공간에서 아바타가 걷고, 테이블에 앉고, 음성으로 대화한다”를 증명한다.

포함:

- 기본 3D 라운지
- placeholder avatar
- WASD 이동
- basic LiveKit voice
- basic Colyseus sync
- 테이블 착석 mock

### Phase 1. MVP

목표: 실제 사용자가 창업/개발/디자인 라운지에 들어와 의미 있는 대화를 할 수 있다.

포함:

- VRM avatar
- 기본 gesture
- 라운지 목록
- 게스트 입장
- 3개 라운지
- 테이블 착석
- 1대1 private pod
- 신고/차단
- 운영자 관리

### Phase 2. Alpha

목표: 공간 꾸미기와 운영자 관리 기능을 강화한다.

포함:

- admin decoration editor
- asset catalog
- 라운지별 scene manifest 관리
- mentor booth
- stage/pitch zone
- better spatial audio
- metrics dashboard

### Phase 3. Beta

목표: 커뮤니티 성장과 사용자 유지 기능을 강화한다.

포함:

- 로그인/프로필 고도화
- 연결 저장
- 관심 라운지 알림
- 라운지 호스트 권한
- 제한적 공간 커스터마이징
- AI 안내자/NPC
- 세션 후 요약/후속 연결 추천

### Phase 4. Growth

목표: 사용자 제작 라운지와 이벤트 플랫폼으로 확장한다.

포함:

- private lounge 생성
- 검수 기반 public lounge 등록
- 이벤트/세미나
- 멘토링 세션
- 라운지 템플릿 마켓
- 외부 링크/툴 연동

---

## 22. 주요 리스크와 대응

### 22.1 3D 월드가 목적화되는 리스크

문제:

- 사용자가 공간은 멋지다고 느끼지만 대화는 하지 않을 수 있다.

대응:

- 라운지는 작고 대화 중심으로 설계한다.
- 활성 테이블과 주제를 먼저 보여준다.
- 공간 탐험보다 착석과 대화 진입을 우선한다.

### 22.2 아바타 자연스러움 부족

문제:

- 어색한 아바타 동작은 오히려 몰입을 깨뜨린다.

대응:

- 고난도 동작보다 idle, look-at, nod, sit, talk/listen을 먼저 완성한다.
- 악수는 Alpha 이후로 미룬다.
- 표정과 립싱크는 최소 기능부터 구현한다.

### 22.3 사용자 제작 공간의 moderation 부담

문제:

- 누구나 공간을 꾸미게 하면 저작권/선정성/혐오 표현 문제가 생길 수 있다.

대응:

- MVP/Alpha는 운영자 전용 공간 꾸미기만 제공한다.
- 사용자 제작 라운지는 Beta 이후 검수 기반으로 연다.
- asset catalog는 승인된 CC0/자체 제작 에셋 중심으로 운영한다.

### 22.4 음성 대화의 안전 문제

문제:

- 음성은 텍스트보다 moderation이 어렵다.

대응:

- 신고/차단/음소거를 즉시 접근 가능하게 둔다.
- 1대1 요청은 상호 동의 필수로 한다.
- 반복 신고 사용자는 자동 제한한다.
- 미성년자 보호 정책을 별도로 수립한다.

### 22.5 성능 문제

문제:

- 아바타, 음성, 3D 공간, 실시간 동기화가 동시에 돌아가면 저사양 기기에서 무거울 수 있다.

대응:

- GLB/texture 최적화
- low-poly 기반 MVP
- avatar LOD
- 동시 접속자 제한
- 라운지별 인원 제한
- 모바일 최적화는 Alpha 이후 단계적으로 진행

---

## 23. 개발 우선순위

### P0

- 웹 접속
- 기본 라운지
- 아바타 이동
- 실시간 위치 동기화
- 음성 대화
- 테이블 착석
- 신고/차단

### P1

- VRM 아바타
- gesture
- 1대1 private pod
- 라운지 목록
- 관심 태그
- 프로필 카드
- scene manifest loader

### P2

- admin decoration editor
- asset catalog
- stage/pitch zone
- mentor booth
- analytics dashboard
- better spatial audio

### P3

- AI host/NPC
- 사용자 라운지 커스터마이징
- 이벤트 기능
- 고급 추천
- 모바일 최적화

---

## 24. 참고 소스 / Repo

### 24.1 Avatar

- pixiv/three-vrm: https://github.com/pixiv/three-vrm
- VRM Animation / VRMA: https://vrm.dev/en/vrma/
- met4citizen/TalkingHead: https://github.com/met4citizen/TalkingHead
- vladmandic/human-three-vrm: https://github.com/vladmandic/human-three-vrm
- webdeveloperhyper/dev-fun-collab-v2-public: https://github.com/webdeveloperhyper/dev-fun-collab-v2-public
- Mixamo: https://www.mixamo.com/

### 24.2 World / Space Editor

- Hubs Foundation Spoke: https://github.com/Hubs-Foundation/Spoke
- Triplex: https://github.com/pmndrs/triplex
- react-planner: https://github.com/cvdlab/react-planner
- PlayCanvas Editor: https://github.com/playcanvas/editor
- three.js editor: https://threejs.org/editor/
- A-Frame environment component: https://github.com/supermedium/aframe-environment-component
- Hyperfy: https://github.com/hyperfy-xyz/hyperfy
- iR Engine: https://github.com/ir-engine/ir-engine

### 24.3 3D Assets

- Kenney Furniture Kit: https://kenney.nl/assets/furniture-kit
- Poly Haven: https://polyhaven.com/
- ambientCG: https://ambientcg.com/
- Quaternius: https://quaternius.com/

### 24.4 Realtime / 3D Runtime

- React Three Fiber: https://github.com/pmndrs/react-three-fiber
- drei: https://github.com/pmndrs/drei
- LiveKit: https://docs.livekit.io/
- Colyseus: https://docs.colyseus.io/
- recast-navigation-js: https://github.com/isaac-mason/recast-navigation-js
- three-pathfinding: https://github.com/donmccurdy/three-pathfinding
- glTF Transform: https://gltf-transform.dev/

### 24.5 Codex

- OpenAI Codex: https://openai.com/codex/
- Codex CLI: https://github.com/openai/codex

---

## 25. 최종 결론

휴먼커넥션의 초기 성공은 “얼마나 멋진 메타버스를 만들었는가”가 아니라, **사용자가 들어온 지 몇 분 안에 의미 있는 사람과 대화하게 만들 수 있는가**에 달려 있다.

따라서 개발 방향은 다음이 가장 현실적이다.

```text
Next.js + React Three Fiber
+ VRM self-hosted avatar
+ GLB lounge scene
+ JSON scene manifest
+ asset catalog
+ Colyseus realtime sync
+ LiveKit voice
+ admin-only decoration editor
```

초기 MVP는 창업/개발/디자인 3개 라운지로 시작한다. 공간은 작고 밀도 있게 만든다. 아바타는 손 흔들기, 끄덕임, 앉기, 말하기/듣기 반응부터 자연스럽게 만든다. 악수나 고급 모션은 Alpha 이후로 미룬다.

가장 중요한 제품 질문은 이것이다.

> **사용자가 이 공간에 들어왔을 때, “여기서 누구와 이야기하면 좋을지”가 10초 안에 보이는가?**

이 질문에 답할 수 있다면 휴먼커넥션은 단순한 메타버스가 아니라, 온라인에서 사람을 만나는 새로운 방식이 될 수 있다.
