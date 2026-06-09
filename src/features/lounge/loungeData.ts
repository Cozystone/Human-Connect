export type LoungeId = "startup" | "developer" | "design";
export type Vector3Tuple = [number, number, number];

export type TopicTable = {
  id: string;
  loungeId: LoungeId;
  label: string;
  topic: string;
  seats: number;
  occupied: number;
  position: Vector3Tuple;
  color: string;
};

export type Guest = {
  id: string;
  loungeId: LoungeId;
  name: string;
  role: string;
  interests: string[];
  position: Vector3Tuple;
  color: string;
};

export type Lounge = {
  id: LoungeId;
  name: string;
  districtName: string;
  tone: string;
  prompt: string;
  accent: string;
  center: Vector3Tuple;
  radius: number;
  tables: TopicTable[];
  guests: Guest[];
};

export const lounges: Lounge[] = [
  {
    id: "startup",
    name: "창업",
    districtName: "빌더스 네트워크",
    tone: "창업자, 빌더, 초기 신호",
    prompt: "아이디어를 검증하고 첫 사용자 반응을 나누는 대화 주제입니다.",
    accent: "#2b8c73",
    center: [0, 0, 0],
    radius: 0,
    tables: [
      {
        id: "startup-mvp",
        loungeId: "startup",
        label: "MVP 테이블",
        topic: "MVP 범위와 첫 고객 반응",
        seats: 6,
        occupied: 4,
        position: [-118, 0, -72],
        color: "#2b8c73"
      },
      {
        id: "startup-fundraising",
        loungeId: "startup",
        label: "투자 대화 테이블",
        topic: "피치 명확도, 트랙션, 투자자 핏",
        seats: 5,
        occupied: 2,
        position: [24, 0, -126],
        color: "#e1a13a"
      },
      {
        id: "startup-team",
        loungeId: "startup",
        label: "팀빌딩 테이블",
        topic: "공동창업자와 초기 협업자 찾기",
        seats: 6,
        occupied: 3,
        position: [134, 0, -54],
        color: "#87b7c7"
      }
    ],
    guests: [
      {
        id: "mina",
        loungeId: "startup",
        name: "Mina",
        role: "제품 창업자",
        interests: ["MVP", "AI 서비스", "B2B"],
        position: [-110, 0, -66],
        color: "#d97862"
      },
      {
        id: "jun",
        loungeId: "startup",
        name: "Jun",
        role: "디자인 파트너",
        interests: ["UX", "브랜드", "피드백"],
        position: [126, 0, -44],
        color: "#5b8fb9"
      },
      {
        id: "ari",
        loungeId: "startup",
        name: "Ari",
        role: "투자 멘토",
        interests: ["트랙션", "피치", "네트워크"],
        position: [16, 0, -118],
        color: "#9a6fb0"
      }
    ]
  },
  {
    id: "developer",
    name: "개발",
    districtName: "코드블록 네트워크",
    tone: "코드 리뷰, 사이드 프로젝트, 오픈소스",
    prompt: "기술 문제와 구현 경험을 빠르게 맞춰보는 대화 주제입니다.",
    accent: "#3d78a5",
    center: [0, 0, 0],
    radius: 0,
    tables: [
      {
        id: "developer-nextjs",
        loungeId: "developer",
        label: "Next.js 테이블",
        topic: "App Router, 배포, 성능",
        seats: 6,
        occupied: 5,
        position: [-148, 0, 44],
        color: "#3d78a5"
      },
      {
        id: "developer-ai",
        loungeId: "developer",
        label: "AI 빌더 테이블",
        topic: "에이전트, 평가, 제품 워크플로",
        seats: 6,
        occupied: 3,
        position: [126, 0, 78],
        color: "#2b8c73"
      },
      {
        id: "developer-opensource",
        loungeId: "developer",
        label: "오픈소스 테이블",
        topic: "메인테이너, 기여, 프로젝트 운영",
        seats: 5,
        occupied: 1,
        position: [72, 0, -154],
        color: "#d18f35"
      }
    ],
    guests: [
      {
        id: "nora",
        loungeId: "developer",
        name: "Nora",
        role: "프론트엔드 엔지니어",
        interests: ["React", "접근성", "R3F"],
        position: [-138, 0, 55],
        color: "#5b8fb9"
      },
      {
        id: "tae",
        loungeId: "developer",
        name: "Tae",
        role: "플랫폼 엔지니어",
        interests: ["인프라", "실시간", "DX"],
        position: [117, 0, 87],
        color: "#61a675"
      },
      {
        id: "sol",
        loungeId: "developer",
        name: "Sol",
        role: "AI 앱 빌더",
        interests: ["에이전트", "생성", "평가"],
        position: [78, 0, -142],
        color: "#9a6fb0"
      }
    ]
  },
  {
    id: "design",
    name: "디자인",
    districtName: "스튜디오 네트워크",
    tone: "포트폴리오 피드백, UI 리뷰, 비주얼 시스템",
    prompt: "시선과 경험의 흐름을 함께 다듬는 대화 주제입니다.",
    accent: "#b15f73",
    center: [0, 0, 0],
    radius: 0,
    tables: [
      {
        id: "design-portfolio",
        loungeId: "design",
        label: "포트폴리오 테이블",
        topic: "케이스 스터디 강점과 발표 구성",
        seats: 5,
        occupied: 2,
        position: [-84, 0, 142],
        color: "#b15f73"
      },
      {
        id: "design-uiux",
        loungeId: "design",
        label: "UI/UX 리뷰",
        topic: "플로우, 단계, 마찰 지점",
        seats: 6,
        occupied: 4,
        position: [36, 0, 168],
        color: "#2b8c73"
      },
      {
        id: "design-brand",
        loungeId: "design",
        label: "브랜드 테이블",
        topic: "아이덴티티, 컬러, 디자인 자산",
        seats: 5,
        occupied: 3,
        position: [166, 0, 26],
        color: "#e1a13a"
      }
    ],
    guests: [
      {
        id: "yuna",
        loungeId: "design",
        name: "Yuna",
        role: "UX 디자이너",
        interests: ["플로우", "프로토타입", "리서치"],
        position: [-76, 0, 132],
        color: "#d97862"
      },
      {
        id: "kai",
        loungeId: "design",
        name: "Kai",
        role: "브랜드 디자이너",
        interests: ["시스템", "색상", "타이포그래피"],
        position: [158, 0, 36],
        color: "#6f8cc7"
      },
      {
        id: "ren",
        loungeId: "design",
        name: "Ren",
        role: "크리에이티브 테크놀로지스트",
        interests: ["모션", "3D", "터치 작업"],
        position: [42, 0, 156],
        color: "#61a675"
      }
    ]
  }
];

export const allTables = lounges.flatMap((lounge) => lounge.tables);
export const allGuests = lounges.flatMap((lounge) => lounge.guests);

export function getLounge(id: LoungeId) {
  return lounges.find((lounge) => lounge.id === id) ?? lounges[0];
}

export function getLoungeForTable(tableId: string) {
  const table = allTables.find((item) => item.id === tableId);
  return table ? getLounge(table.loungeId) : null;
}
