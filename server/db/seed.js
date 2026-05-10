import { initDb } from './init.js';

const db = initDb();

// Idempotent: clear and re-insert
db.exec('DELETE FROM lessons');
db.exec('DELETE FROM classes');
db.exec("DELETE FROM sqlite_sequence WHERE name IN ('classes','lessons')");

const insertClass = db.prepare(`
  INSERT INTO classes (title, description, difficulty, is_featured)
  VALUES (?, ?, ?, ?)
`);

const classResult = insertClass.run(
  'Introduction to AI for Everyone',
  "A beginner-friendly introduction to artificial intelligence. No coding required. Learn what AI is, how it works, and how it's already part of your daily life.",
  'Beginner',
  1
);

const classId = classResult.lastInsertRowid;

const insertLesson = db.prepare(`
  INSERT INTO lessons (class_id, title, content, order_idx)
  VALUES (?, ?, ?, ?)
`);

const lessons = [
  {
    title: 'What is Artificial Intelligence?',
    order_idx: 1,
    content: `## What is Artificial Intelligence?

Artificial Intelligence — commonly known as AI — is the ability of a computer or machine to perform tasks that typically require human intelligence. These tasks include recognizing speech, understanding language, making decisions, and identifying images.

### A Simple Way to Think About It

Imagine teaching a child to recognize a cat. You show them hundreds of pictures of cats and say "this is a cat" each time. Over time, the child learns to spot a cat even in a photo they've never seen before. AI works in a surprisingly similar way — except instead of a child, it's a computer program, and instead of hundreds of pictures, it might use millions.

### The Three Big Ideas Behind AI

**1. Data**

AI learns from data — enormous amounts of it. The more high-quality data an AI system has access to, the better it can learn.

**2. Algorithms**

An algorithm is simply a set of instructions. AI uses special algorithms (called machine learning algorithms) that allow it to find patterns in data without being told exactly what to look for.

**3. Computing Power**

Modern AI requires a lot of processing power — the kind that only became widely available in the last decade thanks to advances in hardware.

### AI Is Not Magic

One of the biggest misconceptions about AI is that it's somehow magical or all-knowing. It isn't. AI is very good at specific tasks it has been trained on, but it can fail badly when faced with something outside its training. It doesn't "understand" things the way humans do — it recognizes patterns.

### A Brief History

- **1950s:** The term "Artificial Intelligence" was coined by computer scientist John McCarthy.
- **1980s–90s:** Early AI systems used hand-coded rules. They were brittle and limited.
- **2010s:** A technique called *deep learning* transformed AI, leading to breakthroughs in image recognition, language, and games.
- **Today:** AI powers search engines, recommendation systems, voice assistants, medical diagnostics, and much more.

### Key Takeaway

AI is a tool built by humans to solve specific problems by learning from data. It is powerful, but it is not magic — and understanding its basics puts you in a much better position to use it wisely.`,
  },
  {
    title: 'How Does AI Learn?',
    order_idx: 2,
    content: `## How Does AI Learn?

In the last lesson, we learned that AI recognizes patterns in data. But how exactly does that learning process work? In this lesson, we'll break it down in plain language.

### The Training Process

When we say an AI "learns," we mean it goes through a process called **training**. Here's how it works:

**Step 1: Feed it data**

You start by giving the AI a large collection of examples. If you're building an AI that identifies spam emails, you'd give it thousands of emails labeled "spam" or "not spam."

**Step 2: The AI makes guesses**

The AI looks at each example and makes a prediction. At first, it guesses randomly — and it gets a lot wrong.

**Step 3: Measure the error**

After each guess, the system measures how wrong the AI was. This measurement is called the **loss** or **error**.

**Step 4: Adjust and improve**

Here's the clever part: the AI automatically adjusts its internal settings (called **weights**) to reduce the error on the next guess. This adjustment process is called **backpropagation**.

**Step 5: Repeat millions of times**

This cycle of guess → measure → adjust repeats millions of times. Gradually, the AI gets better at making accurate predictions.

### Three Types of Machine Learning

**Supervised Learning**

The AI learns from labeled examples — data where the correct answer is provided. Example: teaching an AI to detect cats by showing it millions of labeled cat photos.

**Unsupervised Learning**

The AI finds patterns in data without being told what to look for. Example: grouping customers into segments based on shopping behavior.

**Reinforcement Learning**

The AI learns by trial and error, receiving rewards for correct actions and penalties for wrong ones. Example: teaching an AI to play chess by having it play millions of games.

### A Real-World Example: Email Spam Filter

Your email's spam filter is a classic example of supervised machine learning:

1. It was trained on millions of emails labeled "spam" or "not spam"
2. It learned patterns — certain words, senders, and link patterns that appear in spam
3. Now it uses those patterns to classify new emails it has never seen before

### Key Takeaway

AI doesn't learn like a human does. Instead, it optimizes itself to reduce errors through countless repetitions. The result can look like intelligence, but under the hood it's mathematics and statistics working at enormous scale.`,
  },
  {
    title: 'AI in Your Everyday Life',
    order_idx: 3,
    content: `## AI in Your Everyday Life

You don't have to be a tech expert to use AI — you're probably already using it dozens of times a day without realizing it. In this lesson, we'll look at the AI that's already woven into your daily routine.

### Your Morning Already Has AI

Alarm apps that learn your sleep patterns. News feeds that show you stories based on what you've clicked before. Email that filters spam before you ever see it. By the time you've had your morning coffee, you've likely interacted with AI several times.

### AI You Use Every Day

**Search Engines**

When you type a question into Google, AI doesn't just match keywords — it tries to understand the *intent* behind your search and rank results by how useful they're likely to be for *you specifically*.

**Recommendation Systems**

Netflix, Spotify, YouTube, Amazon — all of these use AI to suggest what you might want to watch, listen to, or buy next. These systems analyze your past behavior and compare it to millions of other users to find patterns.

**Voice Assistants**

Siri, Alexa, Google Assistant — these use a branch of AI called **Natural Language Processing (NLP)** to understand what you're saying and respond helpfully.

**Navigation Apps**

Google Maps and Waze use AI to predict traffic, suggest the fastest route in real time, and estimate your arrival time based on historical patterns.

**Fraud Detection**

Every time you use your credit card, AI is quietly checking whether the transaction looks normal for you. Unusual patterns trigger alerts that protect your account.

### The Flip Side: When AI Gets It Wrong

AI is not perfect, and it's important to understand its limitations:

- **Bias:** If an AI was trained on biased data, it will produce biased results. This is a real problem in areas like hiring, lending, and criminal justice.
- **Hallucination:** AI language models can confidently state things that are simply not true.
- **Lack of context:** AI doesn't understand context the way humans do. It can misinterpret sarcasm, cultural nuance, or unusual situations.

### Becoming an Informed AI User

Understanding AI doesn't mean you need to code or do math. It means asking good questions:

- *Who trained this AI, and on what data?*
- *What is it optimized for?*
- *What could go wrong?*

These questions will serve you well as AI becomes an even larger part of work, healthcare, education, and civic life.

### Key Takeaway

AI is already everywhere in your life. The goal isn't to fear it or to blindly trust it — it's to understand it well enough to use it intentionally and critically. That's exactly what this course is helping you do.`,
  },
];

