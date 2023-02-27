const path = require('path')
const colors = require('colors');
const { FFScene, FFText, FFVideo, FFAlbum, FFSubtitle, FFImage, FFCreator } = require("ffcreator");

/**
 * FFCreator由creator(入口)、场景(FFScene)、元素(包括图片、视频、字幕等)以及音乐等组成。
 * @type {FFCreatorSpace.FFCreator}
 */
// 创建一个容器入口
const outputDir = path.join(__dirname, './output1/');
const cacheDir = path.join(__dirname, './cache/');
const creator = new FFCreator({
    cacheDir,                 // 缓存目录
    outputDir,                // 输出目录
    width: 500,               // 影片宽
    height: 680,              // 影片高
    cover: './assets/111111111111.jpg',           // 设置封面
    // audioLoop: true,          // 音乐循环
    // fps: 24,                  // fps
    // threads: 4,               // 多线程(伪造)并行渲染
    // debug: false,             // 开启测试模式
    // defaultOutputOptions: null,// ffmpeg输出选项配置
});

// 创建情景
const scene = new FFScene();
scene.setBgColor('#f0730c');        // 设置背景色
scene.setDuration(8.5);             // 设置停留时长
scene.setTransition('Fat', 1.5);    // 设置过渡动画(类型, 时间)
creator.addChild(scene);

// 设置图片
const img = new FFImage({path: path.join(__dirname, './assets/a.jpg')});
img.setXY(250, 340);                // 设置位置
img.setScale(2);                    // 设置缩放
img.setRotate(45);                  // 设置旋转
img.setOpacity(0.3);                // 设置透明度
img.setWH(100, 200);                // 设置宽高
img.addEffect('fadeInDown', 1, 1);  // 设置动画效果
scene.addChild(img);
// 也可以把参数放到构造函数conf中 ,这里的resetXY是重新计算位置
// const img = new FFImage({path, width, height, x, y, resetXY: false});

//创建文字

const text = new FFText({text: '这是一个文字', x: 250, y: 80});
text.setColor('#ffffff');                   // 文字颜色
text.setBackgroundColor('#b33771');         // 背景色
text.addEffect('fadeInDown', 1, 1);         // 动画
text.alignCenter();                         // 文字居中
text.setStyle({padding: [4, 12, 6, 12]});   // 设置样式object
scene.addChild(text);

// 创建字幕元素
const content = '跟计算机工作酷就酷在这里，它们不会生气，能记住所有东西...省略';
const subtitle = new FFSubtitle({
    x: 320,
    y: 520,
    comma: true,                  // 是否逗号分割
    backgroundColor: '#189f57',   // 背景色
    color: '#fff',                // 文字颜色
    fontSize: 24                  // 字号
});
subtitle.setText(content);      // 设置文案也可以放到conf里
subtitle.frameBuffer = 24;      // 缓存帧
subtitle.setDuration(12);       // 设置字幕总时长
scene.addChild(subtitle);

// 开始处理视频

creator.start();        // 开始加工
creator.closeLog();     // 关闭log(包含perf)
creator.on('start', () => {
    console.log(colors.bold(`FFCreator start`));
});
creator.on('error', e => {
    console.log(`FFCreator error: ${JSON.stringify(e)}`);
});
creator.on('progress', e => {
    console.log(`FFCreator progress: ${e.state} ${(e.percent * 100) >> 0}%`);
});
creator.on('complete', e => {
    console.log(colors.bgGreen(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `));
});

