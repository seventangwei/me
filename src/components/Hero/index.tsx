import { type Variants, motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StarBound } from '@site/src/components/StarBound';
import Translate from '@docusaurus/Translate';
import Hello from '/img/page/hello.gif';
import SocialLinks from '@site/src/components/SocialLinks';
import styles from './index.module.css';

const variants: Variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
};

function Name() {
  return (
    <motion.div
      className={styles.hero_text}
      custom={1}
      initial="hidden"
      animate="visible"
      variants={variants}
      onMouseMove={(e) => {
        e.currentTarget.style.setProperty('--x', `${e.clientX}px`);
        e.currentTarget.style.setProperty('--y', `${e.clientY}px`);
      }}
    >
      <Translate id="homepage.hero.greet">大家好! 我是</Translate>
      <span
        className={styles.name}
        onMouseMove={(e) => {
          const bounding = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mouse-x', `${bounding.x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${bounding.y}px`);
        }}
      >
        <Translate id="homepage.hero.name">唐伟</Translate>
      </span>
      {/* <span className="ml-1">👋</span> */}
      <img 
        style={{ width: 85, height: 85 }} 
        className="ml-1" 
        src={Hello}
        loading="eager"
        decoding="async"
        alt="Hello animation"
      />
      {/* <NameSvg></NameSvg> */}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <motion.div custom={2} initial="hidden" animate="visible" variants={variants} className="max-lg:px-4">
          <Translate id="homepage.hero.text">
            一名前端开发者，
          </Translate>
          <Translate id="homepage.hero.text">
            ID是
          </Translate>
          <span
            className={styles.name}
            onMouseMove={(e) => {
              const bounding = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${bounding.x}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${bounding.y}px`);
            }}
          >
            <Translate id="homepage.hero.name">Seven</Translate>
          </span>
          <Translate id="homepage.hero.text">
            ，正在探索不止于前端，这是我的小网站，希望我遇到的技术问题和技术分享对您有所启发。
          </Translate>
        </motion.div>
        <motion.div custom={3} initial="hidden" animate="visible" variants={variants}>
          <SocialLinks />
        </motion.div>

        <motion.div className="mt-4 flex gap-2" custom={4} initial="hidden" animate="visible" variants={variants}>
          <StarBound starCount={1} borderWidth={1} speed={5} radius={0} className="overflow-hidden">
            <div
            // borderRadius="1.25rem"
              className="relative z-10 flex items-center overflow-hidden px-5 py-3 text-center text-base font-semibold dark:border-neutral-800"
            >
              <a href="/about" className="font-semibold">
                <Translate id="hompage.hero.introduce">自我介绍</Translate>
              </a>
            </div>
          </StarBound>
        </motion.div>
      </div>
      <motion.div custom={1} initial="hidden" animate="visible" variants={variants} className={styles.background}>
        {/* <HeroSvg /> */}
        <div className={styles.dotLottie}>
          <DotLottieReact
            // src="https://lottie.host/11ac9c11-85c3-4e1d-9f05-3b4e35d76d51/xYXyJvO0Lu.lottie"
            src="/hero.lottie"
            loop
            autoplay
            renderConfig={{ autoResize: true }}
          />
        </div>
        {/* <div className={styles.circle} /> */}
      </motion.div>
    </motion.div>
  );
}