for (const lesson of lessons) {
  insertLesson.run(classId, lesson.title, lesson.content, lesson.order_idx);
}

// ── Class 2: What is a Skill ─────────────────────────────────────────────────

const skillClassResult = insertClass.run(
  'What is a Skill?',
  'Discover what AI skills are, how they extend what an AI can do, and how to get the most out of them — no technical background needed.',
  'Beginner',
  0
);

const skillClassId = skillClassResult.lastInsertRowid;

const skillLessons = [
  {
    title: 'Skills: Giving AI a Toolbox',
    order_idx: 1,
    content: `## Skills: Giving AI a Toolbox

When you first interact with an AI assistant, it can do a lot — answer questions, write text, summarise documents, reason through problems. But by default, an AI is a *generalist*. A skill is a way to give it a specific, repeatable capability it can use reliably on demand.

Think of it like this: a chef knows how to cook. A skill is like handing that chef a professional pizza oven and a proven dough recipe. They could improvise a pizza without it — but the oven and the recipe make the result consistent, faster, and better every time.

### What Makes Something a Skill?

A skill has three things a general prompt doesn't:

**1. A clear purpose**

A skill is designed for one job. "Help me plan a project" is vague. A *project planning skill* knows exactly what questions to ask, what artifacts to produce, and when it's done.

**2. A defined workflow**

Skills follow a sequence. They know what to do first, what to do next, and what "finished" looks like. This means you get the same quality result every time, not just when you ask in exactly the right way.

**3. Reusability**

You write a skill once, and it works for everyone on your team — or just for you, every time you need it. The knowledge is captured in the skill, not lost in a chat history.

### A Real Example

Imagine you work at a company that creates product requirements documents (PRDs). Without a skill, you'd have to write a long detailed prompt every time you wanted AI help — describing the format, the sections, the questions to ask stakeholders, the tone.

With a *create-prd* skill, you just say "create prd" and the AI already knows all of that. The workflow is baked in.

### Key Takeaway

A skill is a packaged, reusable workflow that gives AI a consistent way to handle a specific task. It's the difference between asking an AI to improvise and asking it to follow a professional process it already knows.`,
  },
  {
    title: 'How Skills Work Under the Hood',
    order_idx: 2,
    content: `## How Skills Work Under the Hood

You don't need to write code to use skills — but understanding how they work will help you use them more effectively and know when to reach for one.

### The Anatomy of a Skill

A skill is essentially a set of instructions that an AI reads before it does anything else. Those instructions tell it:

- **What it's for** — the purpose, written plainly so the AI understands the intent
- **What steps to follow** — the workflow, written as a sequence of actions
- **What to produce** — the expected outputs, often specific file formats or structured responses
- **What to ask** — if the skill needs information it doesn't have, it knows to ask before proceeding

When you invoke a skill, the AI reads all of this first, then carries it out. It's similar to handing a contractor a detailed spec sheet before they start building — they know exactly what you want and don't have to guess.

### Inputs and Outputs

Every skill takes something in and produces something out.

| Skill | Input | Output |
|---|---|---|
| Write a story | A feature idea in plain English | A structured story file with acceptance criteria |
| Create a PRD | Design decisions from a planning session | A full product requirements document |
| Grill Me | An idea or plan | A saved Q&A log with every design decision resolved |

The input is often just a sentence or two from you. The skill handles turning that into something detailed and useful.

### Skills Can Use Tools

More advanced skills don't just generate text — they take actions. A skill can:

- Read files from your project
- Search the web
- Run code
- Create and update files on disk
- Query a database

This is what separates a skill from a template. A template produces text. A skill can *do things*.

### Key Takeaway

A skill is a structured instruction set that an AI follows. It takes a focused input, follows a defined process, and produces a reliable output — sometimes with real-world side effects like creating files or running searches.`,
  },
  {
    title: 'Using Skills Effectively',
    order_idx: 3,
    content: `## Using Skills Effectively

Knowing that skills exist is one thing. Knowing *when* and *how* to use them well is what separates a casual AI user from someone who gets consistent, high-quality results.

### When to Use a Skill

Reach for a skill when any of these are true:

**You do this task repeatedly.**

If you find yourself writing the same kind of prompt over and over — planning documents, code reviews, user interviews — that's a skill waiting to be built.

**Quality needs to be consistent.**

Skills produce the same structure every time. If the output matters (a client-facing document, a team spec, a test plan), a skill removes the variation that comes from different wordings of the same request.

**The task has multiple steps.**

If getting a good result requires the AI to ask questions first, then do research, then produce output — that's a workflow. Encode it as a skill so you don't have to orchestrate it manually every time.

**You want to share it with others.**

A skill can be saved and shared across a team. Everyone uses the same process. No one has to remember the "magic prompt."

### When *Not* to Use a Skill

Not everything needs a skill. For one-off questions, exploratory conversations, or quick rewrites, just talk to the AI directly. Skills are overhead if the task is simple or never repeats.

### Tips for Getting the Most from Skills

**Invoke them with context.**

Most skills let you add arguments. "Create a PRD for a mobile onboarding flow for first-time users" gives the skill a head start over just saying "create prd."

**Trust the workflow.**

Skills are designed to ask you what they need. If a skill asks a question that seems obvious, answer it — that information shapes the output in ways that matter.

**Review the output as a collaborator.**

A skill produces a draft, not a final answer. Read it, push back on anything that doesn't fit, and treat it as a starting point for a conversation.

### Key Takeaway

Skills work best for repeated, structured tasks where consistency matters. Use them deliberately, give them good context, and review their output — they're powerful assistants, not set-and-forget automation.`,
  },
];

