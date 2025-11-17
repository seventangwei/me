module '*.gif'

declare module '@theme/IdealImage' {
  const IdealImage: React.ComponentType<{
    src: string
    alt: string
    img?: string
  }>;
  export default IdealImage;
}
