const path = require('path');
const colors = require('colors');
const shuffle = require('lodash/shuffle');
const { FFCreatorCenter, FFScene, FFText, FFImage, FFCreator } = require('ffcreator');

const width = 600;
const height = 400;
const logo1 = path.join(__dirname, './assets/imgs/01.jpg');
const logo2 = path.join(__dirname, './assets/imgs/02.jpg');
const logo3 = path.join(__dirname, './assets/imgs/03.jpg');
const logo4 = path.join(__dirname, './assets/imgs/04.jpg');
const logo5 = path.join(__dirname, './assets/imgs/allen.jpg');
const outputDir = path.join(__dirname, './output/');
const cacheDir = path.join(__dirname, './cache/');

const creatScene = ({ index, transition, text }) => {
    const scene = new FFScene();
    scene.setBgColor('#ee5d7c');
    scene.setDuration(5);
    scene.setTransition(transition, 1.5);

    // bg img
    const img = path.join(__dirname, `./assets/imgs/trans/0${index}.jpeg`);
    const bg = new FFImage({ path: img, x: width / 2, y: height / 2 });
    bg.addEffect({ type: 'zoomingIn', time: 5 });
    scene.addChild(bg);

    // title text
    const ftext = new FFText({ text, x: width / 2, y: height / 2 + 100, fontSize: 38 });
    ftext.alignCenter();
    ftext.addEffect('fadeInRight', 1, 1.3);
    ftext.setStyle({ color: '#30336b', backgroundColor: '#ffffff', padding: 10 });
    scene.addChild(ftext);

    // add logo2
    const logo = index === 1 ? logo1 : index === 2 ? logo2 : index === 3 ? logo3 : index === 4 ? logo4 : logo5;
    const flogo = new FFImage({ path: logo, x: width / 2, y: height / 2 - 100 });
    flogo.setScale(0.6);
    flogo.addEffect('fadeInLeft', 1, 1);
    scene.addChild(flogo);

    return scene;
};
const trans = shuffle(['Windows4', 'Stretch', 'Radiation', 'TricolorCircle', 'cube']);
const order = ['一', '二', '三', '四', '五'];

// create creator instance
const creator = new FFCreator({
    cacheDir,
    outputDir,
    width,
    height,
    highWaterMark: '10mb',
    frames: 6,
    debug: false,
});

for (let i = 1; i < 6; i++) {
    const transition = trans[i - 1];
    const text = `第${order[i - 1]}个宝贝`;
    const scene = creatScene({ index: i, transition, text });
    creator.addChild(scene);
}

//creator.openLog();
creator.start();

creator.on('start', () => {
    console.log(`FFCreator start`);
});

creator.on('error', e => {
    console.log(`FFCreator error: ${JSON.stringify(e)}`);
});

creator.on('progress', e => {
    console.log(colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`));
});

creator.on('complete', e => {
    console.log(
        colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `),
    );

    console.log(colors.green(`\n --- You can press the s key or the w key to restart! --- \n`));
});

