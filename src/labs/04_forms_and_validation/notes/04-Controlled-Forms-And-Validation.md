# Lecture 04: Controlled Forms & Client Validation
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
- In Spring MVC, `@ModelAttribute` or Jackson binds incoming HTTP request parameters to a Java POJO/DTO (`SignupRequestDto`).
- In React, a **Controlled Component** binds HTML `<input>` values directly to React state:
  - React State is the **Single Source of Truth** (like an in-memory bean).
  - Every keystroke updates state, and state dictates what appears on screen.
  - Validation errors mirror Spring's `BindingResult` or Hibernate Validator violations map (`Map<String, String>`).

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without Controlled Inputs:** You have to imperatively query the DOM (`document.getElementById().value`) when submitting, which easily goes out of sync with application state.
- **Without Form State Management:** Disabling buttons, showing live character counts, or instant field validation becomes a nightmare of DOM listeners.
- **Without `e.preventDefault()`:** The browser submits a native HTTP GET/POST and refreshes the whole page, wiping all client-side state.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
function MinimalForm() {
  const [form, setForm] = useState({ email: "" });

  const handleChange = (e) => 
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop full page reload
    console.log("Submitting DTO payload:", form);
  };
  return <form onSubmit={handleSubmit}><input name="email" value={form.email} onChange={handleChange} /></form>;
}
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Forgetting `e.preventDefault()` in Form Submission
```jsx
// ❌ WRONG: Browser treats this as native HTML form post and reloads the page
const onSubmit = () => {
  sendPayload(formData);
};

// ✅ RIGHT: Prevent default browser page refresh
const onSubmit = (e) => {
  e.preventDefault();
  sendPayload(formData);
};
```

### Bug 2: Switching Uncontrolled Input to Controlled (`value={undefined}`)
```jsx
// ❌ WRONG: Initializing state with undefined or null makes React warn about switching uncontrolled to controlled
const [form, setForm] = useState({ username: undefined });

// ✅ RIGHT: Always initialize form field state with empty strings
const [form, setForm] = useState({ username: "" });
```

### Bug 3: Hardcoding a Separate Handler for Every Input Field
```jsx
// ❌ WRONG: Bloats code with 10 separate handlers for 10 fields
const handleNameChange = (e) => setName(e.target.value);
const handleEmailChange = (e) => setEmail(e.target.value);

// ✅ RIGHT: Use computed property names `[e.target.name]: e.target.value`
const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **What is the difference between Controlled and Uncontrolled components?**  
   Controlled inputs have their values driven by React state via `value` and `onChange`; uncontrolled inputs store their own value in the DOM and are read via `useRef`.

2. **Why do we use computed property names `[e.target.name]` in form handlers?**  
   It allows a single dynamic handler method to update any field in a multi-property form state object based on the input's `name` attribute.

3. **When would you prefer an Uncontrolled component over a Controlled one?**  
   For non-interactive form fields like file uploads (`<input type="file" />`) or large legacy forms where high-frequency typing re-renders would degrade performance.

4. **How do you handle checkbox state compared to text input state?**  
   Checkboxes use `e.target.checked` (boolean) instead of `e.target.value` (string) when updating state.

5. **What is the advantage of client-side validation if backend validation is mandatory?**  
   Client validation gives instant UI feedback to the user without consuming network bandwidth or backend compute cycles, though backend validation remains the ultimate security layer.
