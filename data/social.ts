export type Social = {
  github?: string
  x?: string
  juejin?: string
  qq?: string
  wx?: string
  xiaohongshu?: string
  cloudmusic?: string
  zhihu?: string
  email?: string
  discord?: string
};

type SocialValue = {
  href?: string
  title: string
  icon: string
  color: string
};

const social: Social = {
  github: 'https://github.com/seventangwei',
  x: 'https://x.com/seventangwei',
  juejin: 'https://juejin.cn/user/2084329779640823',
  wx: 'https://cdn.jsdelivr.net/gh/seventangwei/images@master/seven.jpg',
  xiaohongshu: 'https://www.xiaohongshu.com/user/profile/609aa7b20000000001008cb3',
  zhihu: 'https://www.zhihu.com/people/na-yi-ke-wei-wang',
  email: 'mailto:tangwei785@gmail.com',
  discord: 'https://discord.gg/TKTCPdZU',
};

const socialSet: Record<keyof Social | 'rss', SocialValue> = {
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
  },
  juejin: {
    href: social.juejin,
    title: '掘金',
    icon: 'simple-icons:juejin',
    color: '#1E81FF',
  },
  x: {
    href: social.x,
    title: 'X',
    icon: 'ri:twitter-x-line',
    color: '#000',
  },
  wx: {
    href: social.wx,
    title: '微信',
    icon: 'ri:wechat-2-line',
    color: '#07c160',
  },
  xiaohongshu: {
    href: social.xiaohongshu,
    title: '小红书',
    icon: 'simple-icons:xiaohongshu',
    color: '#FF4F4F',
  },
  zhihu: {
    href: social.zhihu,
    title: '知乎',
    icon: 'ri:zhihu-line',
    color: '#1772F6',
  },
  discord: {
    href: social.discord,
    title: 'Discord',
    icon: 'ri:discord-line',
    color: '#5A65F6',
  },
  qq: {
    href: social.qq,
    title: 'QQ',
    icon: 'ri:qq-line',
    color: '#1296db',
  },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
  },
  cloudmusic: {
    href: social.cloudmusic,
    title: '网易云',
    icon: 'ri:netease-cloud-music-line',
    color: '#C20C0C',
  },
  rss: {
    href: '/blog/rss.xml',
    title: 'RSS',
    icon: 'ri:rss-line',
    color: '#FFA501',
  },
};

export default socialSet;
