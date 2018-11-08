if (process.argv.length < 3) {
    return
}
let gamePath = process.argv[2];
let plistPath = gamePath + '/images/';
const fs = require('fs');
var parseString = require('xml2js').parseString;
//toJson第二个参数options如下：
const files = fs.readdirSync(plistPath);
let plistList = [];
files.forEach((v, k) => {
    if (v.indexOf('.plist') !== -1) {
        plistList.push(v);
    }
})
let getStringInfo = function (key, string) {
    let test = /{{/;
    console.log('test  = ', test.test(string));
    let numList = [''];

    for (let i = 0; i < string.length; i++) {
        if (/[0-9]/.test(string[i])) {
            // numList[numList.length - 1] += string[i];
            numList[numList.length - 1] += string[i];
        } else {
            numList.push('')
            // numList.push('');
            // string = string.substring(i, string.length);
        }
    }

    for (let i = numList.length - 1 ; i >=  0; i --){
        if (numList[i]=== ''){
            numList.splice(i, 1);
        }else{
            numList[i] = Number(numList[i]);
        }
    }
    console.log('num = ' , numList);


    // console.log('pos str = ' + posStr);
    let str = '    "' + key + '"' + ":" + JSON.stringify(numList);
    return str;
}
let getPosJson = function (name, data) {
    let keys = data.key;
    let stringList = data.string;
    let stringPos = '';
    for (let i = 0; i < keys.length; i++) {

        if (i !== 0 && i !== keys.length - 1) {
            let key = keys[i];
            let string = stringList[i - 1];
            let stringInfo = getStringInfo(key, string);
            console.log('string info\n', stringInfo);
            stringPos += stringInfo + ',' + '\n';
        }
    }
    stringPos = stringPos.substring(0, stringPos.length - 2);

    return '"' + name + '"' + ':{\n'  +stringPos + "}"
    console.log('string pos =\n ', stringPos);
}
const writeJsToLocal = function (filePath, plistFileName) {
    fs.readFile(filePath, 'utf-8', function (err, result) {
        parseString(result, (err, data) => {
            let dict = data.plist.dict[0].dict[0];
            let contentStr = "";
            console.log('frame dice = ', dict)

            for (let i = 0; i < dict.key.length; i++) {
                // let name = dict.key[i];
                // console.log('name = ' + name);
                // let dictDict = dict.dict[i];
                // console.log('dict dict ', dictDict);

                let posInfo = getPosJson(dict.key[i], dict.dict[i]);
                console.log('pos info', posInfo);
                contentStr += '  ' + posInfo + ',\n';
            }
            // for (let i = 0; i < dict.length; i++) {
            //     let frame = dict[i];
            //     let frameDict = frame.dict;
            //     console.log('frame dict = ', frameDict);
            // }
            // for (let i = 0; i < dict.length; i++) {
            //     let frame = dict[i];
            //     let frameDict = frame.dict;
            //     console.log('frame dict = ' , frameDict);
            //     // for (let j = 0 ; j < frameDict[0].key.length ; j ++){
            //     //     let name = frameDict[0].key;
            //     //     console.log('name = ' + name);

            //     // }

            //     // let nameKeys = frame.dict[0].key;
            //     // console.log('name keys = ' , frame.dict[0].key);
            //     // for (let j = 0 ; j < frame.dict.length ; j ++){
            //     //     let frameDict = frame.dict[j];
            //     //     console.log('frameDict = ' , frameDict);
            //     //     // getPosInfo(j, frameDict.dict);
            //     //     // getName(j, frameDict.key);




            //     // }
            //     // for (let j = 0; j < nameKeys.length; j++) {
            //     //     let str = nameKeys[j];
            //     //     if (str.indexOf('.png') !== -1) {
            //     //         let name = str.substring(0, str.length - 4);
            //     //         // obj[name] = str;
            //     //         contentStr =   contentStr + '    ' + '"' + name + '"' + ': ' + '"' + str + '"' + ',' + '\n';
            //     //     }
            //     // }
            // }
            let endStr = "{\n" + contentStr.substring(0, contentStr.length - 2) + " \n}"
            fs.writeFile(plistPath + '/' + plistFileName + '.json', endStr, () => {
                console.log('写入成功');
            })
        })
    });
}
for (let i = 0; i < plistList.length; i++) {
    let plist = plistList[i];
    let plistFileName = plist.substring(0, plist.length - 6);
    writeJsToLocal(plistPath + plist, plistFileName);
}



