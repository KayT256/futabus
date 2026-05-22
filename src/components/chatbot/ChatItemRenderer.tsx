import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { Trip } from "@/data/trips";
import { ActionMenu } from "./ActionMenu";
import { QuizOptions } from "./QuizOptions";
import { CatalogGrid } from "./CatalogGrid";
import { CityPicker } from "./CityPicker";
import { StoreList } from "./StoreList";
import { AIOutfitSet } from "./AIOutfitSet";
import { TravelPlanCard } from "./TravelPlanCard";
import { TripCards } from "./TripCards";

const formatVND = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

type ChatItem =
  | { type: "bot"; text: string }
  | { type: "user"; text: string }
  | { type: "action-menu" }
  | { type: "route-form" }
  | { type: "route-result"; recommendedTrip: Trip }
  | { type: "quiz-options"; step: number; options: string[] }
  | { type: "travel-plan"; destinations: string[]; budget: string }
  | { type: "route-cards"; trips: Array<{ id: string; display: "trip" | "map" }> }
  | { type: "travel-set"; setName: string; tripIds: string[] }
  | { type: "catalog"; filter: string }
  | { type: "city-select" }
  | { type: "terminal-list"; city: string }
  | { type: "trip-category" }
  | { type: "trip-form" }
  | { type: "trip-result"; recommendedTrip: Trip }
  | { type: "travel-plan-card"; budget: string; duration: string; vehicleType: string }
  | { type: "typing" };

interface ChatItemRendererProps {
  item: ChatItem;
  index: number;
  interactionDisabled: boolean;
  trips: Trip[];
  terminals: Array<{ city: string; name: string; addr: string }>;
  onRouteSearch: () => void;
  onTripPlanning: () => void;
  onQuiz: () => void;
  onTerminalLookup: () => void;
  onQuizAnswer: (answer: string, step: number) => void;
  onCitySelect: (city: string) => void;
  onViewCatalog: (filter: string) => void;
  tripForm: { passengers: string; luggage: string };
  setTripForm: (form: { passengers: string; luggage: string }) => void;
  addItem: (item: ChatItem) => void;
  onSelectTrip: (tripId: string) => void;
}

