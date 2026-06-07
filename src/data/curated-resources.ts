export const curatedRoadmaps: Record<
  string,
  { title: string; summary?: string; steps: string[]; links: { name: string; url: string }[] }
> = {
  dsa: {
    title: "Data Structures & Algorithms (DSA) Roadmap",
    summary:
      "Covers data structures and algorithms step by step — arrays, linked lists, trees, graphs, and dynamic programming. Great for interviews and problem solving.",
    steps: [
      "Phase 1: Choose a language (C++, Java, or Python) and learn syntax and core concepts.",
      "Phase 2: Master complexity analysis — time and space using Big-O notation.",
      "Phase 3: Linear data structures — arrays, strings, linked lists, stacks, and queues.",
      "Phase 4: Hashing and searching — binary search, hash maps, sets, and sorting.",
      "Phase 5: Recursion and backtracking — break problems into smaller steps.",
      "Phase 6: Trees and graphs — BFS, DFS, and shortest-path basics.",
      "Phase 7: Dynamic programming — memoization and tabulation.",
    ],
    links: [
      { name: "takeUforward (Striver)", url: "https://takeuforward.org/" },
      { name: "NeetCode Practice", url: "https://neetcode.io/" },
      { name: "LeetCode", url: "https://leetcode.com/" },
    ],
  },
  css: {
    title: "CSS Essentials Roadmap",
    summary:
      "Styling fundamentals, responsive design, Flexbox, Grid, animations, and modern best practices.",
    steps: [
      "Phase 1: Selectors and box model — specificity, margin, padding, borders, display.",
      "Phase 2: Layout — Flexbox and CSS Grid for responsive structure.",
      "Phase 3: Responsive design — media queries, relative units, mobile-first patterns.",
      "Phase 4: Visual polish — transitions, transforms, and light animations.",
      "Phase 5: Modern CSS — custom properties, container queries, accessible contrast.",
    ],
    links: [
      { name: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "CSS-Tricks Almanac", url: "https://css-tricks.com/almanac/" },
      { name: "web.dev Learn CSS", url: "https://web.dev/learn/css/" },
    ],
  },
  java: {
    title: "Java Basics Roadmap",
    summary:
      "Object-oriented programming fundamentals, syntax, collections, and common frameworks like Spring.",
    steps: [
      "Phase 1: Basics — syntax, variables, conditions, and loops.",
      "Phase 2: OOP — inheritance, polymorphism, encapsulation, abstraction.",
      "Phase 3: Collections — List, Set, Map, and Streams API.",
      "Phase 4: Build tools and Git — Maven or Gradle, Git/GitHub.",
      "Phase 5: Databases — SQL basics and JDBC/JPA/Hibernate.",
      "Phase 6: Spring Boot — REST APIs, MVC, dependency injection.",
    ],
    links: [
      { name: "roadmap.sh Java", url: "https://roadmap.sh/java" },
      { name: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/" },
      { name: "Helsinki Java MOOC", url: "https://java-programming.mooc.fi/" },
    ],
  },
  frontend: {
    title: "Frontend Development Roadmap",
    summary:
      "HTML, CSS, JavaScript, React, state management, and UI libraries like Tailwind or Material-UI.",
    steps: [
      "Phase 1: HTML5 and CSS3 — Flexbox, Grid, responsive design.",
      "Phase 2: JavaScript — ES6+, DOM, async fetching.",
      "Phase 3: React — components, props, state, hooks, router.",
      "Phase 4: CSS libraries — Tailwind CSS or Material-UI.",
      "Phase 5: State management — Redux Toolkit or Zustand.",
      "Phase 6: Build and deploy — Vite, NPM, Vercel or Netlify.",
    ],
    links: [
      { name: "roadmap.sh Frontend", url: "https://roadmap.sh/frontend" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
    ],
  },
  backend: {
    title: "Backend Development Roadmap",
    summary:
      "Server basics, REST APIs, Node.js/Express, databases (SQL/NoSQL), and authentication.",
    steps: [
      "Phase 1: Core language — Node.js/Express, Python, Java, or Go.",
      "Phase 2: Databases — SQL (PostgreSQL) and NoSQL (MongoDB/Redis).",
      "Phase 3: REST APIs — JWT auth, middleware, validation.",
      "Phase 4: Operations — Docker, testing, security basics.",
      "Phase 5: Deployment — CI/CD, caching, cloud hosting.",
    ],
    links: [
      { name: "roadmap.sh Backend", url: "https://roadmap.sh/backend" },
      { name: "The Odin Project", url: "https://www.theodinproject.com/" },
      { name: "MongoDB University", url: "https://university.mongodb.com/" },
    ],
  },
  python: {
    title: "Python Programming Roadmap",
    summary: "Syntax, libraries, data analysis, scripting, and AI/ML foundations.",
    steps: [
      "Phase 1: Syntax — variables, conditions, loops, functions, files.",
      "Phase 2: Data structures — lists, dicts, tuples, sets, OOP.",
      "Phase 3: Scripting — web scraping and automation.",
      "Phase 4: Data libraries — NumPy, Pandas, Matplotlib.",
      "Phase 5: Web frameworks — Django or Flask.",
      "Phase 6: AI/ML foundations — math basics and Scikit-Learn.",
    ],
    links: [
      { name: "roadmap.sh Python", url: "https://roadmap.sh/python" },
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
      { name: "Python.org Docs", url: "https://docs.python.org/" },
    ],
  },
  ml: {
    title: "Machine Learning Roadmap",
    summary:
      "Supervised vs. unsupervised learning, model training, PyTorch/TensorFlow basics.",
    steps: [
      "Phase 1: Prerequisites — linear algebra, stats, Python.",
      "Phase 2: Data preprocessing — cleaning, feature engineering.",
      "Phase 3: Supervised learning — regression, trees, random forests.",
      "Phase 4: Unsupervised learning — clustering, PCA.",
      "Phase 5: Deep learning — neural networks and backpropagation.",
      "Phase 6: Frameworks — PyTorch or TensorFlow.",
      "Phase 7: Deployment — save and serve models with FastAPI or Flask.",
    ],
    links: [
      { name: "roadmap.sh AI & Data Scientist", url: "https://roadmap.sh/ai-data-scientist" },
      { name: "Andrew Ng ML Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { name: "Fast.ai", url: "https://www.fast.ai/" },
    ],
  },
  iot: {
    title: "IoT Systems Roadmap",
    summary: "ESP32, sensors, wireless communication, smart systems integration.",
    steps: [
      "Phase 1: Basic electronics — voltage, current, breadboards.",
      "Phase 2: Microcontrollers — Arduino or ESP32.",
      "Phase 3: Sensors and actuators — temperature, distance, motion.",
      "Phase 4: Wireless — Wi-Fi, Bluetooth, LoRa.",
      "Phase 5: Cloud integration — MQTT, HTTP, WebSockets.",
      "Phase 6: Dashboards — Node-RED, Blynk, or AWS IoT Core.",
    ],
    links: [
      { name: "Random Nerd Tutorials ESP32", url: "https://randomnerdtutorials.com/" },
      { name: "Arduino Project Hub", url: "https://projecthub.arduino.cc/" },
      { name: "Hackster.io", url: "https://www.hackster.io/" },
    ],
  },
  git: {
    title: "Version Control Roadmap",
    summary: "Git/GitHub workflows, branching, pull requests, open source contribution.",
    steps: [
      "Phase 1: Concepts — why version control matters.",
      "Phase 2: Basics — init, add, commit, status.",
      "Phase 3: Remotes — clone, push, pull.",
      "Phase 4: Branching and merging — resolve conflicts.",
      "Phase 5: GitHub workflows — pull requests and code review.",
      "Phase 6: Open source — find good-first issues and contribute.",
    ],
    links: [
      { name: "GitHub Skills", url: "https://skills.github.com/" },
      { name: "Git Immersion", url: "https://gitimmersion.com/" },
      { name: "Oh My Git!", url: "https://ohmygit.org/" },
    ],
  },
  cloud: {
    title: "Cloud & Deployment Roadmap",
    summary: "Hosting with Vercel/Netlify, Docker basics, CI/CD pipelines, cloud services.",
    steps: [
      "Phase 1: Web hosting — Vercel, Netlify, GitHub Pages.",
      "Phase 2: Linux and terminal — SSH, server basics.",
      "Phase 3: Docker — Dockerfiles and container networking.",
      "Phase 4: CI/CD — GitHub Actions or GitLab CI.",
      "Phase 5: Cloud platforms — AWS, GCP, or Azure basics.",
    ],
    links: [
      { name: "roadmap.sh DevOps", url: "https://roadmap.sh/devops" },
      { name: "Docker Labs", url: "https://labs.play-with-docker.com/" },
      { name: "AWS Educate", url: "https://aws.amazon.com/education/aws-educate/" },
    ],
  },
};

export const girlsInTechResources: {
  title: string;
  category: string;
  description: string;
  link: string;
}[] = [
  {
    title: "AnitaB.org & Systers",
    category: "Community",
    description: "A global nonprofit connecting women in computing.",
    link: "https://anitab.org/",
  },
  {
    title: "Girls Who Code",
    category: "Community & Education",
    description: "Summer programs, clubs, and career support for girls in tech.",
    link: "https://girlswhocode.com/",
  },
  {
    title: "Society of Women Engineers (SWE)",
    category: "Professional Network & Scholarship",
    description: "Professional development, networking, and engineering scholarships.",
    link: "https://swe.org/",
  },
  {
    title: "Google Women Techmakers",
    category: "Global Program",
    description: "Visibility, community, and resources for women in technology.",
    link: "https://developers.google.com/womentechmakers",
  },
  {
    title: "Palantir Women in Technology Scholarship",
    category: "Scholarship & Mentorship",
    description: "Financial awards and mentorship for women in CS and STEM.",
    link: "https://www.palantir.com/students/scholarship/wit-scholarship/",
  },
  {
    title: "Elpha",
    category: "Online Network",
    description: "A forum and community for women in tech to network and share advice.",
    link: "https://elpha.com/",
  },
];
