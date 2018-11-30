import gameContent from './game-content'
window.onload = function(){
    console.log('window load');
    gameContent.showApp();
    gameContent.showGame('cut-fruit');
}