export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface ChatResponse {
  reply: string;
  timestamp: number;
}

export interface ValidateCodeResponse {
  valid: boolean;
  remaining?: number;
  total?: number;
  used?: number;
  costs?: {
    chat: number;
  };
  error?: string;
}

export interface Route {
  id: string;
  name: string;
  category: "intercity" | "service";
  price: number;
  image: string;
  productImage: string;
  href: string;
  description: string;
  type: string;
  duration: string;
  departure: string;
  arrival: string;
  isNew: boolean;
}
