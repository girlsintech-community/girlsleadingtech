import type { Resource } from "./types";

export const curatedRoadmaps: Record<
  string,
  { title: string; summary?: string; steps: string[]; links: { name: string; url: string }[] }
> = {
  dsa: {
    title: "Data Structures & Algorithms (DSA) Roadmap",
    summary:
      "Covers data structures and algorithms step by step — arrays, linked lists, trees, graphs, and dynamic programming. Great for interviews and problem solving.",
    steps: [
      "Phase 1: Choose a language (C++, Java, or Python) and learn the syntax and core concepts.",
      "Phase 2: Master Complexity Analysis - Understand Time and Space complexity using Big-O notation.",
      "Phase 3: Linear Data Structures - Learn Arrays, Strings, Linked Lists, Stacks, and Queues.",
      "Phase 4: Hashing & Searching - Master Binary Search, Hash Maps, Sets, and sorting algorithms.",
      "Phase 5: Recursion & Backtracking - Build algorithmic thinking for breaking down problems.",
      "Phase 6: Non-Linear Data Structures - Trees (Binary Trees, BST) and Graphs (BFS, DFS, Dijkstra).",
      "Phase 7: Dynamic Programming (DP) - Practice memoization and tabulation for optimization."
    ],
    links: [
      { name: "takeUforward (Striver)", url: "https://takeuforward.org/" },
      { name: "NeetCode Practice", url: "https://neetcode.io/" },
      { name: "LeetCode Coding Practice", url: "https://leetcode.com/" }
    ]
  },
  css: {
    title: "CSS Essentials Roadmap",
    summary:
      "Styling fundamentals, responsive design, Flexbox, Grid, animations, and modern best practices.",
    steps: [
      "Phase 1: Selectors & Box Model — Learn specificity, margin, padding, borders, and display types.",
      "Phase 2: Layout — Master Flexbox and CSS Grid for responsive page structure.",
      "Phase 3: Responsive Design — Use media queries, relative units, and mobile-first patterns.",
      "Phase 4: Visual Polish — Explore transitions, transforms, and lightweight animations.",
      "Phase 5: Modern CSS — Practice custom properties, container queries, and accessible color contrast.",
    ],
    links: [
      { name: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "CSS-Tricks Almanac", url: "https://css-tricks.com/almanac/" },
      { name: "web.dev Learn CSS", url: "https://web.dev/learn/css/" },
    ],
  },
  java: {
    title: "Java Basics & Advanced Roadmap",
    steps: [
      "Phase 1: Basics - Learn syntax, variables, conditional statements, and loops.",
      "Phase 2: OOPs Concepts - Master Inheritance, Polymorphism, Encapsulation, and Abstraction.",
      "Phase 3: Java Collections - Learn List, Set, Map, and the Streams API (Java 8+).",
      "Phase 4: Build Tools & Git - Get comfortable with Maven or Gradle, and Git/GitHub.",
      "Phase 5: Database Connection - Learn SQL basics and JDBC/JPA/Hibernate for ORM.",
      "Phase 6: Enterprise Frameworks - Master Spring Boot (REST APIs, MVC, Dependency Injection)."
    ],
    links: [
      { name: "roadmap.sh Java Roadmap", url: "https://roadmap.sh/java" },
      { name: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/" },
      { name: "University of Helsinki Java MOOC", url: "https://java-programming.mooc.fi/" }
    ]
  },
  frontend: {
    title: "Frontend Development Roadmap",
    steps: [
      "Phase 1: Basic Structure & Styling - Learn HTML5 and CSS3 (Flexbox, Grid, Responsive Design).",
      "Phase 2: Dynamic Logic - Master modern JavaScript (ES6+, DOM manipulation, asynchronous fetching).",
      "Phase 3: React Framework - Learn Components, Props, State, Hooks, and Router.",
      "Phase 4: CSS Libraries - Explore Tailwind CSS or Material-UI for rapid styling.",
      "Phase 5: State Management - Learn Redux Toolkit or Zustand for global application state.",
      "Phase 6: Performance & Hosting - Master NPM, Vite build processes, and deploying to Vercel/Netlify."
    ],
    links: [
      { name: "roadmap.sh Frontend Roadmap", url: "https://roadmap.sh/frontend" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
      { name: "freeCodeCamp Frontend Tutorials", url: "https://www.freecodecamp.org/" }
    ]
  },
  backend: {
    title: "Backend Development Roadmap",
    steps: [
      "Phase 1: Core Language - Master a backend language (Node.js/Express, Python, Java, or Go).",
      "Phase 2: Database Basics - Learn SQL (MySQL/PostgreSQL) and NoSQL (MongoDB/Redis).",
      "Phase 3: API Architecture - Build secure REST APIs with JWT authentication and middleware.",
      "Phase 4: System Operations - Learn Docker containerization, backend testing (Jest/Mocha), and security.",
      "Phase 5: Deployment & Scale - Learn CI/CD pipelines, caching, and deploying to AWS/Heroku."
    ],
    links: [
      { name: "roadmap.sh Backend Roadmap", url: "https://roadmap.sh/backend" },
      { name: "The Odin Project Node Course", url: "https://www.theodinproject.com/" },
      { name: "MongoDB University", url: "https://university.mongodb.com/" }
    ]
  },
  python: {
    title: "Python Programming Roadmap",
    steps: [
      "Phase 1: Basic Syntax - Learn variables, conditions, loops, functions, and file handling.",
      "Phase 2: Data Structures - Master lists, dictionaries, tuples, sets, and OOP concepts.",
      "Phase 3: Scripting & Automation - Learn web scraping (BeautifulSoup) and OS automation.",
      "Phase 4: Data Libraries - Master NumPy, Pandas, and Matplotlib for data analysis.",
      "Phase 5: Development Frameworks - Explore Django or Flask for web backend.",
      "Phase 6: AI/ML Foundations - Learn math prerequisites (Linear Algebra, Calculus) and Scikit-Learn."
    ],
    links: [
      { name: "roadmap.sh Python Roadmap", url: "https://roadmap.sh/python" },
      { name: "Kaggle Python Courses", url: "https://www.kaggle.com/learn" },
      { name: "Python.org Official Docs", url: "https://docs.python.org/" }
    ]
  },
  ml: {
    title: "Machine Learning Roadmap",
    steps: [
      "Phase 1: Prerequisites - Learn Linear Algebra, Calculus, Statistics, and core Python.",
      "Phase 2: Data Preprocessing - Master feature engineering, cleaning, and normalization.",
      "Phase 3: Supervised Learning - Learn Regression, Decision Trees, Random Forests, and SVMs.",
      "Phase 4: Unsupervised Learning - Master K-Means clustering, PCA dimensionality reduction.",
      "Phase 5: Deep Learning Basics - Understand Neural Networks, activation functions, and backpropagation.",
      "Phase 6: Deep Learning Frameworks - Master PyTorch or TensorFlow basics.",
      "Phase 7: Model Deployment - Learn how to save models and deploy them using FastAPI or Flask."
    ],
    links: [
      { name: "roadmap.sh AI & Data Scientist Roadmap", url: "https://roadmap.sh/ai-data-scientist" },
      { name: "Andrew Ng's Machine Learning Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { name: "Fast.ai Practical Deep Learning", url: "https://www.fast.ai/" }
    ]
  },
  iot: {
    title: "Internet of Things (IoT) Systems Roadmap",
    steps: [
      "Phase 1: Basic Electronics - Learn voltage, current, resistance, and using breadboards.",
      "Phase 2: Microcontrollers - Get started with Arduino or ESP32 development boards.",
      "Phase 3: Sensors & Actuators - Learn to interface temperature, distance, and motion sensors.",
      "Phase 4: Wireless Communication - Master Wi-Fi, Bluetooth (BLE), and LoRa communications.",
      "Phase 5: Smart Systems Integration - Learn IoT protocols (MQTT, HTTP, WebSockets) to connect to the cloud.",
      "Phase 6: Custom Dashboards - Interface IoT hardware with Node-RED, Blynk, or AWS IoT Core."
    ],
    links: [
      { name: "Random Nerd Tutorials ESP32", url: "https://randomnerdtutorials.com/" },
      { name: "Arduino Project Hub", url: "https://projecthub.arduino.cc/" },
      { name: "Hackster.io Community Projects", url: "https://www.hackster.io/" }
    ]
  },
  git: {
    title: "Version Control & Git/GitHub Roadmap",
    steps: [
      "Phase 1: Concepts - Understand filesystems, changesets, and why version control is needed.",
      "Phase 2: Basics - Learn command line tools: git init, git add, git commit, git status.",
      "Phase 3: Remote Repositories - Master git clone, git remote, git push, and git pull.",
      "Phase 4: Branching & Merging - Learn branch creation, merging, and resolving conflicts.",
      "Phase 5: GitHub Workflows - Learn Pull Requests, issues, code reviews, and forks.",
      "Phase 6: Open Source Contribution - Find beginner-friendly issues (good first issue) and submit PRs."
    ],
    links: [
      { name: "GitHub Skills", url: "https://skills.github.com/" },
      { name: "Git Immersion tutorial", url: "https://gitimmersion.com/" },
      { name: "Oh My Git! Interactive Game", url: "https://ohmygit.org/" }
    ]
  },
  cloud: {
    title: "Cloud & Deployment Roadmap",
    steps: [
      "Phase 1: Web Hosting - Learn static/serverless hosting on Vercel, Netlify, and GitHub Pages.",
      "Phase 2: Linux & Terminal - Get comfortable with Linux commands, SSH keys, and server administration.",
      "Phase 3: Containerization - Learn Docker syntax, writing Dockerfiles, and container networking.",
      "Phase 4: CI/CD Pipelines - Automate builds and deployments using GitHub Actions or GitLab CI.",
      "Phase 5: Cloud Platforms - Learn basics of AWS (EC2, S3), Google Cloud, or Microsoft Azure."
    ],
    links: [
      { name: "roadmap.sh DevOps Roadmap", url: "https://roadmap.sh/devops" },
      { name: "Docker Labs & Tutorials", url: "https://labs.play-with-docker.com/" },
      { name: "AWS Educate & Academy", url: "https://aws.amazon.com/education/aws-educate/" }
    ]
  }
};

export const girlsInTechResources: { title: string; category: string; description: string; link: string }[] = [
  {
    title: "AnitaB.org & Systers",
    category: "Community",
    description: "A global nonprofit connecting women in computing. Home to Systers, one of the largest online networks for women in technical roles.",
    link: "https://anitab.org/"
  },
  {
    title: "Girls Who Code",
    category: "Community & Education",
    description: "Offers summer immersion programs, university clubs, and career support networks to close the tech gender gap.",
    link: "https://girlswhocode.com/"
  },
  {
    title: "Society of Women Engineers (SWE)",
    category: "Professional Network & Scholarship",
    description: "Provides professional development, networking opportunities, and extensive engineering/computer science scholarships.",
    link: "https://swe.org/"
  },
  {
    title: "Google Women Techmakers (WTM)",
    category: "Global Program",
    description: "Google's community providing visibility, community, and resources for women in technology, including the Generation Google Scholarship.",
    link: "https://developers.google.com/womentechmakers"
  },
  {
    title: "Palantir Women in Technology Scholarship",
    category: "Scholarship & Mentorship",
    description: "Provides financial awards and active mentorship to women pursuing undergraduate degrees in computer science and STEM.",
    link: "https://www.palantir.com/students/scholarship/wit-scholarship/"
  },
  {
    title: "Elpha",
    category: "Online Network",
    description: "A digital forum and community built for women in technology to network, share candid career advice, and search for jobs.",
    link: "https://elpha.com/"
  }
];
