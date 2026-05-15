import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TripProgress = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  // Simulate trip progress from 0 to 100 over ~10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const isFinished = progress === 100;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Clean, Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-slate-500 hover:text-slate-800 transition-colors p-2 -ml-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <span className="text-[15px] font-bold text-slate-900">
            Hành trình của bạn
          </span>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xl font-bold text-slate-900 mb-1">
                Chuyến đi Đà Lạt
              </p>
              <p className="text-sm font-medium text-slate-500">
                15/05/2026 • 23:30
              </p>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              isFinished 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {isFinished ? 'Đã hoàn thành' : 'Đang di chuyển'}
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="relative mb-8">
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>Khởi hành</span>
              <span>Đích đến</span>
            </div>
            
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative">
              <div 
                className={`h-full rounded-full transition-all duration-200 ease-linear ${isFinished ? 'bg-emerald-500' : 'bg-orange-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Moving Bus Icon */}
            <div 
              className="absolute top-[22px] -translate-y-1/2 transition-all duration-200 ease-linear shadow-sm bg-white p-1.5 rounded-full border border-slate-200 z-10"
              style={{ left: `calc(${progress}% - 16px)` }}
            >
              <svg className={`w-5 h-5 ${isFinished ? 'text-emerald-500' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="flex gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
              <img src="https://i.pravatar.cc/150?img=68" alt="Tài xế" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Tài xế: Nguyễn Văn Minh</p>
              <p className="text-xs text-slate-500 mt-0.5">Biển số: <span className="font-semibold text-slate-700">51B - 123.45</span></p>
            </div>
          </div>
        </div>

        {/* Dynamic Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-6">Lịch trình chi tiết</h3>
          
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
            
            {/* Step 1: Start */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white bg-orange-500 shadow-sm" />
              <div>
                <p className="text-sm font-bold text-slate-900">Bến xe Miền Đông</p>
                <p className="text-xs text-slate-500 mt-1">Đã khởi hành lúc 23:30</p>
              </div>
            </div>

            {/* Step 2: Intermediate */}
            <div className="relative pl-6">
              <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${progress >= 50 ? 'bg-orange-500' : 'bg-slate-200'}`} />
              <div>
                <p className={`text-sm font-bold transition-colors ${progress >= 50 ? 'text-slate-900' : 'text-slate-400'}`}>
                  Trạm dừng chân Madagui
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {progress >= 50 ? 'Đã đi qua lúc 02:15' : 'Dự kiến 02:15'}
                </p>
              </div>
            </div>

            {/* Step 3: End */}
            <div className="relative pl-6">
              <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${progress >= 100 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              <div>
                <p className={`text-sm font-bold transition-colors ${progress >= 100 ? 'text-slate-900' : 'text-slate-400'}`}>
                  Bến xe Đà Lạt
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {progress >= 100 ? 'Đã đến nơi lúc 05:45' : 'Dự kiến 05:45'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Action Button */}
        <div className="pt-4 pb-8 h-24">
          <button
            onClick={() => navigate('/post-trip-feedback')}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-500 ${
              isFinished 
                ? 'opacity-100 translate-y-0 bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-0.5 pointer-events-auto' 
                : 'opacity-0 translate-y-4 pointer-events-none absolute'
            }`}
          >
            Đánh giá chuyến đi
          </button>
          
          {/* Subtle note while waiting (Optional) */}
          {!isFinished && (
            <p className="text-center text-sm font-medium text-slate-400 animate-pulse mt-4">
              Đang cập nhật vị trí... ({progress}%)
            </p>
          )}
        </div>

      </main>
    </div>
  );
};
