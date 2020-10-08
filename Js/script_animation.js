const 
target = document.querySelectorAll('[data-anime]'),
animation_class = 'animate'

function debounce(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

function anime_scroll(){
    const window_top = window.pageYOffset + (window.innerHeight * 0.75)
    target.forEach((element)=>{
        if(window_top > element.offsetTop){
            element.classList.add(animation_class)
        }else{
            element.classList.remove(animation_class)
        }
    })
}
anime_scroll()
if(target.length){
    window.addEventListener('scroll',debounce(()=>{
        anime_scroll()
        console.log('pesadão')
    },30))
}
