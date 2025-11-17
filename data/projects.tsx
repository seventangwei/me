export type Project = {
  id: number
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  features: string[]
  github: string
  demo: string
  stars: number
  forks: number
  status: string
  year: string
  preview?: boolean
  color?: string
};

export const projects: Project[] = [
  {
    id: 1,
    title: '高定制图表库',
    description: '基于echarts的图表库，提供高度定制化的图表组件和丰富的数据可视化功能。',
    image: '/img/projects/storybook-charts.jpg',
    category: 'Web',
    technologies: ['React', 'Echarts', 'Node.js', 'Storybook'],
    features: ['定制化图表', '数据可视化', '移动端适配', '多包管理'],
    github: 'https://github.com/seventangwei/storybook-charts',
    demo: 'https://seventangwei.github.io/storybook-charts/',
    stars: 234,
    forks: 45,
    status: 'completed',
    year: '2024',
    preview: true,
  },
  {
    id: 2,
    title: 'Icon库',
    description: 'figma转化的自定义react/rn的Icon库，支持多色图标和主题定制。',
    image: '/img/projects/kz-icon.jpg',
    category: 'Web',
    technologies: ['Icon', 'TypeScript', 'React/RN'],
    features: ['Figma转Icon', '开箱即用', '组件化', '自定义SVG'],
    github: 'https://github.com/seventangwei/kz-icon',
    demo: 'https://seventangwei.github.io/kz-icon/',
    stars: 189,
    forks: 32,
    status: 'completed',
    year: '2024',
    preview: true,
  },
  {
    id: 3,
    title: 'NextJS练习场',
    description: 'NextJs的练习场，包含多个小项目，包括博客、TodoList、TodoList等。',
    image: '/img/projects/nextjs-blog.jpg',
    category: 'Web',
    technologies: ['NextJS', 'NodeJS', 'Vite'],
    features: ['NextJs练习', '初期博客', 'SEO优化', '后端组件'],
    github: 'https://github.com/seventangwei/tangwei-blog',
    demo: 'https://seventangwei.github.io/tangwei-blog/',
    stars: 156,
    forks: 28,
    status: 'completed',
    year: '2023',
    preview: true,
  },
  {
    id: 4,
    title: '个人网站',
    description: '基于Docusaurus的个人网站，提供博客、文档、项目展示等功能。',
    image: '/img/projects/me-blog.jpg',
    category: 'Web/H5',
    technologies: ['Docusaurus', 'React', 'TailwindCSS', 'Markdown'],
    features: ['个人高定制网站', '个人博客', '文档完善', '记录生活'],
    github: 'https://github.com/seventangwei/me',
    demo: 'https://seventangwei.github.io/me',
    stars: 512,
    forks: 89,
    status: 'active',
    year: '2025',
    preview: true,
  },
  {
    id: 5,
    title: '国际化工具',
    description: '交互式命令国际化工具，支持一键转换或者导入代码中文，并生成对应的翻译文件。',
    image: '/img/projects/i18n.jpg',
    category: 'web',
    technologies: ['AST', 'Minimatch', 'ShellJS', 'TS'],
    features: ['自动化i18next国际化', '命令行', '一键转换', '交互式命令'],
    github: 'https://github.com/seventangwei/i18n-command',
    demo: 'https://npm.io/package/kz-i18n-command',
    stars: 298,
    forks: 67,
    status: 'completed',
    year: '2022',
    preview: true,
    color: 'text-white',
  },
];
