import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 动态导入ES模块
let imagemin, imageminMozjpeg, imageminPngquant

async function importModules() {
  if (!imagemin) {
    imagemin = (await import('imagemin')).default
    imageminMozjpeg = (await import('imagemin-mozjpeg')).default
    imageminPngquant = (await import('imagemin-pngquant')).default
  }
}

// 压缩单个图片文件
async function compressImage(filePath) {
  try {
    await importModules()

    const originalSize = fs.statSync(filePath).size

    // 根据文件类型选择不同的压缩器
    const plugins = []
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      plugins.push(imageminMozjpeg({
        quality: 80,
        progressive: true,
      }))
    }
    else if (filePath.endsWith('.png')) {
      plugins.push(imageminPngquant({
        quality: [0.6, 0.8],
        speed: 1,
      }))
    }

    if (plugins.length === 0) {
      console.log(`⚠️  不支持的文件类型: ${filePath}`)
      return false
    }

    // 读取文件内容
    const buffer = fs.readFileSync(filePath)

    // 压缩图片
    const compressedBuffer = await imagemin.buffer(buffer, {
      plugins: plugins,
    })

    const compressedSize = compressedBuffer.length
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)

    console.log(`📊 ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (减少${reduction}%)`)

    // 写入压缩后的文件
    fs.writeFileSync(filePath, compressedBuffer)

    return true
  }
  catch (error) {
    console.error(`❌ 压缩失败: ${filePath}`, error.message)
    return false
  }
}

// 主函数
async function main() {
  console.log('🚀 开始使用Node.js包压缩图片...\n')

  // 需要压缩的图片文件
  const imagesToCompress = [
    'static/img/blog/js-expression.png', // 3.47MB
    'static/img/projects/me-blog.jpg', // 2.31MB
    'static/img/blog/js.jpg', // 2.03MB
    'static/img/blog/nextjs.png', // 1.66MB
    'static/img/blog/me-site.jpg', // 1.55MB
    'static/img/blog/react-web.jpg', // 519KB
    'static/img/blog/echarts.jpg', // 475KB
    'static/img/projects/i18n.jpg', // 458KB
    'static/img/projects/storybook-charts.jpg', // 315KB
    'static/img/projects/nextjs-blog.jpg', // 281KB
    'static/img/projects/kz-icon.jpg', // 116KB
  ]

  let successCount = 0
  let totalOriginalSize = 0
  let totalCompressedSize = 0

  for (const imagePath of imagesToCompress) {
    const fullPath = path.join(__dirname, '..', imagePath)

    if (fs.existsSync(fullPath)) {
      const originalSize = fs.statSync(fullPath).size
      totalOriginalSize += originalSize

      if (await compressImage(fullPath)) {
        successCount++
        const compressedSize = fs.statSync(fullPath).size
        totalCompressedSize += compressedSize
      }
    }
    else {
      console.log(`⚠️  文件不存在: ${imagePath}`)
    }
  }

  const totalReduction = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1)

  console.log(`\n✅ 压缩完成！`)
  console.log(`📈 成功压缩了 ${successCount} 个文件`)
  console.log(`📦 总大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB → ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`)
  console.log(`💪 总压缩率: ${totalReduction}%`)
}

// 运行脚本
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error)
}
