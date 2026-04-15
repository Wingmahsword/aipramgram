import React, { createContext, useContext, useState } from 'react';

const COURSES = [
  { id: 'cs229_ml', title: 'CS229: Machine Learning', instructor: 'Stanford University', partner: 'DAIR.AI', category: 'Machine Learning', level: 'Advanced', duration: '40 hours', progress: 0, thumbnail: 'ml', description: 'Stanford\'s core ML course covering linear/logistic regression, SVMs, kernels, decision trees, and neural networks.', rewardCoins: 250 },
  { id: 'karpathy_zero', title: 'Neural Networks: Zero to Hero', instructor: 'Andrej Karpathy', partner: 'DAIR.AI', category: 'Deep Learning', level: 'Intermediate', duration: '20 hours', progress: 0, thumbnail: 'dl', description: 'An in-depth overview of neural networks starting from fundamental backpropagation logic to building modern transformers.', rewardCoins: 300 },
  { id: 'cs230_dl', title: 'CS230: Deep Learning', instructor: 'Stanford University', partner: 'DAIR.AI', category: 'Deep Learning', level: 'Advanced', duration: '35 hours', progress: 0, thumbnail: 'dl', description: 'Foundations of deep learning, building CNNs/RNNs/LSTMs, and full cycle machine learning projects.', rewardCoins: 200 },
  { id: 'cs224n_nlp', title: 'CS224N: Natural Language Processing', instructor: 'Stanford University', partner: 'DAIR.AI', category: 'Generative AI', level: 'Advanced', duration: '30 hours', progress: 0, thumbnail: 'llm', description: 'The absolute latest approaches for deep learning based NLP, transformers, and Large Language Models (T5).', rewardCoins: 250 },
  { id: 'prompt_dev', title: 'ChatGPT Prompt Engineering', instructor: 'DeepLearning.AI', partner: 'DAIR.AI', category: 'Prompt Engineering', level: 'Beginner', duration: '5 hours', progress: 0, thumbnail: 'prompt', description: 'Learn how to intelligently wield a large language model (LLM) to quickly build powerful automated applications.', rewardCoins: 100 },
  { id: 'llmops_apps', title: 'LLMOps: Building Real-World Apps', instructor: 'Comet ML', partner: 'DAIR.AI', category: 'AI Applications', level: 'Intermediate', duration: '12 hours', progress: 0, thumbnail: 'apps', description: 'Learn to build modern software with LLMs using the newest deployment, monitoring, and scaling techniques.', rewardCoins: 150 },
  { id: 'fastai_dl', title: 'Practical Deep Learning for Coders', instructor: 'fast.ai', partner: 'DAIR.AI', category: 'Deep Learning', level: 'Intermediate', duration: '30 hours', progress: 0, thumbnail: 'dl', description: 'A pragmatic, top-down approach using PyTorch to solve real-world computer vision and NLP tasks.', rewardCoins: 200 },
  { id: 'cs231n_cv', title: 'CS231N: Convolutional Neural Networks', instructor: 'Stanford University', partner: 'DAIR.AI', category: 'Machine Learning', level: 'Advanced', duration: '40 hours', progress: 0, thumbnail: 'ml', description: 'Stanford\'s famous Vision course breaking down image classification, generative models, and object detection.', rewardCoins: 220 },
  { id: 'langchain_sys', title: 'Building Systems with ChatGPT API', instructor: 'DeepLearning.AI', partner: 'DAIR.AI', category: 'AI Applications', level: 'Intermediate', duration: '8 hours', progress: 0, thumbnail: 'apps', description: 'Learn how to automate complex agent workflows using chain calls connected to external tools.', rewardCoins: 120 }
];

const REELS = [
  { id: 'r1', creator: 'Sarah Chen', creatorHandle: '@sarahchen_ai', creatorAvatar: 'SC', title: '5 prompts that changed how I use ChatGPT', description: 'These prompt techniques took my AI interactions from basic to professional #promptengineering #ai', likes: 18400, comments: 892, shares: 2100, duration: '0:58', tags: ['#prompts', '#chatgpt', '#ai'] },
  { id: 'r2', creator: 'Marcus Rivera', creatorHandle: '@marcus_prompts', creatorAvatar: 'MR', title: 'Chain-of-thought prompting explained in 60 seconds', description: 'The technique that makes AI actually think step by step.', likes: 24100, comments: 1203, shares: 3400, duration: '1:02', tags: ['#chainofthought', '#prompting'] },
  { id: 'r3', creator: 'Aiko Tanaka', creatorHandle: '@aiko_deeplearning', creatorAvatar: 'AT', title: 'How attention mechanisms actually work', description: 'Visualizing the transformer\'s core building block.', likes: 31200, comments: 1567, shares: 4800, duration: '1:15', tags: ['#attention', '#transformers'] },
  { id: 'r4', creator: 'Dev Patel', creatorHandle: '@devpatel_builds', creatorAvatar: 'DP', title: 'I built an AI app in 30 minutes. Here\'s how', description: 'Using OpenAI API + React to build something real.', likes: 42800, comments: 2341, shares: 6700, duration: '0:47', tags: ['#openai', '#react', '#buildinpublic'] },
  { id: 'r5', creator: 'Sarah Chen', creatorHandle: '@sarahchen_ai', creatorAvatar: 'SC', title: 'RAG vs Fine-tuning: Which should you use?', description: 'Breaking down the key differences for production AI.', likes: 28700, comments: 1893, shares: 5200, duration: '1:30', tags: ['#rag', '#finetuning', '#llm'] },
];