function renderInlineMarkdown(text: string, keyPrefix: string = "") {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyPrefix}b${i}`} className="text-[#f97316] font-bold">{part}</strong>
    ) : (
      <span key={`${keyPrefix}t${i}`}>{part}</span>
    )
  );
}

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let numberedBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-1.5">
          {bulletBuffer.map((item, j) => (
            <li key={j} className="leading-relaxed">{renderInlineMarkdown(item, `li${elements.length}-${j}-`)}</li>
          ))}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  const flushNumbered = () => {
    if (numberedBuffer.length > 0) {
      elements.push(
        <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-1 my-1.5">
          {numberedBuffer.map((item, j) => (
            <li key={j} className="leading-relaxed">{renderInlineMarkdown(item, `oli${elements.length}-${j}-`)}</li>
          ))}
        </ol>
      );
      numberedBuffer = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Bullet point: * item or - item
    const bulletMatch = trimmed.match(/^[\*\-•]\s+(.+)/);
    if (bulletMatch) {
      flushNumbered();
      bulletBuffer.push(bulletMatch[1]);
      continue;
    }

    // Numbered list: 1. item or 1) item
    const numMatch = trimmed.match(/^\d+[.)]\s+(.+)/);
    if (numMatch) {
      flushBullets();
      numberedBuffer.push(numMatch[1]);
      continue;
    }

    // Regular line — flush any pending lists
    flushBullets();
    flushNumbered();

    if (trimmed === "") {
      elements.push(<div key={`br-${elements.length}`} className="h-2" />);
    } else {
      elements.push(
        <p key={`p-${elements.length}`} className="leading-relaxed">{renderInlineMarkdown(trimmed, `p${elements.length}-`)}</p>
      );
    }
  }

  // Flush any remaining lists
  flushBullets();
  flushNumbered();

  return <>{elements}</>;
}

export function ChatItemRenderer({
  item,
  index,
  interactionDisabled,
  trips,
  terminals,
  onRouteSearch,
  onTripPlanning,
  onQuiz,
  onTerminalLookup,
  onQuizAnswer,
  onCitySelect,
  onViewCatalog,
  tripForm,
  setTripForm,
  addItem,
  onSelectTrip,
}: ChatItemRendererProps) {
  switch (item.type) {
    case "bot":
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-[#1a1a1a] px-5 py-4 rounded-[20px] rounded-bl-[4px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] max-w-[85%] md:max-w-[70%] text-sm leading-relaxed mb-3"
        >
          <div className="text-sm text-gray-800 whitespace-pre-wrap">
            {renderMarkdown(item.text)}
          </div>
        </motion.div>
      );

    case "user":
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f97316] text-white px-5 py-3 rounded-[20px] rounded-br-[4px] self-end max-w-[80%] md:max-w-[60%] text-sm font-medium mb-3"
        >
          <div className="text-sm">{item.text}</div>
        </motion.div>
      );

    case "action-menu":
      return (
        <ActionMenu
          key={index}
          onRouteSearch={onRouteSearch}
          onTripPlanning={onTripPlanning}
          onQuiz={onQuiz}
          onTerminalLookup={onTerminalLookup}
          disabled={interactionDisabled}
        />
      );

    case "quiz-options":
      return (
        <QuizOptions
          key={index}
          step={item.step}
          options={item.options}
          onAnswer={onQuizAnswer}
          disabled={interactionDisabled}
        />
      );

    case "catalog":
      return (
        <CatalogGrid key={index} filter={item.filter} trips={trips} />
      );

    case "city-select":
      const cities = [...new Set(terminals.map((t) => t.city))];
      return (
        <CityPicker
          key={index}
          cities={cities}
          onSelect={onCitySelect}
          disabled={interactionDisabled}
        />
      );

    case "terminal-list":
      const cityTerminals = terminals.filter((t) => t.city === item.city);
      return (
        <StoreList key={index} terminals={cityTerminals} />
      );

    case "route-cards":
      return (
        <TripCards key={index} trips={item.trips} allTrips={trips} />
      );

    case "route-form":
      return (
        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 my-3">
          <p className="text-sm font-medium text-gray-700">Chọn chuyến xe bạn muốn đặt:</p>
          <div className="space-y-2">
            {trips.slice(0, 5).map((trip) => (
              <button
                key={trip.id}
                onClick={() => !interactionDisabled && onSelectTrip(trip.id)}
                disabled={interactionDisabled}
                className={`w-full p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#f97316] hover:bg-orange-50 transition-all ${interactionDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{trip.route}</div>
                    <div className="text-xs text-gray-500 mt-1">{trip.departureTime} - {trip.arrivalTime}</div>
                    <div className="text-xs text-gray-500">{trip.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#f97316]">{formatVND(trip.price)}</div>
                    <div className="text-xs text-gray-500">{trip.availableSeats} chỗ trống</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      );

    case "route-result":
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-3xl mt-2 mb-3 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#f97316] rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Tuyến đề xuất</span>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white/10 p-4 backdrop-blur-sm mb-4">
              <p className="text-[9px] font-bold text-white/50 uppercase">{item.recommendedTrip.busType}</p>
              <h2 className="text-xl font-black italic text-[#f97316]">{item.recommendedTrip.route}</h2>
              <p className="text-sm text-gray-300 mt-1">{item.recommendedTrip.duration}</p>
              <p className="text-2xl font-black text-white mt-2">{formatVND(item.recommendedTrip.price)}</p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-4">
              <button
                onClick={() => onViewCatalog("all")}
                disabled={interactionDisabled}
                className={`w-full py-3 bg-[#f97316] rounded-xl font-extrabold text-[10px] uppercase transition-colors ${interactionDisabled ? "opacity-50 cursor-default" : "cursor-pointer hover:bg-[#ea580c]"}`}
              >
                Xem các tuyến khác
              </button>
            </div>
          </div>
        </motion.div>
      );

    case "trip-category":
      return (
        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 my-3">
          <button
            onClick={() => addItem({ type: "trip-form" })}
            disabled={interactionDisabled}
            className={`w-full p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#f97316] hover:bg-orange-50 transition-all ${interactionDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="font-semibold text-gray-900">Đi một mình</div>
            <div className="text-xs text-gray-500">Khám phá theo cách riêng</div>
          </button>
          <button
            onClick={() => addItem({ type: "trip-form" })}
            disabled={interactionDisabled}
            className={`w-full p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#f97316] hover:bg-orange-50 transition-all ${interactionDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="font-semibold text-gray-900">Đi cùng nhóm</div>
            <div className="text-xs text-gray-500">Chia sẻ niềm vui cùng bạn bè</div>
          </button>
        </motion.div>
      );

    case "trip-form":
      return (
        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 my-3 p-4 bg-white border border-gray-200 rounded-xl">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Số hành khách</label>
            <input
              type="number"
              placeholder="Nhập số lượng"
              value={tripForm.passengers}
              onChange={(e) => setTripForm({ ...tripForm, passengers: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Hành lý (kg)</label>
            <input
              type="number"
              placeholder="Nhập khối lượng"
              value={tripForm.luggage}
              onChange={(e) => setTripForm({ ...tripForm, luggage: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <button
            onClick={() => {
              const recommended = trips.sort((a: Trip, b: Trip) => a.price - b.price)[0];
              addItem({ type: "trip-result", recommendedTrip: recommended });
            }}
            disabled={interactionDisabled || !tripForm.passengers || !tripForm.luggage}
            className={`w-full py-2 bg-[#f97316] text-white rounded-lg font-semibold text-sm ${interactionDisabled || !tripForm.passengers || !tripForm.luggage ? "opacity-50 cursor-not-allowed" : "hover:bg-[#ea580c]"}`}
          >
            Xem đề xuất
          </button>
        </motion.div>
      );

    case "trip-result":
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-3xl mt-2 mb-3 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#f97316] rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Tuyến đề xuất</span>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white/10 p-4 backdrop-blur-sm mb-4">
              <p className="text-[9px] font-bold text-white/50 uppercase">{item.recommendedTrip.busType}</p>
              <h2 className="text-xl font-black italic text-[#f97316]">{item.recommendedTrip.route}</h2>
              <p className="text-sm text-gray-300 mt-1">{item.recommendedTrip.duration}</p>
              <p className="text-2xl font-black text-white mt-2">{formatVND(item.recommendedTrip.price)}</p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-4">
              <button
                onClick={() => onViewCatalog("all")}
                disabled={interactionDisabled}
                className={`w-full py-3 bg-[#f97316] rounded-xl font-extrabold text-[10px] uppercase transition-colors ${interactionDisabled ? "opacity-50 cursor-default" : "cursor-pointer hover:bg-[#ea580c]"}`}
              >
                Xem các tuyến khác
              </button>
            </div>
          </div>
        </motion.div>
      );

    case "travel-plan-card":
      return (
        <TravelPlanCard
          key={index}
          budget={item.budget}
          duration={item.duration}
          vehicleType={item.vehicleType}
          trips={trips}
        />
      );

    case "typing":
      return (
        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
          <div className="bg-white px-5 py-4 rounded-[20px] rounded-bl-[4px] shadow-sm max-w-[85%] md:max-w-[70%] mb-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gray-300 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}
