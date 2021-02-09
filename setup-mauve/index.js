'use strict';
const core = require('@actions/core');
const exec = require('@actions/exec');
const progressStream = require('progress-stream');
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const tar = require('tar');

let tempDirectory = process.env["RUNNER_TEMP"] || "";
const fileURL = 'http://darlinglab.org/mauve/snapshots/2015/2015-02-13/linux-x64/mauve_linux_snapshot_2015-02-13.tar.gz';//下载的文件地址

function download(url, pathname) {
    let file = path.join(pathname, path.basename(url));//下载保存的文件路径
    let tmp = file + ".tmp";//缓存文件路径

    //创建写入流
    const fileStream = fs.createWriteStream(tmp).on('error', function (e) {
        console.error('error==>', e)
    }).on('ready', function () {
        console.log("开始下载:", url);
    }).on('finish', function () {
        fs.renameSync(tmp, file);//下载完成后重命名文件
        console.log('文件下载完成:', file);
    });

    //请求文件
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Accept-Encoding': 'gzip, deflate'
        }
    }).then(res => {
        let fsize = res.headers.get("content-length");//获取请求头中的文件大小数据
        let str = progressStream({//创建进度
            length: fsize,
            time: 100 //ms
        });
        str.on('progress', function (progressData) {
            let percentage = Math.round(progressData.percentage);//不换行输出
            console.log('下载进度：%s%', percentage);//下载进度
        });
        res.body.pipe(str).pipe(fileStream);
    }).catch(err => {
        console.log(err);//自定义异常处理
    });
}

function unzip(file, pathname) {
    fs.createReadStream(file).pipe(
        tar.x({
            strip: 1,
            C: pathname
        })
    )
}

async function run() {
    try {
        const name = core.getInput('name');
        const args = core.getInput('args');
        core.info(`Use ${name} ...`);

        if (name == 'mauveAligner' || name == 'progressiveMauve') {
            console.log(tempDirectory);

            core.info('Download Mauve...');
            await download(fileURL, tempDirectory);
            core.info('End...');

            core.info('Unzip Mauve...');
            await unzip(path.join(tempDirectory, 'mauve_linux_snapshot_2015-02-13.tar.gz'), '/usr/local/mauve');
            core.info('End...')

            core.addPath("/usr/local/mauve/linux-x64");
            await exec.exec(`${name} ${args}`);
        } else {
            console.log(`Unspport ${name}..`)
        }

        core.setOutput('time', new Date().toTimeString());
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
