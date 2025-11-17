import { useEffect, useRef } from 'react';

export const StarBound = ({ children, className = '', borderWidth = 0.5, starCount = 10, speed = 1, radius = 16 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    // 设置画布尺寸
    const resizeCanvas = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();

    // 星星类
    class Star {
      progress: number;
      size: number;
      speed: number;
      opacity: number;
      color: { r: number, g: number, b: number };
      glowSize: number;

      constructor() {
        this.reset();
        // 初始化时随机分布在边框上
        this.progress = Math.random();
      }

      reset() {
        this.size = Math.random() * 2 + 1;
        this.speed = (Math.random() * 0.5 + 0.3) * speed;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.progress = 0;
        this.color = this.getRandomColor();
        this.glowSize = this.size * 3;
      }

      getRandomColor() {
        const colors = [
          { r: 59, g: 130, b: 246 }, // blue
          { r: 147, g: 51, b: 234 }, // purple
          { r: 236, g: 72, b: 153 }, // pink
          { r: 34, g: 197, b: 94 }, // green
          { r: 251, g: 146, b: 60 }, // orange
          { r: 255, g: 255, b: 255 }, // white
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.progress += this.speed * 0.001;
        if (this.progress > 1) {
          this.reset();
        }
      }

      getPosition() {
        const perimeter = (width + height) * 2;
        const distance = this.progress * perimeter;

        // 计算星星在边框上的位置
        if (distance < width - radius) {
          // 顶边
          return { x: distance, y: 0 };
        }
        else if (distance < width) {
          // 右上圆角
          const angle = (distance - (width - radius)) / radius * (Math.PI / 2);
          return { x: width - radius + Math.sin(angle) * radius, y: radius - Math.cos(angle) * radius };
        }
        // else if (distance < width + radius) {
        //   const angle = (radius - (distance - width)) / radius * (Math.PI / 2);
        //   // return { x: width - radius + Math.cos(angle) * radius, y: radius - Math.sin(angle) * radius };
        //   return { x: 0, y: 0 };
        // }
        else if (distance < width + height - radius) {
          // 右边
          return { x: width, y: distance - width };
        }
        else if (distance < width + height) {
          // 右下圆角
          const angle = (distance - (width + height - radius)) / radius * (Math.PI / 2);
          return { x: width - (radius - Math.cos(angle) * radius), y: height - radius + Math.sin(angle) * radius };
        }
        else if (distance < width * 2 + height - radius) {
          // 底边
          return { x: width - (distance - width - height), y: height };
        }
        else if (distance < width * 2 + height) {
          // 左下圆角
          const angle = (distance - (width * 2 + height - radius)) / radius * (Math.PI / 2);
          return { x: radius - Math.sin(angle) * radius, y: height - radius + Math.cos(angle) * radius };
        }
        else if (distance < width * 2 + height * 2 - radius) {
          // 左边
          return { x: 0, y: height - (distance - width * 2 - height) };
        }
        else {
          // 左上圆角
          const angle = (distance - (width * 2 + height * 2 - radius)) / radius * (Math.PI / 2);
          return { x: radius - Math.cos(angle) * radius, y: radius - Math.sin(angle) * radius };
        }
      }

      draw() {
        const pos = this.getPosition();

        // 绘制光晕
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, this.glowSize);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.glowSize, 0, Math.PI * 2);
        ctx.fill();

        // 绘制星星核心
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // 绘制星星闪烁效果
        if (Math.random() > 0.98) {
          ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pos.x - this.size * 2, pos.y);
          ctx.lineTo(pos.x + this.size * 2, pos.y);
          ctx.moveTo(pos.x, pos.y - this.size * 2);
          ctx.lineTo(pos.x, pos.y + this.size * 2);
          ctx.stroke();
        }
      }
    }

    // 创建星星
    const createStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push(new Star());
      }
    };

    // 绘制边框
    const drawBorder = () => {
      // 绘制渐变边框
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
      gradient.addColorStop(0.25, 'rgba(147, 51, 234, 0.5)');
      gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.5)');
      gradient.addColorStop(0.75, 'rgba(34, 197, 94, 0.5)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.5)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = borderWidth;
      ctx.roundRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, radius);
      ctx.stroke();
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 绘制边框
      drawBorder();

      // 更新和绘制星星
      starsRef.current.forEach((star) => {
        star.update();
        star.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // 初始化
    createStars();
    animate();

    // 监听窗口大小变化
    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [starCount, speed, borderWidth]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
      />
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};
