# React Labs: The Complete 12-Module React Course for Backend Engineers
> **Author:** raysi  
> **Stack:** Vite + React + Tailwind CSS + React Router  
> **Target Audience:** Java / Spring Boot & Backend Engineers transitioning into Modern Full-Stack Development

---

## 🚀 Overview & Live Dashboard
This repository contains a full 12-module React curriculum structured specifically around backend mental models. It eliminates frontend jargon and maps every React primitive to familiar concepts from Spring Boot, Java concurrency, database indexing, and network filters.

A single unified master dashboard in `src/App.jsx` lets you run and interact with every single lab live in your browser.

```bash
# Clone and run
npm install
npm run dev
```

---

## 🗺️ 12-Module Course Curriculum

### Phase 1: Foundations (Lectures 01 – 06)
| Module | Core Concepts | Live Interactive Lab | Java / Backend Mental Model |
| :--- | :--- | :--- | :--- |
| **01. Components & Props** | Functional Components, JSX Rules, Props Contract | `ProfileCardPropsLab.jsx`, `ConditionalRenderingLab.jsx` | Immutable Java Records (`record UserDto(...)`) & Pure Service Functions |
| **02. useState & Events** | State batching, Immutability, Object/Array spreads | `CounterBatchingLab.jsx`, `TodoArrayAndObjectStateLab.jsx` | `ApplicationEventPublisher` & `AtomicInteger` updater |
| **03. Lists, Keys & Lifting** | `.map()` rendering, Diffing identity, Child-to-Parent | `FilterableProductListLab.jsx` | Java `Stream.map()` & Database Primary Key (`@Id`) |
| **04. Forms & Validation** | Controlled inputs, Multi-field binding, Validation | `CompleteSignupFormLab.jsx` | Spring `@ModelAttribute` DTO & `BindingResult` |
| **05. useEffect Lifecycle** | Mount, Update, Unmount, Memory Cleanups | `WindowResizeAndTimerCleanupLab.jsx` | `@PostConstruct` (Init) & `@PreDestroy` / `AutoCloseable` (Teardown) |
| **06. REST API CRUD** | Async/Await, Loading/Error/Data states, Optimistic UI | `FullCrudApiDashboardLab.jsx` | Spring Boot `@RestController` Consumer (`RestClient` / `WebClient`) |

### Phase 2: Intermediate & Advanced (Lectures 07 – 12: The Missing Half!)
| Module | Core Concepts | Live Interactive Lab | Java / Backend Mental Model |
| :--- | :--- | :--- | :--- |
| **07. useRef & DOM Access** | Silent memory storage, Zero re-renders, DOM refs | `AutoFocusInputAndStopwatchLab.jsx` | `volatile` private instance variable & direct memory pointers |
| **08. React Router & Guards** | Dynamic routing (`:id`), useNavigate, Auth Guards | `ProtectedAdminRouteLab.jsx` | Spring Security `OncePerRequestFilter` / `@PreAuthorize` |
| **09. Context API** | Eliminating Prop Drilling, Subtree injection | `ThemeAndUserAuthContextLab.jsx` | `SecurityContextHolder` & Spring `ApplicationContext` |
| **10. useReducer** | Complex state transitions, State machines | `ShoppingCartReducerLab.jsx` | CQRS Command Handler & Switch-Case Event Router |
| **11. Performance & Hooks** | `useMemo`, `useCallback`, Custom Hooks (`useFetch`) | `ExpensiveCalculationMemoLab.jsx`, `CustomUseFetchHookLab.jsx` | Spring `@Cacheable` & Reusable `@Service` Utility Bean |
| **12. Global Store & JWT** | Redux/Zustand Store, Slices, Dispatch, Interceptors | `GlobalStoreSliceLab.jsx` | Redis In-Memory Cache, Kafka Producer & `ClientHttpRequestInterceptor` |

---

## ☕ The Java-to-React Mental Model Cheat Sheet

| React Concept | Java / Spring Boot Counterpart | Crucial Mental Rule |
| :--- | :--- | :--- |
| **Component** | `@Service` / Pure Function | Returns a UI tree. Reruns on state change. Must have zero side-effects during render. |
| **Props** | Method parameters / Immutable `record` | Strictly read-only (`final`). Never mutate incoming props. |
| **State (`useState`)** | Observable field with event listener | React checks reference equality (`old === new`). Modifying an array/object in-place prevents re-renders. |
| **`key` Prop** | Database Primary Key (`@Id`) | Gives elements a stable identity across renders. Never use random numbers or array indices. |
| **`useEffect`** | `@PostConstruct` & `@PreDestroy` | Executes side effects (API calls, timers). The returned callback function cleans up memory leaks. |
| **`useRef`** | Plain `private Object` field / pointer | Mutates silently in memory with **zero re-renders**. Ideal for timer handles and physical DOM focus. |
| **Protected Route** | Spring Security `SecurityFilterChain` | Checks JWT in state; redirects unauthorized users to `/login` with HTTP 401/403 behavior. |
| **Context API** | `SecurityContextHolder` | Injects global user/theme data anywhere into the tree without manually forwarding through intermediate layers. |
| **`useReducer`** | CQRS Command Handler | Consolidates complex multi-step state mutations into one pure `(state, command) -> nextState` method. |
| **`useMemo`** | Spring `@Cacheable` | Caches expensive calculations in memory and skips recalculation unless input parameters change. |
| **`useCallback`** | Singleton Method Reference | Preserves function identity so child components wrapped in `React.memo` skip re-rendering. |
| **Custom Hook** | Reusable Spring Helper Service | Packages stateful logic (`useState` + `useEffect`) into a reusable 1-line helper method. |
| **Redux / Zustand Store** | Redis Global In-Memory Cache | Single global source of truth. Slices represent domain tables; Dispatch produces event commands. |
| **Auth Interceptor** | `ClientHttpRequestInterceptor` | Automatically injects `Authorization: Bearer <jwt>` on every outbound HTTP request. |

