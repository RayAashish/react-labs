import { useState } from "react";

// Phase 1 Labs
import ProfileCardPropsLab from "./labs/01_components_jsx_and_props/codes/ProfileCardPropsLab";
import ConditionalRenderingLab from "./labs/01_components_jsx_and_props/codes/ConditionalRenderingLab";
import CounterBatchingLab from "./labs/02_usestate_and_events/codes/CounterBatchingLab";
import TodoArrayAndObjectStateLab from "./labs/02_usestate_and_events/codes/TodoArrayAndObjectStateLab";
import FilterableProductListLab from "./labs/03_lists_keys_and_lifting_state/codes/FilterableProductListLab";
import CompleteSignupFormLab from "./labs/04_forms_and_validation/codes/CompleteSignupFormLab";
import WindowResizeAndTimerCleanupLab from "./labs/05_useeffect_and_lifecycle/codes/WindowResizeAndTimerCleanupLab";
import FullCrudApiDashboardLab from "./labs/06_rest_api_crud_integration/codes/FullCrudApiDashboardLab";

// Phase 2 Labs
import AutoFocusInputAndStopwatchLab from "./labs/07_useref_and_dom_access/codes/AutoFocusInputAndStopwatchLab";
import ProtectedAdminRouteLab from "./labs/08_react_router_and_protected_routes/codes/ProtectedAdminRouteLab";
import ThemeAndUserAuthContextLab from "./labs/09_context_api_and_prop_drilling/codes/ThemeAndUserAuthContextLab";
import ShoppingCartReducerLab from "./labs/10_usereducer_and_complex_state/codes/ShoppingCartReducerLab";
import ExpensiveCalculationMemoLab from "./labs/11_performance_memoization_and_hooks/codes/ExpensiveCalculationMemoLab";
import CustomUseFetchHookLab from "./labs/11_performance_memoization_and_hooks/codes/CustomUseFetchHookLab";
import GlobalStoreSliceLab from "./labs/12_redux_toolkit_or_zustand_capstone/codes/GlobalStoreSliceLab";

const LECTURES = [
  {
    id: "01",
    phase: 1,
    title: "Components, JSX & Props",
    analogy: "Java DTO / Record & Pure Service Function",
    labs: [
      { id: "props", name: "Profile Card Props Contract", component: ProfileCardPropsLab },
      { id: "conditional", name: "Conditional Rendering (Ternary & &&)", component: ConditionalRenderingLab },
    ],
    noteSummary: "Props are immutable arguments (final DTOs). JSX compiles to React.createElement().",
  },
  {
    id: "02",
    phase: 1,
    title: "useState & State Immutability",
    analogy: "ApplicationEventPublisher & AtomicInteger updater",
    labs: [
      { id: "batching", name: "Batching & Functional Updates", component: CounterBatchingLab },
      { id: "immutability", name: "Object & Array Spread Immutability", component: TodoArrayAndObjectStateLab },
    ],
    noteSummary: "Reference equality (old === new) drives renders. Mutating in-place breaks UI updates.",
  },
  {
    id: "03",
    phase: 1,
    title: "Lists, Keys & Lifting State",
    analogy: "Java Stream.map() & Stable Primary Key (@Id)",
    labs: [{ id: "lists", name: "Filterable Catalog & Callback Lifting", component: FilterableProductListLab }],
    noteSummary: "Keys identify Virtual DOM nodes during Fiber diffing. Never use random IDs or unstable indices.",
  },
  {
    id: "04",
    phase: 1,
    title: "Forms & Validation",
    analogy: "Spring @ModelAttribute & BindingResult",
    labs: [{ id: "forms", name: "Multi-Field Controlled Form", component: CompleteSignupFormLab }],
    noteSummary: "Single source of truth in state. e.preventDefault() prevents native HTTP page reload.",
  },
  {
    id: "05",
    phase: 1,
    title: "useEffect & Lifecycle Cleanups",
    analogy: "@PostConstruct (Mount) & @PreDestroy (Cleanup)",
    labs: [{ id: "cleanup", name: "Timer & Window Listener Teardown", component: WindowResizeAndTimerCleanupLab }],
    noteSummary: "Always return cleanup functions from effects to destroy timers and listeners.",
  },
  {
    id: "06",
    phase: 1,
    title: "REST API CRUD Integration",
    analogy: "Spring Boot @RestController Consumer (WebClient)",
    labs: [{ id: "crud", name: "Full CRUD API Dashboard", component: FullCrudApiDashboardLab }],
    noteSummary: "Every API call must handle 3 states: Loading, Error, and Data.",
  },
  {
    id: "07",
    phase: 2,
    title: "useRef & DOM Access",
    analogy: "Private Volatile Variable / Direct Memory Pointer",
    labs: [{ id: "ref", name: "Silent Memory Ref vs State Repaint", component: AutoFocusInputAndStopwatchLab }],
    noteSummary: "useRef mutates silently in memory without triggering re-renders; provides direct DOM focus.",
  },
  {
    id: "08",
    phase: 2,
    title: "React Router & Auth Guards",
    analogy: "Spring Security FilterChain / @PreAuthorize",
    labs: [{ id: "router", name: "Protected Admin Route Guard", component: ProtectedAdminRouteLab }],
    noteSummary: "Client-side routing with Navigate redirect guards to prevent unauthorized screen access.",
  },
  {
    id: "09",
    phase: 2,
    title: "Context API & Prop Drilling",
    analogy: "SecurityContextHolder & ApplicationContext",
    labs: [{ id: "context", name: "Global Theme & User Auth Context", component: ThemeAndUserAuthContextLab }],
    noteSummary: "Bypasses intermediate components to deliver global state directly to deep descendants.",
  },
  {
    id: "10",
    phase: 2,
    title: "useReducer & State Machines",
    analogy: "CQRS Command Pattern / Deterministic Event Router",
    labs: [{ id: "reducer", name: "Shopping Cart State Machine", component: ShoppingCartReducerLab }],
    noteSummary: "(state, action) => newState. Pure transition function eliminates scattered state bugs.",
  },
  {
    id: "11",
    phase: 2,
    title: "Performance & Custom Hooks",
    analogy: "Spring @Cacheable & Reusable @Service Bean",
    labs: [
      { id: "memo", name: "useMemo CPU Computation Cache", component: ExpensiveCalculationMemoLab },
      { id: "customHook", name: "Custom useFetch() Reusable Hook", component: CustomUseFetchHookLab },
    ],
    noteSummary: "useMemo caches return values; custom hooks package stateful logic into 1-line helpers.",
  },
  {
    id: "12",
    phase: 2,
    title: "Global Store & JWT Interceptor",
    analogy: "Redis Cache + ClientHttpRequestInterceptor",
    labs: [{ id: "redux", name: "Production Store & Auth Interceptor", component: GlobalStoreSliceLab }],
    noteSummary: "Global store slices + automatic Authorization: Bearer token injection on outgoing HTTP requests.",
  },
];

