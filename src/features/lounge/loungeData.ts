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
    name: "Startup Lounge",
    tone: "founders, builders, early signal",
    prompt: "What would you test with five real users this week?",
    accent: "#2b8c73",
    tables: [
      {
        id: "mvp",
        label: "MVP Table",
        topic: "MVP scope and first customer signal",
        seats: 6,
        occupied: 4,
        position: [-3.2, 0, -1.1],
        color: "#2b8c73"
      },
      {
        id: "fundraising",
        label: "Funding Table",
        topic: "Pitch clarity, traction, investor fit",
        seats: 5,
        occupied: 2,
        position: [0.4, 0, -2.4],
        color: "#e1a13a"
      },
      {
        id: "team",
        label: "Team Table",
        topic: "Finding cofounders and early collaborators",
        seats: 6,
        occupied: 3,
        position: [3.2, 0, -0.9],
        color: "#87b7c7"
      }
    ],
    guests: [
      {
        id: "mina",
        name: "Mina",
        role: "Product founder",
        interests: ["MVP", "AI service", "B2B"],
        position: [-4.2, 0, 0.8],
        color: "#d97862"
      },
      {
        id: "jun",
        name: "Jun",
        role: "Design partner",
        interests: ["UX", "brand", "feedback"],
        position: [2.5, 0, 1.3],
        color: "#5b8fb9"
      },
      {
        id: "ari",
        name: "Ari",
        role: "Angel mentor",
        interests: ["traction", "pitch", "network"],
        position: [4.4, 0, -2.3],
        color: "#9a6fb0"
      }
    ]
  },
  {
    id: "developer",
    name: "Developer Lounge",
    tone: "code review, side projects, open source",
    prompt: "Which technical problem is worth pairing on tonight?",
    accent: "#3d78a5",
    tables: [
      {
        id: "nextjs",
        label: "Next.js Table",
        topic: "App Router, deployments, performance",
        seats: 6,
        occupied: 5,
        position: [-3.2, 0, -1.1],
        color: "#3d78a5"
      },
      {
        id: "ai",
        label: "AI Builder Table",
        topic: "Agents, evaluations, product workflows",
        seats: 6,
        occupied: 3,
        position: [0.4, 0, -2.4],
        color: "#2b8c73"
      },
      {
        id: "opensource",
        label: "Open Source Table",
        topic: "Maintainers, contributors, project fit",
        seats: 5,
        occupied: 1,
        position: [3.2, 0, -0.9],
        color: "#d18f35"
      }
    ],
    guests: [
      {
        id: "nora",
        name: "Nora",
        role: "Frontend engineer",
        interests: ["React", "accessibility", "R3F"],
        position: [-4.2, 0, 0.8],
        color: "#5b8fb9"
      },
      {
        id: "tae",
        name: "Tae",
        role: "Platform engineer",
        interests: ["infra", "realtime", "DX"],
        position: [2.5, 0, 1.3],
        color: "#61a675"
      },
      {
        id: "sol",
        name: "Sol",
        role: "AI app builder",
        interests: ["agents", "voice", "evals"],
        position: [4.4, 0, -2.3],
        color: "#9a6fb0"
      }
    ]
  },
  {
    id: "design",
    name: "Design Lounge",
    tone: "portfolio feedback, UI critique, visual systems",
    prompt: "What part of your design needs a second pair of eyes?",
    accent: "#b15f73",
    tables: [
      {
        id: "portfolio",
        label: "Portfolio Table",
        topic: "Case studies, signal, presentation",
        seats: 5,
        occupied: 2,
        position: [-3.2, 0, -1.1],
        color: "#b15f73"
      },
      {
        id: "uiux",
        label: "UI/UX Review",
        topic: "Flows, hierarchy, friction",
        seats: 6,
        occupied: 4,
        position: [0.4, 0, -2.4],
        color: "#2b8c73"
      },
      {
        id: "brand",
        label: "Brand Table",
        topic: "Identity, narrative, launch assets",
        seats: 5,
        occupied: 3,
        position: [3.2, 0, -0.9],
        color: "#e1a13a"
      }
    ],
    guests: [
      {
        id: "yuna",
        name: "Yuna",
        role: "UX designer",
        interests: ["flows", "prototypes", "research"],
        position: [-4.2, 0, 0.8],
        color: "#d97862"
      },
      {
        id: "kai",
        name: "Kai",
        role: "Brand designer",
        interests: ["systems", "launch", "typography"],
        position: [2.5, 0, 1.3],
        color: "#6f8cc7"
      },
      {
        id: "ren",
        name: "Ren",
        role: "Creative technologist",
        interests: ["motion", "3D", "installations"],
        position: [4.4, 0, -2.3],
        color: "#61a675"
      }
    ]
  }
];

export function getLounge(id: LoungeId) {
  return lounges.find((lounge) => lounge.id === id) ?? lounges[0];
}
