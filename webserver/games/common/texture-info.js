import global from '../global'
class TextureInfo {
    constructor(textureJson, textureName) {
        console.log('new texture info');
        let json = global.resource[textureJson].data;
        let texturePos = json[textureName].textureRect;
     
        this.frame = {
            x: texturePos[0],
            y: texturePos[1],
            width: texturePos[2],
            height: texturePos[3]
        }
    }
}
export default TextureInfo