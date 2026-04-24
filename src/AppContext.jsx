import React, { createContext, useContext, useState, useMemo } from 'react';

// Full ML YouTube Courses — synced from https://github.com/dair-ai/ML-YouTube-Courses
const COURSES = [
  // ── Machine Learning ──────────────────────────────────────────────────────────
  { id: 'caltech_cs156',   title: 'Learning from Data',                      instructor: 'Caltech (Yaser Abu-Mostafa)', partner: 'DAIR.AI', category: 'Machine Learning',   level: 'Beginner',     duration: '18 lectures',   price: 110, progress: 0, thumbnail: 'ml',     description: 'Introductory ML covering VC Dimension, bias-variance tradeoff, SVMs, kernels, and fundamental learning principles.',                             rewardCoins: 180, url: 'https://www.youtube.com/playlist?list=PLD63A284B7615313A' },
  { id: 'stanford_cs229',  title: 'CS229: Machine Learning',                 instructor: 'Stanford University',         partner: 'DAIR.AI', category: 'Machine Learning',   level: 'Intermediate', duration: '20+ lectures',  price: 199, progress: 0, thumbnail: 'ml',     description: 'Stanford\'s legendary ML course: linear regression, SVMs, kernels, decision trees, neural networks, and debugging ML models.',                  rewardCoins: 250, url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU' },
  { id: 'tubingen_intro',  title: 'Introduction to Machine Learning',        instructor: 'University of Tübingen',       partner: 'DAIR.AI', category: 'Machine Learning',   level: 'Beginner',     duration: 'Full semester', price: 129, progress: 0, thumbnail: 'ml',    description: 'Covers regression, classification, optimization, regularization, clustering, and dimensionality reduction from first principles.',               rewardCoins: 160, url: 'https://www.youtube.com/playlist?list=PL05umP7R6ij35ShKLDqccJSDntugY4FQT' },
  { id: 'cs231n_cv',       title: 'CS231N: Convolutional Neural Networks',   instructor: 'Stanford University',         partner: 'DAIR.AI', category: 'Machine Learning',   level: 'Advanced',     duration: 'Spring 2017',   price: 229, progress: 0, thumbnail: 'ml',    description: 'Stanford\'s famous vision course: image classification, CNN architectures, RNNs, detection, segmentation, and generative models.',             rewardCoins: 220, url: 'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv' },
  { id: 'stanford_graph',  title: 'Machine Learning with Graphs',            instructor: 'Stanford University',         partner: 'DAIR.AI', category: 'Machine Learning',   level: 'Intermediate', duration: 'Full semester', price: 189, progress: 0, thumbnail: 'ml',    description: 'PageRank, Node Embeddings, Graph Neural Networks, Knowledge Graphs, and Deep Generative Models for Graphs.',                                   rewardCoins: 200, url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rPLKxIpqhjhPgdQy7imNkDn' },
  { id: 'stat_ml_tub',     title: 'Statistical Machine Learning',            instructor: 'University of Tübingen',       partner: 'DAIR.AI', category: 'Machine Learning',   level: 'Intermediate', duration: 'Full semester', price: 149, progress: 0, thumbnail: 'ml',    description: 'KNN, Bayesian decision theory, convex optimization, linear/ridge/logistic regression, SVM, Random Forests, Boosting, PCA, Clustering.',        rewardCoins: 180, url: 'https://www.youtube.com/playlist?list=PL05umP7R6ij2XCvrRzLokX6EoHWaGA2cC' },

  // ── Deep Learning ─────────────────────────────────────────────────────────────
  { id: 'karpathy_zero',   title: 'Neural Networks: Zero to Hero',           instructor: 'Andrej Karpathy',             partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Beginner',     duration: '7+ hours',      price: 159, progress: 0, thumbnail: 'dl',    description: 'Build neural nets from scratch: micrograd → makemore → GPT. Deep backpropagation and language modeling intuition.',                            rewardCoins: 300, url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ' },
  { id: 'fastai_dl',       title: 'Practical Deep Learning for Coders',      instructor: 'fast.ai (Jeremy Howard)',     partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Beginner',     duration: 'Part 1 & 2',    price: 139, progress: 0, thumbnail: 'dl',    description: 'Top-down pragmatic deep learning with PyTorch, fastai, and Hugging Face. Covers CV, NLP, tabular, and diffusion models.',                      rewardCoins: 200, url: 'https://www.youtube.com/playlist?list=PLfYUBJiXbdtSvpQjSnJJ_PmDQB_VyT5iU' },
  { id: 'cs230_dl',        title: 'CS230: Deep Learning',                    instructor: 'Stanford University',         partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Advanced',     duration: 'Full course',   price: 219, progress: 0, thumbnail: 'dl',    description: 'CNNs, RNNs, LSTMs, GANs, full-cycle ML projects, deep learning strategy, and career advice from Andrew Ng.',                                   rewardCoins: 200, url: 'https://youtube.com/playlist?list=PLoROMvodv4rOABXSygHTsbvUz4G_YQhOb' },
  { id: 'mit_intro_dl',    title: 'Introduction to Deep Learning',           instructor: 'MIT',                         partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Beginner',     duration: 'MIT 6.S191',    price: 119, progress: 0, thumbnail: 'dl',    description: 'MIT\'s official deep learning course covering fundamentals, RNNs, CNNs, and applications.',                                                    rewardCoins: 160, url: 'https://www.youtube.com/playlist?list=PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI' },
  { id: 'nyu_deep_sp21',   title: 'NYU Deep Learning (SP21)',                instructor: 'Yann LeCun & Alfredo Canziani', partner: 'DAIR.AI', category: 'Deep Learning',   level: 'Advanced',     duration: 'Full semester', price: 249, progress: 0, thumbnail: 'dl',    description: 'Energy-Based Models, Latent Variable Models, GANs, Autoencoders, and Self-supervised Learning by the creator of CNNs.',                        rewardCoins: 280, url: 'https://www.youtube.com/playlist?list=PLLHTzKZzVU9e6xUfG10TkTWApKSZCzuBI' },
  { id: 'deep_unsup',      title: 'Deep Unsupervised Learning',              instructor: 'UC Berkeley',                 partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Advanced',     duration: 'Full semester', price: 239, progress: 0, thumbnail: 'dl',    description: 'Autoregressive Models, Flow Models, VAEs, Self-supervised learning, Implicit Models, and Compression.',                                        rewardCoins: 260, url: 'https://www.youtube.com/playlist?list=PLwRJQ4m4UJjPiJP3691u-qWwPGVKzSlNP' },
  { id: 'cmu_intro_dl',    title: 'CMU Introduction to Deep Learning',       instructor: 'CMU (11-785)',                 partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Intermediate', duration: 'Full semester', price: 179, progress: 0, thumbnail: 'dl',    description: 'Starts from MLPs and progresses into attention and sequence-to-sequence models. Strong PyTorch focus.',                                         rewardCoins: 190, url: 'https://www.youtube.com/playlist?list=PLp-0K3kfddPz8WXg8RqH0sEN6X2L65HUZ' },
  { id: 'geom_dl_ammi',    title: 'Geometric Deep Learning',                 instructor: 'AMMI',                        partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Advanced',     duration: 'Intensive',     price: 229, progress: 0, thumbnail: 'dl',    description: 'Learning in high dimensions, geometric priors, grids, manifolds, meshes, sequences, and graph neural networks.',                               rewardCoins: 240, url: 'https://www.youtube.com/playlist?list=PLn2-dEmQeTfSLXW8yXP4q_Ii58wFdxb3C' },
  { id: 'stanford_cs330',  title: 'CS330: Deep Multi-Task & Meta Learning',  instructor: 'Stanford University',         partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Advanced',     duration: 'Full semester', price: 249, progress: 0, thumbnail: 'dl',    description: 'Multi-task and transfer learning, meta-learning algorithms, few-shot learning, and hierarchical RL.',                                          rewardCoins: 270, url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMIJ-TxC3iCcdSpM8q1qly' },
  { id: 'mit_life_sci',    title: 'Deep Learning in Life Sciences',          instructor: 'MIT',                         partner: 'DAIR.AI', category: 'Deep Learning',     level: 'Advanced',     duration: 'Full semester', price: 219, progress: 0, thumbnail: 'dl',    description: 'ML for genomics: DNA accessibility, gene regulation, RNA-seq, drug discovery, protein folding with AlphaFold.',                                 rewardCoins: 250, url: 'https://www.youtube.com/playlist?list=PLypiXJdtIca5ElZMWHl4HMeyle2AzUgVB' },

  // ── Generative AI ─────────────────────────────────────────────────────────────
  { id: 'cs224n_nlp',      title: 'CS224N: Natural Language Processing',     instructor: 'Stanford University',         partner: 'DAIR.AI', category: 'Generative AI',     level: 'Advanced',     duration: 'Full semester', price: 239, progress: 0, thumbnail: 'llm',   description: 'Transformers, BERT, T5, Large Language Models, Question Answering, and the future of NLP from Stanford.',                                      rewardCoins: 250, url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ' },
  { id: 'stanford_cs25',   title: 'CS25: Transformers United',               instructor: 'Stanford University',         partner: 'DAIR.AI', category: 'Generative AI',     level: 'Intermediate', duration: 'Seminar series', price: 189, progress: 0, thumbnail: 'llm',  description: 'Deep dive into Transformers: GPT-3, Codex, Vision Transformers, RL applications, Scaling, and Interpretability.',                              rewardCoins: 220, url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rNiJRchCzutFw5ItR_Z27CM' },
  { id: 'hf_nlp_course',   title: 'NLP Course by Hugging Face',              instructor: 'Hugging Face',                 partner: 'DAIR.AI', category: 'Generative AI',     level: 'Beginner',     duration: 'Self-paced',    price: 119, progress: 0, thumbnail: 'llm',   description: 'Transfer Learning, BPE Tokenization, fine-tuning models, text embeddings, semantic search, and model evaluation.',                            rewardCoins: 140, url: 'https://www.youtube.com/playlist?list=PLo2EIpI_JMQvWfQndUesu0nPBAtZ9gP1o' },
  { id: 'foundation_mdl',  title: 'Foundation Models',                       instructor: 'Stanford CRFM',               partner: 'DAIR.AI', category: 'Generative AI',     level: 'Intermediate', duration: 'Seminar series', price: 199, progress: 0, thumbnail: 'llm',  description: 'GPT-3, CLIP, Flamingo, Codex, DINO, FLAN — the paradigm shift powering modern AI.',                                                          rewardCoins: 210, url: 'https://www.youtube.com/playlist?list=PL9t0xVFP90GD8hox0KipBkJcLX_C3ja67' },
  { id: 'stanford_xcs224u', title: 'XCS224U: Natural Language Understanding', instructor: 'Stanford University',        partner: 'DAIR.AI', category: 'Generative AI',     level: 'Advanced',     duration: 'Full semester', price: 229, progress: 0, thumbnail: 'llm',   description: 'Contextual word representations, information retrieval, in-context learning, and behavioral NLU evaluation (2023).',                          rewardCoins: 240, url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOwvldxftJTmoR3kRcWkJBp' },

  // ── Prompt Engineering ────────────────────────────────────────────────────────
  { id: 'prompt_dev',      title: 'ChatGPT Prompt Engineering for Developers', instructor: 'DeepLearning.AI',         partner: 'DAIR.AI', category: 'Prompt Engineering', level: 'Beginner',     duration: 'Short course',  price: 110, progress: 0, thumbnail: 'prompt', description: 'Learn how to intelligently wield LLMs: zero-shot, few-shot, chain-of-thought, and structured output prompting.',                               rewardCoins: 100, url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
  { id: 'langchain_dev',   title: 'LangChain for LLM Application Dev',       instructor: 'DeepLearning.AI',            partner: 'DAIR.AI', category: 'Prompt Engineering', level: 'Intermediate', duration: 'Short course',  price: 149, progress: 0, thumbnail: 'prompt', description: 'Models, Prompts, Parsers, Memories, Chains, Question Answering over Documents, and Agents with LangChain.',                                  rewardCoins: 130, url: 'https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/' },
  { id: 'cmu_adv_nlp',     title: 'CMU Advanced NLP',                        instructor: 'CMU',                         partner: 'DAIR.AI', category: 'Prompt Engineering', level: 'Advanced',     duration: 'Full semester', price: 209, progress: 0, thumbnail: 'prompt', description: 'Multi-task, multi-domain, multilingual learning; prompting + seq2seq pre-training; interpreting and debugging NLP models.',                    rewardCoins: 230, url: 'https://www.youtube.com/playlist?list=PL8PYTP1V4I8DZprnWryM4nR8IZl1ZXDjg' },

  // ── AI Applications ───────────────────────────────────────────────────────────
  { id: 'llmops_apps',     title: 'LLMOps: Building Real-World LLM Apps',    instructor: 'Comet ML',                    partner: 'DAIR.AI', category: 'AI Applications',   level: 'Intermediate', duration: 'Self-paced',    price: 159, progress: 0, thumbnail: 'apps',   description: 'Build modern software with LLMs: prompt management, evaluation pipelines, deployment, and monitoring.',                                       rewardCoins: 150, url: 'https://www.comet.com/site/llm-course/' },
  { id: 'langchain_data',  title: 'LangChain: Chat with Your Data',          instructor: 'DeepLearning.AI',            partner: 'DAIR.AI', category: 'AI Applications',   level: 'Intermediate', duration: 'Short course',  price: 129, progress: 0, thumbnail: 'apps',   description: 'Document Loading, Splitting, Vector Stores, Embeddings, Retrieval, and Question Answering with LangChain.',                                   rewardCoins: 120, url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/' },
  { id: 'langchain_sys',   title: 'Building Systems with ChatGPT API',       instructor: 'DeepLearning.AI',            partner: 'DAIR.AI', category: 'AI Applications',   level: 'Intermediate', duration: 'Short course',  price: 119, progress: 0, thumbnail: 'apps',   description: 'Automate complex agent workflows using chain calls to LLMs connected to external tools and APIs.',                                             rewardCoins: 120, url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/' },
  { id: 'fsdl_llm_boot',   title: 'Full Stack LLM Bootcamp',                 instructor: 'Full Stack Deep Learning',   partner: 'DAIR.AI', category: 'AI Applications',   level: 'Intermediate', duration: 'Bootcamp',      price: 179, progress: 0, thumbnail: 'apps',   description: 'Prompt Engineering, LLMOps, UX for Language UIs, Augmented Language Models, and launching an LLM app in one hour.',                           rewardCoins: 170, url: 'https://fullstackdeeplearning.com/llm-bootcamp/spring-2023/' },
  { id: 'fsdl_full',       title: 'Full Stack Deep Learning',                instructor: 'Full Stack Deep Learning',   partner: 'DAIR.AI', category: 'AI Applications',   level: 'Intermediate', duration: 'Full course',   price: 189, progress: 0, thumbnail: 'apps',   description: 'Production ML: infrastructure, experiment management, troubleshooting DNNs, data labelling, monitoring, and web deployment.',                  rewardCoins: 180, url: 'https://www.youtube.com/playlist?list=PL1T8fO7ArWlcWg04OgNiJy91PywMKT2lv' },
  { id: 'deepmind_rl',     title: 'RL Lecture Series (DeepMind × UCL)',       instructor: 'DeepMind & UCL',              partner: 'DAIR.AI', category: 'AI Applications',   level: 'Intermediate', duration: '13 lectures',   price: 199, progress: 0, thumbnail: 'apps',   description: 'Introduction to RL, Dynamic Programming, model-free algorithms, and deep reinforcement learning from DeepMind.',                               rewardCoins: 210, url: 'https://www.youtube.com/playlist?list=PLqYmG7hTraZDVH599EItlEWsUOsJbAodm' },
  { id: 'berkeley_drl',    title: 'Deep Reinforcement Learning',              instructor: 'UC Berkeley',                 partner: 'DAIR.AI', category: 'AI Applications',   level: 'Advanced',     duration: 'Full semester', price: 249, progress: 0, thumbnail: 'apps',   description: 'Real-world sequential decision making, imitation learning, cost functions, model-based RL, and offline RL.',                                   rewardCoins: 240, url: 'https://www.youtube.com/playlist?list=PL_iWQOsE6TfURIIhCrlt-wj9ByIVpbfGc' },
  { id: 'mlops_ng',        title: 'MLOps Specialization',                    instructor: 'DeepLearning.AI (Andrew Ng)', partner: 'DAIR.AI', category: 'AI Applications',   level: 'Intermediate', duration: '4 courses',     price: 219, progress: 0, thumbnail: 'apps',   description: 'Build production ML systems: deployment, monitoring, pipeline management, and lifecycle maintenance.',                                         rewardCoins: 200, url: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6GMoA0wbpJLi3t34Gd8l0aK' },
];

const REELS = [
  { id: 'r1', creator: 'Data Expertise', creatorHandle: '@data_expertise', creatorAvatar: 'DE', title: 'Neural Networks Explained', description: 'A deep dive into node-based learning in under 60 seconds.', likes: '12', comments: '2', duration: '0:36', youtubeId: '04XBrv4OxNM', tags: ['ml', 'neuralnets'] },
  { id: 'r2', creator: 'Ram Naresh', creatorHandle: '@ramnaresh', creatorAvatar: 'RN', title: 'Alpha-Beta Pruning Secrets', description: 'Optimize your AI decision trees with this clever algorithm.', likes: '45', comments: '5', duration: '0:45', youtubeId: 'oFuNxc49et0', tags: ['algorithms', 'ai'] },
  { id: 'r3', creator: 'Microlearn', creatorHandle: '@micro_ai', creatorAvatar: 'ML', title: 'Start Your AI Career Right', description: 'Why projects beat tutorials for long-term growth.', likes: '82', comments: '12', duration: '0:58', youtubeId: 'cArcHKeM7xg', tags: ['career', 'strategy'] },
  { id: 'r4', creator: 'Data Enthusiast', creatorHandle: '@data_enthusiast', creatorAvatar: 'DH', title: '2024 ML Roadmap', description: 'The exact steps to master Machine Learning this year.', likes: '124', comments: '24', duration: '1:05', youtubeId: 'PGuKUCS0A9A', tags: ['roadmap', 'learning'] },
  { id: 'r5', creator: 'Bear Kids AI', creatorHandle: '@bear_ai', creatorAvatar: 'BK', title: 'Defining ML Simply', description: 'The fundamentals of machines that learn from data.', likes: '310', comments: '18', duration: '0:42', youtubeId: '2U3-fG_VlLY', tags: ['basics', 'ml'] },
];

const CREATORS = [
  { id: 'c1', name: 'Stanford University', handle: '@stanford_ml', avatar: 'SU', bio: 'AI researcher & educator. Making ML accessible to everyone.', followers: 142000, courses: 8, reels: 234, verified: true, specialty: 'Machine Learning' },
  { id: 'c2', name: 'Andrej Karpathy', handle: '@karpathy', avatar: 'AK', bio: 'Building the future of AI. Prev. Tesla & OpenAI.', followers: 850000, courses: 2, reels: 15, verified: true, specialty: 'Neural Networks' },
  { id: 'c3', name: 'Andrew Ng', handle: '@andrewng', avatar: 'AN', bio: 'Founder of DeepLearning.AI. Landing AI CEO.', followers: 1200000, courses: 25, reels: 89, verified: true, specialty: 'Machine Learning' },
];

const COMPREHENSIVE_MODULES = [
  {
    id: 'bundle_ai_engineer_pro',
    title: 'AI Engineer Pro Track',
    duration: '6 months',
    price: 249,
    certification: 'Industry-verified completion certificate',
    jobAssurance: 'Interview guarantee + placement support',
    supportedBy: ['DAIR.AI', 'Hiring Partner Network', 'Mentor Board'],
    includes: ['Machine Learning', 'Deep Learning', 'Generative AI', 'AI Applications'],
  },
  {
    id: 'bundle_llm_developer',
    title: 'LLM Developer Career Track',
    duration: '4 months',
    price: 229,
    certification: 'Project-backed LLM developer certification',
    jobAssurance: 'Portfolio review + 1:1 hiring referrals',
    supportedBy: ['DAIR.AI', 'LMS Partner Ecosystem'],
    includes: ['Prompt Engineering', 'Generative AI', 'AI Applications'],
  },
  {
    id: 'bundle_ml_foundations',
    title: 'ML Foundations to Deployment',
    duration: '3 months',
    price: 199,
    certification: 'Foundation ML Certificate + capstone badge',
    jobAssurance: 'Resume build + mock interviews',
    supportedBy: ['DAIR.AI', 'Academic Review Mentors'],
    includes: ['Machine Learning', 'Deep Learning'],
  },
];

const MODEL_PREFIX = {
  gpt4o: 'GPT-4o',
  claude35: 'Claude 3.5',
  gemini: 'Gemini Pro',
  mistral: 'Mistral 7B',
  llama3: 'Llama 3',
};

function generateAiReply(question, modelId = 'gpt4o') {
  const text = question.toLowerCase();
  const model = MODEL_PREFIX[modelId] || 'AI Model';

  if (text.includes('gradient descent')) {
    return `[${model}] Gradient descent updates model weights to minimize loss:\n\nθ = θ - α * ∇J(θ)\n\n- α (learning rate) controls step size\n- Too high: unstable training\n- Too low: slow convergence\n\nUse learning-rate scheduling + normalization for better results.`;
  }

  if (text.includes('attention') || text.includes('transformer')) {
    return `[${model}] Attention lets each token look at every other token and weigh relevance:\n\nAttention(Q,K,V) = softmax(QKᵀ/√d)V\n\nWhy it helps:\n- Captures long-range dependencies\n- Parallelizable vs RNNs\n- Powers LLM reasoning and context handling.`;
  }

  if (text.includes('rag')) {
    return `[${model}] RAG pipeline:\n1) Embed query\n2) Retrieve top-k chunks from vector DB\n3) Inject context into prompt\n4) Generate grounded answer\n\nBest for up-to-date knowledge and enterprise docs without retraining base weights.`;
  }

  if (text.includes('prompt')) {
    return `[${model}] Prompt framework you can use immediately:\n\n- Role: “You are an ML tutor”\n- Goal: clear objective\n- Constraints: length/format\n- Examples: 1-2 few-shot samples\n- Output schema: JSON or bullets\n\nThis dramatically improves consistency.`;
  }

  if (text.includes('cnn') || text.includes('convolution')) {
    return `[${model}] CNNs are strong for spatial image patterns; Transformers are stronger for long-range/global dependencies.\n\nRule of thumb:\n- Limited data + smaller compute → CNNs\n- Large-scale pretraining + multimodal stacks → Transformers`;
  }

  return `[${model}] Good question — here's a direct breakdown:\n\n${question}\n\n- Core idea: identify objective, data, and constraints\n- Practical step: start with baseline, evaluate, then iterate\n- Production step: monitor drift, latency, and quality metrics\n\nIf you want, I can turn this into a step-by-step roadmap.`;
}

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
  const sendMessage = async (text, modelId = 'gpt4o') => {
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg, { role: 'thinking' }]);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, modelId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Live model request failed');
      }

      setMessages(prev => [
        ...prev.filter(m => m.role !== 'thinking'),
        { role: 'assistant', content: data.reply, model: modelId },
      ]);
    } catch (error) {
      const fallback = generateAiReply(text, modelId);
      const warning = `Live AI is temporarily unavailable (${error.message}). Using offline assistant response.\n\n`;
      setMessages(prev => [
        ...prev.filter(m => m.role !== 'thinking'),
        { role: 'assistant', content: `${warning}${fallback}`, model: modelId },
      ]);
    }
  };

  // These are now memoized above with useMemo

  return (
    <AppContext.Provider value={{
      courses, reels, creators, comprehensiveModules, coins, hasClaimedWelcome, messages, toasts,
      courseFilter, setCourseFilter, searchQuery, setSearchQuery,
      claimWelcomeBonus, toggleLike, toggleSave, toggleFollow, enrollCourse, sendMessage,
      enrolledCourses, likedReels, savedReels, followingCreators,
      isMuted, setIsMuted
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
