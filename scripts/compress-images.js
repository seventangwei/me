const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 检查是否安装了必要的工具
function checkTools() {
  try {
    execSync('which magick', { stdio: 'ignore' });
    console.log('✅ ImageMagick已安装');
    return true;
  }
  catch {
    console.log('❌ ImageMagick未安装，请先安装：brew install imagemagick');
    return false;
  }
}

// 压缩PNG图片
function compressPNG(filePath) {
  const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/, '.compressed.$1');

  try {
    execSync(`magick "${filePath}" -strip -quality 85% "${outputPath}"`);

    const originalSize = fs.statSync(filePath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

    console.log(`📊 ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (减少${reduction}%)`);

    // 替换原文件
    fs.unlinkSync(filePath);
    fs.renameSync(outputPath, filePath);

    return true;
  }
  catch (error) {
    console.error(`❌ 压缩失败: ${filePath}`, error.message);
    return false;
  }
}

// 压缩JPG图片
function compressJPG(filePath) {
  const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/, '.compressed.$1');

  try {
    execSync(`magick "${filePath}" -strip -sampling-factor 4:2:0 -quality 80% -interlace JPEG "${outputPath}"`);

    const originalSize = fs.statSync(filePath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

    console.log(`📊 ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (减少${reduction}%)`);

    // 替换原文件
    fs.unlinkSync(filePath);
    fs.renameSync(outputPath, filePath);

    return true;
  }
  catch (error) {
    console.error(`❌ 压缩失败: ${filePath}`, error.message);
    return false;
  }
}

// 主函数
function main() {
  if (!checkTools()) {
    return;
  }

  console.log('🚀 开始压缩图片...\n');

  // 需要压缩的图片文件
  const imagesToCompress = [
    'static/img/blog/js-expression.png', // 3.47MB
    // 'static/img/projects/me-blog.jpg', // 2.31MB
    // 'static/img/blog/js.jpg', // 2.03MB
    // 'static/img/blog/nextjs.png', // 1.66MB
    // 'static/img/blog/me-site.jpg', // 1.55MB
    // 'static/img/blog/react-web.jpg', // 519KB
    // 'static/img/blog/echarts.jpg', // 475KB
    // 'static/img/projects/i18n.jpg', // 458KB
    // 'static/img/projects/storybook-charts.jpg', // 315KB
    // 'static/img/projects/nextjs-blog.jpg', // 281KB
    // 'static/img/projects/kz-icon.jpg', // 116KB
  ];

  let successCount = 0;

  imagesToCompress.forEach((imagePath) => {
    const fullPath = path.join(__dirname, '..', imagePath);

    if (fs.existsSync(fullPath)) {
      // const originalSize = fs.statSync(fullPath).size

      if (imagePath.endsWith('.png')) {
        if (compressPNG(fullPath)) successCount++;
      }
      else if (imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg')) {
        if (compressJPG(fullPath)) successCount++;
      }
    }
    else {
      console.log(`⚠️  文件不存在: ${imagePath}`);
    }
  });

  console.log(`\n✅ 压缩完成！成功压缩了 ${successCount} 个文件`);
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { compressPNG, compressJPG };