---

## 📂 Repository Directory Layout
```
react-labs/
├── README.md                                          # Complete React Course Roadmap & Java-to-React Cheat Sheet
├── package.json                                       # Single Vite + React + Tailwind + React Router setup
├── vite.config.js                                     # Lightning-fast Vite bundler config
├── tailwind.config.js                                 # Tailwind CSS configuration
└── src/
    ├── App.jsx                                        # Master Sidebar Dashboard to click through all 12 Lectures live
    ├── main.jsx                                       # App entry point with React Router BrowserRouter
    ├── index.css                                      # Tailwind directives & global typography
    └── labs/
        ├── 01_components_jsx_and_props/               # Lecture 1: Functional Components, JSX rules & Props contract
        │   ├── codes/
        │   │   ├── ProfileCardPropsLab.jsx
        │   │   └── ConditionalRenderingLab.jsx
        │   └── notes/
        │       └── 01-JSX-Components-And-Props.md
        ├── 02_usestate_and_events/                    # Lecture 2: State management, immutability & synthetic events
        │   ├── codes/
        │   │   ├── CounterBatchingLab.jsx
        │   │   └── TodoArrayAndObjectStateLab.jsx
        │   └── notes/
        │       └── 02-UseState-And-State-Immutability.md
        ├── 03_lists_keys_and_lifting_state/           # Lecture 3: Rendering arrays, why 'key' matters & child-to-parent data
        │   ├── codes/
        │   │   └── FilterableProductListLab.jsx
        │   └── notes/
        │       └── 03-Lists-Keys-And-Lifting-State-Up.md
        ├── 04_forms_and_validation/                   # Lecture 4: Controlled vs Uncontrolled inputs & multi-field forms
        │   ├── codes/
        │   │   └── CompleteSignupFormLab.jsx
        │   └── notes/
        │       └── 04-Controlled-Forms-And-Validation.md
        ├── 05_useeffect_and_lifecycle/                # Lecture 5: Mount, Update, Unmount & Cleanup functions
        │   ├── codes/
        │   │   └── WindowResizeAndTimerCleanupLab.jsx
        │   └── notes/
        │       └── 05-UseEffect-Lifecycle-And-Cleanups.md
        ├── 06_rest_api_crud_integration/              # Lecture 6: Fetch/Axios, Async/Await, Loading/Error & Search Debouncing
        │   ├── codes/
        │   │   └── FullCrudApiDashboardLab.jsx
        │   └── notes/
        │       └── 06-Connecting-React-To-Backend-APIs.md
        ├── 07_useref_and_dom_access/                  # Lecture 7: Focusing inputs, persisting values WITHOUT re-rendering
        │   ├── codes/
        │   │   └── AutoFocusInputAndStopwatchLab.jsx
        │   └── notes/
        │       └── 07-UseRef-Vs-UseState-Explained.md
        ├── 08_react_router_and_protected_routes/      # Lecture 8: Dynamic URLs (/users/:id), useNavigate & Auth Guards
        │   ├── codes/
        │   │   └── ProtectedAdminRouteLab.jsx
        │   └── notes/
        │       └── 08-Routing-Params-And-Auth-Guards.md
        ├── 09_context_api_and_prop_drilling/          # Lecture 9: Global state (Dark Mode / Logged-in User) without Prop Drilling
        │   ├── codes/
        │   │   └── ThemeAndUserAuthContextLab.jsx
        │   └── notes/
        │       └── 09-Context-API-Global-State.md
        ├── 10_usereducer_and_complex_state/           # Lecture 10: Managing multi-step state transitions (Shopping Cart)
        │   ├── codes/
        │   │   └── ShoppingCartReducerLab.jsx
        │   └── notes/
        │       └── 10-UseReducer-State-Machines.md
        ├── 11_performance_memoization_and_hooks/      # Lecture 11: useMemo, useCallback, React.memo & Custom Hooks (useFetch)
        │   ├── codes/
        │   │   ├── CustomUseFetchHookLab.jsx
        │   │   └── ExpensiveCalculationMemoLab.jsx
        │   └── notes/
        │       └── 11-UseMemo-UseCallback-And-Custom-Hooks.md
        └── 12_redux_toolkit_or_zustand_capstone/      # Lecture 12: Industry Global State + JWT Auth Token Interceptor Flow
            ├── codes/
            │   └── GlobalStoreSliceLab.jsx
            └── notes/
                └── 12-Redux-Toolkit-And-Production-Architecture.md
```

---

## 🛠️ Development & Production Scripts

- `npm run dev`: Launch the local development server at `http://localhost:5173`
- `npm run build`: Compile and minify production bundle into `dist/`
- `npm run preview`: Preview the production build locally
