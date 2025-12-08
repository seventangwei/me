import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { type Project, projects } from '@site/data/projects';
import Marquee from '@site/src/components/Magicui/marquee';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useColorMode } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import { Section } from '../Section';

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '');
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'from-green-500 to-green-600';
    case 'completed': return 'from-blue-500 to-blue-600';
    case 'archived': return 'from-gray-500 to-gray-600';
    default: return 'from-primary-500 to-primary-600';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'active': return '进行中';
    case 'completed': return '已完成';
    case 'archived': return '已归档';
    default: return '未知';
  }
};

const showProjects = projects.filter(i => i.preview);

const Slider = ({ items }: { items: Project[] }) => {
  return (
    <div className="relative flex min-h-[260px] items-center overflow-hidden px-3">
      <Marquee pauseOnHover gradient="true" className="[--duration:60s]">
        {showProjects.map(project => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={true ? { opacity: 1, y: 0 } : {}}
            className="card-hove card backdrop-blur-sm rounded-none overflow-hidden max-w-xl max-md:max-w-svw"
          >
            {/* 项目图片 */}
            <div className="relative max-md:h-48 md:h-52 2xl:h-72 overflow-hidden">
              <Link href="/" className="max-lg:max-h-[240px] xl:max-h-[207px] 2xl:max-h-[280px] w-full cursor-pointer overflow-hidden object-cover transition-transform duration-500 hover:scale-110">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              {/* 状态标签 */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} text-white text-xs font-medium rounded-full`}>
                  {getStatusText(project.status)}
                </span>
              </div>

              {/* 年份 */}
              <div className={`absolute top-4 right-4 flex items-center space-x-1 text-black/80 ${project?.color ?? ''} text-xs`}>
                <Icon icon="ri:calendar-line" />
                <span>{project.year}</span>
              </div>

              {/* GitHub统计 */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white/80 text-xs">
                <div className="flex items-center space-x-1">
                  <Icon icon="ri:star-line" />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon icon="ri:share-line" />
                  <span>{project.forks}</span>
                </div>
              </div>
            </div>

            {/* 项目内容 */}
            <div className="p-6 space-y-4">
              {/* 标题 */}
              <Link href="" className="relative hover:no-underline text-xl font-bold truncate">
                {project.title}
              </Link>

              {/* 描述 */}
              <p className="text-black/90 dark:text-gray-100 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* 技术栈 */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-100 dark:bg-white text-black/80 text-xs rounded-md font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 bg-white/10 text-gray-100 text-xs rounded-md">
                    +
                    {project.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* 特性 */}
              <div className="space-y-2">
                <h4 className="text-sm text-black/90 dark:text-gray-100">核心特性:</h4>
                <div className="grid grid-cols-2 gap-1 text-xs text-black/80 dark:text-gray-300">
                  {project.features.slice(0, 4).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-blue-300 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <motion.a
                  href={project.github}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-300 hover:text-blue-500 py-2 rounded-lg text-sm font-medium"
                >
                  <Icon icon="ri:github-line" />
                  <span className="text-sm">源码</span>
                </motion.a>

                <motion.a
                  href={project.demo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-300 hover:text-blue-500 py-2 rounded-lg text-sm font-medium"
                >
                  <Icon icon="icon-park-outline:preview-open" />
                  <span>预览</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
};

export default function ProjectSection() {
  const { colorMode } = useColorMode();

  return (
    <div className={clsx(`w-screen max-w-full`)}>
      <Section
        title={<Translate id="homepage.project.title">项目展示</Translate>}
        icon="arcticons:projectm"
        href="/project"
        className="px-3"
      >
        <Slider items={showProjects} />
      </Section>
    </div>
  );
}
