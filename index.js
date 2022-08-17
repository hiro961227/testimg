const html = document.documentElement;
const canvas = document.getElementById("meonji");
const context = canvas.getContext("2d");
var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

const frameCount = 670;
const currentFrame = index => (
  `./img/meonji_img${index.toString().padStart(5, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
if(mobile){
    console.log('mobile')
    const displayWidth  = canvas.clientWidth *2;
    const displayHeight = canvas.clientHeight *2;

    canvas.width= displayHeight;
    canvas.height= displayWidth;
}else{
    console.log('pc')
    canvas.width=720;
    canvas.height=1280;
}
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()