const CREATORS = [
  { id: 'c1', name: 'Sarah Chen', handle: '@sarahchen_ai', avatar: 'SC', bio: 'AI researcher & educator. Making ML accessible to everyone.', followers: 142000, courses: 8, reels: 234, verified: true, specialty: 'Machine Learning' },
  { id: 'c2', name: 'Marcus Rivera', handle: '@marcus_prompts', avatar: 'MR', bio: 'Prompt engineer at leading AI lab.', followers: 89000, courses: 5, reels: 187, verified: true, specialty: 'Prompt Engineering' },
  { id: 'c3', name: 'Aiko Tanaka', handle: '@aiko_deeplearning', avatar: 'AT', bio: 'Deep learning specialist. PhD in Neural Networks.', followers: 67000, courses: 12, reels: 156, verified: true, specialty: 'Deep Learning' },
  { id: 'c4', name: 'Dev Patel', handle: '@devpatel_builds', avatar: 'DP', bio: 'Building AI products. Sharing what I learn along the way.', followers: 54000, courses: 6, reels: 203, verified: false, specialty: 'AI Applications' },
];

const AI_RESPONSES = [
  "That's a great question! In machine learning, **gradient descent** is an optimization algorithm used to minimize the loss function by iteratively moving in the direction of steepest descent. 📉\n\nThe learning rate controls how big each step is — too large and you overshoot, too small and training takes forever.",
  "**Transformers** revolutionized NLP! The key innovation is the **attention mechanism**, which allows the model to weigh the importance of different words in the input when generating each output token. Unlike RNNs, transformers process all tokens in parallel. ⚡",
  "For **prompt engineering**, here are 5 power techniques:\n1. **Role prompting** — Tell the AI to act as an expert\n2. **Chain-of-thought** — Ask it to think step by step\n3. **Few-shot examples** — Show 2-3 examples before your ask\n4. **Temperature control** — Lower for precision, higher for creativity\n5. **Structured output** — Ask for JSON or bullet points",
  "**RAG (Retrieval-Augmented Generation)** vs **Fine-tuning**:\n\n• RAG is great when you need up-to-date info or domain knowledge without retraining\n• Fine-tuning is better when you need specific tone, style, or task behavior baked in\n\nFor most production apps, start with RAG — it's faster and cheaper! 🚀",
  "Great question about **neural network layers**! Each layer learns increasingly abstract representations:\n- Early layers: edges, textures\n- Mid layers: shapes, patterns  \n- Deep layers: complex concepts, objects\n\nThis hierarchical feature learning is why deep networks are so powerful for vision tasks! 🧠",
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState(['course_google_genai']);
  const [likedReels, setLikedReels] = useState(['r2']);
  const [savedReels, setSavedReels] = useState(['r3']);
  const [followingCreators, setFollowingCreators] = useState(['c2']);
  const [coins, setCoins] = useState(100);
  const [hasClaimedWelcome, setHasClaimedWelcome] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm your AI learning assistant 🤖 Ask me anything about machine learning, prompt engineering, deep learning, or any AI topic. I'm here to help you learn!" }
  ]);
  const [courseFilter, setCourseFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const addToast = (text, icon = '✅') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const claimWelcomeBonus = () => {
    setCoins(c => c + 100);
    setHasClaimedWelcome(true);
    addToast('+100 coins! Welcome bonus claimed! 🎉', '🪙');
  };

  const toggleLike = (id) => {
    setLikedReels(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleSave = (id) => {
    setSavedReels(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleFollow = (id) => {
    setFollowingCreators(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const enrollCourse = (courseId) => {
    if (enrolledCourses.includes(courseId)) return { coinsEarned: 0 };
    const course = COURSES.find(c => c.id === courseId);
    const reward = course?.rewardCoins ?? 50;
    setEnrolledCourses(prev => [...prev, courseId]);
    setCoins(c => c + reward);
    addToast(`+${reward} coins earned for enrolling in "${course?.title}"!`, '🪙');
    return { coinsEarned: reward };
  };
  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg, { role: 'thinking' }]);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    const reply = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    setMessages(prev => [...prev.filter(m => m.role !== 'thinking'), { role: 'assistant', content: reply }]);
  };

  const courses = COURSES.map(c => ({ ...c, enrolled: enrolledCourses.includes(c.id) }));
  const reels = REELS.map(r => ({ ...r, liked: likedReels.includes(r.id), saved: savedReels.includes(r.id) }));
  const creators = CREATORS.map(c => ({ ...c, following: followingCreators.includes(c.id) }));

  return (
    <AppContext.Provider value={{
      courses, reels, creators, coins, hasClaimedWelcome, messages, toasts,
      courseFilter, setCourseFilter, searchQuery, setSearchQuery,
      claimWelcomeBonus, toggleLike, toggleSave, toggleFollow, enrollCourse, sendMessage,
      enrolledCourses, likedReels, savedReels, followingCreators
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
