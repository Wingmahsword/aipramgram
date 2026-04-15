import React, { createContext, useContext, useState } from 'react';

const COURSES = [
  { id: 'cs229_ml', title: 'CS229: Machine Learning', instructor: 'Stanford University', partner: 'DAIR.AI', category: 'Machine Learning', level: 'Advanced', duration: '40 hours', progress: 0, thumbnail: 'ml', description: 'Stanford\'s core ML course covering linear/logistic regression, SVMs, kernels, decision trees, and neural networks.', rewardCoins: 250, url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU' },
  { id: 'karpathy_zero', title: 'Neural Networks: Zero to Hero', instructor: 'Andrej Karpathy', partner: 'DAIR.AI', category: 'Deep Learning', level: 'Intermediate', duration: '20 hours', progress: 0, thumbnail: 'dl', description: 'An in-depth overview of neural networks starting from fundamental backpropagation logic to building modern transformers.', rewardCoins: 300, url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ' },
  { id: 'cs230_dl', title: 'CS230: Deep Learning', instructor: 'Stanford University', partner: 'DAIR.AI', category: 'Deep Learning', level: 'Advanced', duration: '35 hours', progress: 0, thumbnail: 'dl', description: 'Foundations of deep learning, building CNNs/RNNs/LSTMs, and full cycle machine learning projects.', rewardCoins: 200, url: 'https://youtube.com/playlist?list=PLoROMvodv4rOABXSygHTsbvUz4G_YQhOb' },
  { id: 'cs224n_nlp', title: 'CS224N: Natural Language Processing', instructor: 'Stanford University', partner: 'DAIR.AI', category: 'Generative AI', level: 'Advanced', duration: '30 hours', progress: 0, thumbnail: 'llm', description: 'The absolute latest approaches for deep learning based NLP, transformers, and Large Language Models (T5).', rewardCoins: 250, url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ' },
  { id: 'prompt_dev', title: 'ChatGPT Prompt Engineering', instructor: 'DeepLearning.AI', partner: 'DAIR.AI', category: 'Prompt Engineering', level: 'Beginner', duration: '5 hours', progress: 0, thumbnail: 'prompt', description: 'Learn how to intelligently wield a large language model (LLM) to quickly build powerful automated applications.', rewardCoins: 100, url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
  { id: 'llmops_apps', title: 'LLMOps: Building Real-World Apps', instructor: 'Comet ML', partner: 'DAIR.AI', category: 'AI Applications', level: 'Intermediate', duration: '12 hours', progress: 0, thumbnail: 'apps', description: 'Learn to build modern software with LLMs using the newest deployment, monitoring, and scaling techniques.', rewardCoins: 150, url: 'https://www.youtube.com/playlist?list=PLD63A284B7615313A' },
  { id: 'fastai_dl', title: 'Practical Deep Learning for Coders', instructor: 'fast.ai', partner: 'DAIR.AI', category: 'Deep Learning', level: 'Intermediate', duration: '30 hours', progress: 0, thumbnail: 'dl', description: 'A pragmatic, top-down approach using PyTorch to solve real-world computer vision and NLP tasks.', rewardCoins: 200, url: 'https://www.youtube.com/playlist?list=PLfYUBJiXbdtSvpQjSnJJ_PmDQB_VyT5iU' },
  { id: 'cs231n_cv', title: 'CS231N: Convolutional Neural Networks', instructor: 'Stanford University', partner: 'DAIR.AI', category: 'Machine Learning', level: 'Advanced', duration: '40 hours', progress: 0, thumbnail: 'ml', description: 'Stanford\'s famous Vision course breaking down image classification, generative models, and object detection.', rewardCoins: 220, url: 'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv' },
  { id: 'langchain_sys', title: 'Building Systems with ChatGPT API', instructor: 'DeepLearning.AI', partner: 'DAIR.AI', category: 'AI Applications', level: 'Intermediate', duration: '8 hours', progress: 0, thumbnail: 'apps', description: 'Learn how to automate complex agent workflows using chain calls connected to external tools.', rewardCoins: 120, url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/' }
];

const REELS = [
  { id: 'r1', creator: 'Stanford University', creatorHandle: '@stanford_ml', creatorAvatar: 'SU', title: 'Why Machine Learning is growing so fast', description: 'Exploring the exponential growth of neural compute.', likes: '18.4k', comments: '892', duration: '0:58', youtubeId: 'jGwO_UgTS7I', tags: ['ml', 'ai'] },
  { id: 'r2', creator: 'Andrej Karpathy', creatorHandle: '@karpathy', creatorAvatar: 'AK', title: 'Building GPT from scratch', description: 'The transformer mechanism explained simply.', likes: '24.1k', comments: '1.2k', duration: '1:02', youtubeId: 'VMj-3S1tku0', tags: ['gpt', 'code'] },
  { id: 'r3', creator: 'DeepLearning.AI', creatorHandle: '@deeplearning_ai', creatorAvatar: 'DL', title: 'Intuition behind Backprop', description: 'How gradients flow through networks.', likes: '31.2k', comments: '1.5k', duration: '1:15', youtubeId: 'PySo_6S4ZAg', tags: ['math', 'dl'] },
  { id: 'r4', creator: 'MIT CSAIL', creatorHandle: '@mit_csail', creatorAvatar: 'MIT', title: 'Deep Learning for Art & Creativity', description: 'Generating aesthetics with neural fields.', likes: '42.8k', comments: '2.3k', duration: '0:47', youtubeId: '7sB052ADzsk', tags: ['art', 'ai'] },
  { id: 'r5', creator: 'CMU Robotics', creatorHandle: '@cmu_robot', creatorAvatar: 'CMU', title: 'Introduction to Modern Deep Learning', description: 'From MLPs to attention mechanisms.', likes: '28.7k', comments: '1.8k', duration: '1:30', youtubeId: 'XpDbeH_a5d0', tags: ['robotics', 'dl'] },
  { id: 'r6', creator: 'NYU Center for Data Science', creatorHandle: '@nyu_cds', creatorAvatar: 'NYU', title: 'The Future of Foundation Models', description: 'Scaling laws and the path to AGI.', likes: '15.2k', comments: '640', duration: '1:10', youtubeId: '0bMe_vC_uN0', tags: ['agi', 'scaling'] },
  { id: 'r7', creator: 'fast.ai', creatorHandle: '@fast_ai', creatorAvatar: 'FA', title: 'Practical Deep Learning for Coders', description: 'Getting models into production.', likes: '39.4k', comments: '2.9k', duration: '0:55', youtubeId: '1nqCZqDYPp0', tags: ['production', 'pytorch'] },
  { id: 'r8', creator: 'Google AI', creatorHandle: '@google_ai', creatorAvatar: 'GA', title: 'Machine Learning Crash Course', description: 'Google\'s core intro to ML concepts.', likes: '55.1k', comments: '4.2k', duration: '0:45', youtubeId: 'ayzOzZGHZy4', tags: ['google', 'ml'] },
  { id: 'r9', creator: 'LangChain', creatorHandle: '@langchain_ai', creatorAvatar: 'LC', title: 'Building LLM Apps with RAG', description: 'Retrieval Augmented Generation explained.', likes: '21.6k', comments: '1.1k', duration: '1:20', youtubeId: 'vX2eAtvW_88', tags: ['rag', 'llm'] },
  { id: 'r10', creator: 'OpenAI', creatorHandle: '@openai', creatorAvatar: 'OA', title: 'Introducing GPT-4o', description: 'The next frontier in multimodal AI.', likes: '124k', comments: '12k', duration: '0:50', youtubeId: 'U9mJuUkhUzk', tags: ['openai', 'multimodal'] },
  { id: 'r11', creator: 'Caltech', creatorHandle: '@caltech', creatorAvatar: 'CT', title: 'Learning From Data: The Fundamentals', description: 'Binary classification and the VC dimension.', likes: '12.8k', comments: '430', duration: '1:05', youtubeId: 'mbyG85GZ0PI', tags: ['math', 'theory'] },
];

const CREATORS = [
  { id: 'c1', name: 'Stanford University', handle: '@stanford_ml', avatar: 'SU', bio: 'AI researcher & educator. Making ML accessible to everyone.', followers: 142000, courses: 8, reels: 234, verified: true, specialty: 'Machine Learning' },
  { id: 'c2', name: 'Andrej Karpathy', handle: '@karpathy', avatar: 'AK', bio: 'Building the future of AI. Prev. Tesla & OpenAI.', followers: 850000, courses: 2, reels: 15, verified: true, specialty: 'Neural Networks' },
  { id: 'c3', name: 'Andrew Ng', handle: '@andrewng', avatar: 'AN', bio: 'Founder of DeepLearning.AI. Landing AI CEO.', followers: 1200000, courses: 25, reels: 89, verified: true, specialty: 'Machine Learning' },
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
  const [isMuted, setIsMuted] = useState(true);
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
