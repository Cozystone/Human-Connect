export type LoungeId = "startup" | "developer" | "design";
export type Vector3Tuple = [number, number, number];

export type TopicTable = {
  id: string;
  label: string;
  topic: string;
  seats: number;
  occupied: number;
  position: Vector3Tuple;
  color: string;
};

export type Guest = {
  id: string;
  name: string;
  role: string;
  interests: string[];
  position: Vector3Tuple;
  color: string;
};

export type Lounge = {
  id: LoungeId;
  name: string;
  tone: string;
  prompt: string;
  accent: string;
  tables: TopicTable[];
  guests: Guest[];
};

export const lounges: Lounge[] = [
  {
    id: "startup",
    name: "창업 라운지",
    tone: "창업자, 빌더, 초기 신호",
    prompt: "이번 주에 실제 사용자 5명에게 무엇을 검증해볼까요?",
    accent: "#2b8c73",
    tables: [
      {
        id: "mvp",
        label: "MVP 테이블",
        topic: "MVP 범위와 첫 고객 반응",
        seats: 6,
        occupied: 4,
        position: [-12, 0, -7],
        color: "#2b8c73"
      },
      {
        id: "fundraising",
        label: "투자 대화 테이블",
        topic: "피치 명확도, 트랙션, 투자자 핏",
        seats: 5,
        occupied: 2,
        position: [3, 0, -12],
        color: "#e1a13a"
      },
      {
        id: "team",
        label: "팀빌딩 테이블",
        topic: "공동창업자와 초기 협업자 찾기",
        seats: 6,
        occupied: 3,
        position: [14, 0, -4],
        color: "#87b7c7"
      }
    ],
    guests: [
      {
        id: "mina",
        name: "Mina",
        role: "제품 창업자",
        interests: ["MVP", "AI 서비스", "B2B"],
        position: [-9.5, 0, -4.2],
        color: "#d97862"
      },
      {
        id: "jun",
        name: "Jun",
        role: "디자인 파트너",
        interests: ["UX", "브랜드", "피드백"],
        position: [8, 0, -1],
        color: "#5b8fb9"
      },
      {
        id: "ari",
        name: "Ari",
        role: "엔젤 멘토",
        interests: ["트랙션", "피치", "네트워크"],
        position: [18, 0, -8],
        color: "#9a6fb0"
      }
    ]
  },
  {
    id: "developer",
    name: "개발 라운지",
    tone: "코드 리뷰, 사이드 프로젝트, 오픈소스",
    prompt: "오늘 밤 같이 풀어볼 만한 기술 문제가 있나요?",
    accent: "#3d78a5",
    tables: [
      {
        id: "nextjs",
        label: "Next.js 테이블",
        topic: "App Router, 배포, 성능",
        seats: 6,
        occupied: 5,
        position: [-12, 0, -7],
        color: "#3d78a5"
      },
      {
        id: "ai",
        label: "AI 빌더 테이블",
        topic: "에이전트, 평가, 제품 워크플로",
        seats: 6,
        occupied: 3,
        position: [3, 0, -12],
        color: "#2b8c73"
      },
      {
        id: "opensource",
        label: "오픈소스 테이블",
        topic: "메인테이너, 기여자, 프로젝트 핏",
        seats: 5,
        occupied: 1,
        position: [14, 0, -4],
        color: "#d18f35"
      }
    ],
    guests: [
      {
        id: "nora",
        name: "Nora",
        role: "프론트엔드 엔지니어",
        interests: ["React", "접근성", "R3F"],
        position: [-9.5, 0, -4.2],
        color: "#5b8fb9"
      },
      {
        id: "tae",
        name: "Tae",
        role: "플랫폼 엔지니어",
        interests: ["인프라", "실시간", "DX"],
        position: [8, 0, -1],
        color: "#61a675"
      },
      {
        id: "sol",
        name: "Sol",
        role: "AI 앱 빌더",
        interests: ["에이전트", "음성", "평가"],
        position: [18, 0, -8],
        color: "#9a6fb0"
      }
    ]
  },
  {
    id: "design",
    name: "디자인 라운지",
    tone: "포트폴리오 피드백, UI 리뷰, 비주얼 시스템",
    prompt: "지금 디자인에서 다른 시선이 필요한 부분은 어디인가요?",
    accent: "#b15f73",
    tables: [
      {
        id: "portfolio",
        label: "포트폴리오 테이블",
        topic: "케이스 스터디, 강점, 발표 구성",
        seats: 5,
        occupied: 2,
        position: [-12, 0, -7],
        color: "#b15f73"
      },
      {
        id: "uiux",
        label: "UI/UX 리뷰",
        topic: "플로우, 위계, 마찰 지점",
        seats: 6,
        occupied: 4,
        position: [3, 0, -12],
        color: "#2b8c73"
      },
      {
        id: "brand",
        label: "브랜드 테이블",
        topic: "아이덴티티, 내러티브, 런칭 에셋",
        seats: 5,
        occupied: 3,
        position: [14, 0, -4],
        color: "#e1a13a"
      }
    ],
    guests: [
      {
        id: "yuna",
        name: "Yuna",
        role: "UX 디자이너",
        interests: ["플로우", "프로토타입", "리서치"],
        position: [-9.5, 0, -4.2],
        color: "#d97862"
      },
      {
        id: "kai",
        name: "Kai",
        role: "브랜드 디자이너",
        interests: ["시스템", "런칭", "타이포그래피"],
        position: [8, 0, -1],
        color: "#6f8cc7"
      },
      {
        id: "ren",
        name: "Ren",
        role: "크리에이티브 테크놀로지스트",
        interests: ["모션", "3D", "설치 작업"],
        position: [18, 0, -8],
        color: "#61a675"
      }
    ]
  }
];

export function getLounge(id: LoungeId) {
  return lounges.find((lounge) => lounge.id === id) ?? lounges[0];
}
