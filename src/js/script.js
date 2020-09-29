$(document).ready(function(){
  let target = document.querySelector('.resume__list');
  let query = window.matchMedia("(max-width: 1023px)");

  if(query.matches) {
    target.classList.add('owl-carousel');
    target.classList.add('owl-theme');
    target.setAttribute('id', 'werewolf');
  } else {
    target.classList.remove('owl-carousel');
    target.classList.remove('owl-theme');
    target.removeAttribute('id', 'werewolf');
  }
  // =========================================== set mobile class for carousel

  $('#werewolf').owlCarousel({  
    loop: false,
    margin: 10,
    autoHeight:true,
    responsiveClass:true,
    responsive:{
      0:{
          items:1, 
          nav:false,
          dots:true,
          loop:true
      },
      768:{
          items:2,
          nav:false,
          dots:true,
          slideBy:1,
          loop:true
      },
      915:{
        items:3,
        nav:false,
        dots:true,
        slideBy:1,
        loop:true
      }
    }
  });

  $('#carousel').owlCarousel({  
    loop: false,
    margin: 0,
    autoHeight:true,
    responsiveClass:true,
    responsive:{
      0:{
          items:1, 
          nav:false,
          dots:true
      },
      768:{
          items:2,
          nav:false,
          dots:true,
          slideBy:1,
          loop:false
      }
    }
  });
  // =========================================== Carousel EnD

  let activityArr = document.getElementsByName('activity');

  activityArr.forEach(function(item){
    item.addEventListener('change', function(){
      for(let i = 0; i < activityArr.length; i++) {
        activityArr[i].closest('.btn-row').classList.remove('active');
      }
      item.closest('.btn-row').classList.add('active');
    })
  });
  // =========================================== Toggle radio-buttons


  let infoBtns = document.querySelectorAll('.info-btn'); 

  infoBtns.forEach(function(item){
    item.addEventListener('click', function(){
      let parentsChildList =  Array.from(this.parentElement.children);
      parentsChildList.forEach(function(item){
        if(item.classList.contains('scene-info__text')) {
          item.classList.toggle('active');
        }
      });
    });
  })
  // =========================================== show info-text

  let btnAcept = document.querySelectorAll('.button_acept');

  btnAcept.forEach(function(item){        
    item.addEventListener('click', function(){
      this.classList.add('active');
    })
  });
  // =========================================== btn-active
  
});