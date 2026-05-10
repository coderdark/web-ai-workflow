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

const classCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
const lessonCount = db.prepare('SELECT COUNT(*) as count FROM lessons').get();
console.log(`Seed complete: ${classCount.count} class(es), ${lessonCount.count} lesson(s)`);
