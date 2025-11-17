import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { StarBound } from './index';

const StarBoundDemo = () => {
  const [starCount, setStarCount] = useState(50);
  const [speed, setSpeed] = useState(1);
  const [borderWidth, setBorderWidth] = useState(2);
  const [showSettings, setShowSettings] = useState(false);

  const demoCards = [
    {
      title: '基础卡片',
      description: '这是一个带有流动星界边框的基础卡片示例',
      icon: <Icon icon="ri:star-line" />,
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: '能量卡片',
      description: '星星在边框上流动，创造出动态的视觉效果',
      icon: <Icon icon="ri:star-line" />,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: '星光卡片',
      description: '每颗星星都有独特的颜色和光晕效果',
      icon: <Icon icon="ri:star-line" />,
      gradient: 'from-pink-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            流动
            <span className="gradient-text">星界</span>
            效果
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            使用React和Tailwind CSS创建的动态星空边框效果
          </p>
        </motion.div>

        {/* 设置控制面板 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-2 mx-auto px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <span>{showSettings ? '隐藏设置' : '显示设置'}</span>
          </button>

          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    星星数量:
                    {' '}
                    {starCount}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={starCount}
                    onChange={e => setStarCount(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    流动速度:
                    {' '}
                    {speed.toFixed(1)}
                    x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={e => setSpeed(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    边框宽度:
                    {' '}
                    {borderWidth}
                    px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={borderWidth}
                    onChange={e => setBorderWidth(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 演示卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {demoCards.map((card, index) => {
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <StarBound
                  className="h-full"
                  starCount={starCount}
                  speed={speed}
                  borderWidth={borderWidth}
                >
                  <div className="bg-dark-900/80 backdrop-blur-sm rounded-2xl p-6 h-full">
                    <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon icon="ri:star-line" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{card.description}</p>
                  </div>
                </StarBound>
              </motion.div>
            );
          })}
        </div>

        {/* 大型展示区域 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <StarBound
            className="w-full"
            starCount={starCount * 2}
            speed={speed}
            borderWidth={borderWidth}
          >
            <div className="bg-gradient-to-br from-dark-900/90 via-dark-800/90 to-primary-900/90 backdrop-blur-sm rounded-2xl p-12">
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 mx-auto"
                >
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span>测试</span>
                  </div>
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  流动星界效果
                </h3>

                <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  这是一个完全使用React和Canvas API创建的动态边框效果。
                  星星沿着边框流动，每颗星星都有独特的颜色、大小和速度。
                  光晕效果和闪烁动画让整个边框充满生命力。
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  {['React', 'Canvas API', 'Framer Motion', 'Tailwind CSS'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </StarBound>
        </motion.div>

        {/* 特性说明 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: '动态流动',
              description: '星星沿着边框持续流动，创造出动态的视觉效果',
              icon: '🌟',
            },
            {
              title: '多彩光晕',
              description: '每颗星星都有独特的颜色和渐变光晕效果',
              icon: '✨',
            },
            {
              title: '可自定义',
              description: '支持调整星星数量、速度和边框宽度等参数',
              icon: '⚙️',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StarBoundDemo;