export default function App() {
  const [selectedLectureId, setSelectedLectureId] = useState("01");
  const [selectedLabIndex, setSelectedLabIndex] = useState(0);

  const currentLecture = LECTURES.find((l) => l.id === selectedLectureId) || LECTURES[0];
  const ActiveComponent = currentLecture.labs[selectedLabIndex]?.component || currentLecture.labs[0].component;

  const handleSelectLecture = (id) => {
    setSelectedLectureId(id);
    setSelectedLabIndex(0);
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-80 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <h1 className="font-extrabold text-white text-base tracking-tight">React Labs Master</h1>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">
              raysi
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">12-Module Java-to-React Course</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Phase 1 */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-2 mb-1.5">
              Phase 1: Foundations (01 - 06)
            </div>
            <div className="space-y-1">
              {LECTURES.filter((l) => l.phase === 1).map((lec) => {
                const isActive = lec.id === selectedLectureId;
                return (
                  <button
                    key={lec.id}
                    onClick={() => handleSelectLecture(lec.id)}
                    className={`w-full text-left p-2 rounded-lg transition-all flex items-start gap-2.5 ${
                      isActive
                        ? "bg-indigo-600 text-white font-semibold shadow-sm"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <span className="font-mono text-[11px] opacity-75">{lec.id}</span>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{lec.title}</div>
                      <div className={`text-[10px] truncate ${isActive ? "text-indigo-200" : "text-slate-400"}`}>
                        {lec.analogy}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phase 2 */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2 mb-1.5 flex items-center justify-between">
              <span>Phase 2: Advanced (07 - 12)</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">Core</span>
            </div>
            <div className="space-y-1">
              {LECTURES.filter((l) => l.phase === 2).map((lec) => {
                const isActive = lec.id === selectedLectureId;
                return (
                  <button
                    key={lec.id}
                    onClick={() => handleSelectLecture(lec.id)}
                    className={`w-full text-left p-2 rounded-lg transition-all flex items-start gap-2.5 ${
                      isActive
                        ? "bg-emerald-600 text-white font-semibold shadow-sm"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <span className="font-mono text-[11px] opacity-75">{lec.id}</span>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{lec.title}</div>
                      <div className={`text-[10px] truncate ${isActive ? "text-emerald-200" : "text-slate-400"}`}>
                        {lec.analogy}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          Vite + React + Tailwind + React Router
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-700">
                Lecture {currentLecture.id}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{currentLecture.title}</h2>
            </div>
            <p className="text-xs text-indigo-600 font-medium mt-0.5">
              💡 Backend Mental Model: {currentLecture.analogy}
            </p>
          </div>

          {/* Sub-lab selector if lecture has multiple labs */}
          {currentLecture.labs.length > 1 && (
            <div className="flex bg-slate-100 p-1 rounded-lg border gap-1">
              {currentLecture.labs.map((lab, idx) => (
                <button
                  key={lab.id}
                  onClick={() => setSelectedLabIndex(idx)}
                  className={`text-xs px-3 py-1 rounded font-medium transition-all ${
                    selectedLabIndex === idx
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {lab.name}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Live Interactive Lab Canvas */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Notes Callout */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
            <span className="text-base leading-none">📖</span>
            <div>
              <strong className="font-semibold">Quick Concept: </strong>
              <span>{currentLecture.noteSummary}</span>
              <span className="block mt-0.5 text-[11px] text-blue-700 font-mono">
                Notes path: src/labs/{selectedLectureId}_.../notes/
              </span>
            </div>
          </div>

          {/* Active Lab Component */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs min-h-[380px] flex items-center justify-center">
            <div className="w-full">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