for (const lesson of skillLessons) {
  insertLesson.run(skillClassId, lesson.title, lesson.content, lesson.order_idx);
}

// ── Class 3: What is an Agent ─────────────────────────────────────────────────

const agentClassResult = insertClass.run(
  'What is an Agent?',
  'Learn what AI agents are, how they differ from simple AI assistants, and why they represent a fundamental shift in how software gets things done.',
  'Intermediate',
  0
);

const agentClassId = agentClassResult.lastInsertRowid;

const agentLessons = [
  {
    title: 'From Chatbot to Agent: What Changed',
    order_idx: 1,
    content: `## From Chatbot to Agent: What Changed

For most people, their first experience with AI was a chatbot — you ask a question, it answers. That model is useful, but it has a fundamental limit: the AI only does something when you tell it to, and it does exactly one thing at a time.

An **agent** breaks both of those limits.

### The Key Difference: Taking Action

A chatbot *responds*. An agent *acts*.

When you ask a chatbot "what files are in my project folder?" it can only tell you it doesn't have access to that information. An agent can actually *look* at your project folder, read the files, and come back with an answer.

This sounds like a small difference. It isn't. Once an AI can take actions — read files, search the web, run code, call APIs, send messages — the range of tasks it can handle grows enormously.

### The Three Defining Properties of an Agent

**1. It has tools**

An agent has access to a set of capabilities beyond generating text. Common tools include web search, code execution, file reading/writing, and calling external services.

**2. It takes multiple steps**

An agent doesn't just respond to one prompt. It can plan a sequence of actions, execute them one by one, observe the results, and adjust — all before returning a final answer to you.

**3. It has a goal**

Instead of responding to a single message, an agent is given an objective and works toward it. "Research the top five competitors and summarize their pricing pages" is an agent task, not a chatbot task.

### A Concrete Example

Imagine you ask: *"Find me three recent articles about AI regulation in the EU and summarize the key points from each."*

- A chatbot says: *"I don't have internet access and my training data only goes up to..."*
- An agent: searches the web, opens the three most relevant articles, reads them, writes a summary of each, and returns the result — in one go.

### Key Takeaway

An agent is an AI that can take actions in the world, not just generate text. By combining a language model with tools and the ability to plan multiple steps, agents can handle tasks that would be impossible for a simple chatbot.`,
  },
  {
    title: 'How an Agent Thinks and Acts',
    order_idx: 2,
    content: `## How an Agent Thinks and Acts

Understanding how an agent works internally helps you give it better instructions and understand why it sometimes needs to ask clarifying questions before it starts.

### The Think–Act–Observe Loop

Most agents follow a loop that looks like this:

\`\`\`
  1. THINK    — reason about the goal and decide on the next action
       ↓
  2. ACT      — use a tool (search, read a file, run code, etc.)
       ↓
  3. OBSERVE  — look at the result of the action
       ↓
  4. THINK    — update the plan based on what was observed
       ↓
  (repeat until the goal is reached)
\`\`\`

This loop is sometimes called **ReAct** (Reasoning + Acting). The key insight is that the agent doesn't plan everything upfront — it adapts based on what it discovers as it goes.

### What "Thinking" Actually Means

When an agent "thinks," it's generating text that reasons through the current situation:

- *What is my goal?*
- *What do I know so far?*
- *What's the most useful next action?*
- *What could go wrong?*

This reasoning happens internally — you usually don't see it. But it's why agents can handle unexpected situations rather than failing the moment something doesn't go according to plan.

### Tools Are the Agent's Hands

Without tools, an agent is just a language model — it can think but not act. Tools give it the ability to reach out into the world:

| Tool | What It Does |
|---|---|
| Web search | Find current information online |
| Code interpreter | Write and run code, process data |
| File system | Read and write files on your computer |
| API calls | Interact with external services |
| Browser | Navigate websites and extract content |

The agent chooses *which* tool to use and *when* — that's part of the reasoning step.

### Human in the Loop

Many real-world agents are designed to pause and check with a human before taking certain actions — especially irreversible ones like sending an email, deleting a file, or making a purchase. This is called **human-in-the-loop** design and it's an important safety pattern.

A well-designed agent knows when to act autonomously and when to ask permission.

### Key Takeaway

Agents think by reasoning through a goal step by step. They act by choosing and using tools. They observe the results and update their plan. This loop continues until the task is complete — or until they need to ask you something.`,
  },
  {
    title: 'Agents in the Real World',
    order_idx: 3,
    content: `## Agents in the Real World

Agent technology is moving quickly from research labs into everyday software. In this lesson, we'll look at where agents are already being used, what makes them powerful, and what to watch out for.

### Where Agents Are Being Used Today

**Software development**

Agents can read a codebase, understand a bug report, write a fix, run the tests, and iterate until the tests pass — all without a human guiding each step. Tools like Claude Code work this way.

**Research and analysis**

Give an agent a research question and a list of sources, and it can read dozens of documents, extract relevant information, and produce a structured summary — a task that might take a human analyst hours.

**Customer support**

Agents can look up account information, check order status, process a return, and send a confirmation email — handling the entire support workflow, not just answering a question.

**Personal productivity**

Agents can manage your calendar, draft responses to emails based on context, book travel, and surface the three most important things in your inbox — acting as a genuine executive assistant, not just a smart autocomplete.

### Multi-Agent Systems

One of the most powerful developments in agent design is having multiple agents work together. A **multi-agent system** might look like this:

\`\`\`
  ┌─────────────────────────────────────┐
  │        Orchestrator Agent           │
  │   (breaks the goal into subtasks)   │
  └────────────┬────────────────────────┘
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
  Research  Writer   Editor
   Agent    Agent    Agent
\`\`\`

Each agent is specialized. The orchestrator delegates. The specialist agents work in parallel. The result is faster and often higher quality than a single agent trying to do everything.

### What to Watch Out For

Agents are powerful, but they're not magic — and they can go wrong in specific ways:

**Scope creep:** An agent given a vague goal may do more than you intended. Precise instructions matter.

**Compounding errors:** If an agent makes a wrong assumption in step 2, steps 3 through 10 may all be built on that mistake. Review intermediate steps for complex tasks.

**Irreversible actions:** Agents that can send emails, post content, or delete data should have explicit confirmation steps for those actions.

### How to Work Well With Agents

- **Give specific goals**, not open-ended ones. "Research competitor pricing pages and output a comparison table" is better than "research competitors."
- **Define what done looks like.** The clearer your success criteria, the better the agent can judge when to stop.
- **Review, don't just accept.** An agent's output is a first draft. Treat it that way.

### Key Takeaway

Agents are already transforming how software handles complex, multi-step work. They're most powerful when given clear goals, the right tools, and human oversight at the moments that matter. Understanding how they work puts you in control — not the other way around.`,
  },
];

for (const lesson of agentLessons) {
  insertLesson.run(agentClassId, lesson.title, lesson.content, lesson.order_idx);
}

const classCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
const lessonCount = db.prepare('SELECT COUNT(*) as count FROM lessons').get();
console.log(`Seed complete: ${classCount.count} class(es), ${lessonCount.count} lesson(s)`);
