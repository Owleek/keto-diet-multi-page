$(document).ready(function(){


	// =========================================== set mobile class for carousel


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
	let resumeCards = document.querySelectorAll('.resume-card');


	const UserData = function () {

		this.data = {
			gender: null,
			active: null,
			age: null,
			weight: null,
			height: null,
			new_weight: null,
		};

		this.handleChange = function (name, value) {
			if (name in this.data) {
				this.data[name] = value;

				for(let i = 0; i < resumeCards.length; i++) {
					calc(i, this.data);
					console.log(this.data);
				}
			}
		}
	};

	const data = new UserData();

	let gendorButtons = document.querySelectorAll('.start-screen__button');
  let activityArr = document.getElementsByName('activity');

	gendorButtons.forEach(function(item){
		item.addEventListener('click', function() {
			data.handleChange('gender', this.value);
		})
	})

  activityArr.forEach(function(item){
    item.addEventListener('change', function(){
      for(let i = 0; i < activityArr.length; i++) {
        activityArr[i].closest('.btn-row').classList.remove('active');
      }
			item.closest('.btn-row').classList.add('active');
			data.handleChange('active', this.value);
    })
	});
	
	function calc(item, data){
		let sex = data.gender;
		let age = data.age;
		let height = data.height;
		let weight = data.weight;
		let active = data.active;
		let new_weight = data.new_weight;
    let text_value = $(`.resume-card_${item} .resume-card__value`);
		let card = $(`.resume-card_${item}`);
		
		function removeCardClassIndex() {
			let maxIndexOfClasses = 10;
			for(let i = 0; i <= maxIndexOfClasses; i++) {
				card.removeClass(`class-${i}`);
			}
		}

		if(item == 1){
      let calc=Math.ceil((weight/((height/100)*(height/100)))*100)/100;
				
      if(calc <= 16){
				removeCardClassIndex();
        card.addClass(`class-1`);
        text_value.html('Выраженный дефицит массы тела');

      } else if (calc>16 && calc<=18.5){
				removeCardClassIndex();
        card.addClass(`class-2`);
        text_value.html('Недостаточная (дефицит) масса тела');

      } else if (calc>18.5 && calc<=24.99){
				removeCardClassIndex();
        card.addClass(`class-3`);
        text_value.html('Норма');

      } else if (calc>24.99 && calc<=35){
				removeCardClassIndex();
        card.addClass(`class-4`);
        text_value.html('Ожирение');

      } else if (calc>35){
				removeCardClassIndex();
        card.addClass(`class-5`);
        text_value.html('Ожирение резкое');
      }
        
		} else if (item == 2){
			//Метаболический возраст
      let mAge = '';
      
			if(sex == 1){
				mAge = Math.round(0.629 * age + 18.56);
			} else{
				mAge = Math.round(0.58 * age + 17.24);
      }

      if(mAge < 18) {
				removeCardClassIndex();
        card.addClass(`class-1`);
      } else if (mAge > 18 && mAge < 40) {
				removeCardClassIndex();
        card.addClass(`class-2`);
      } else if(mAge > 40) {
				removeCardClassIndex();
        card.addClass(`class-3`);
      }

      text_value.html(mAge + ' лет');

		} else if (item == 3){
			//Калории
      let call_from='';
      let call_to='';
      let call_arrow='';
      let bmr='';
      let amr='';
			if(sex == 1){
				bmr=88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
			}else{
				bmr=447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
			}
			if(active == 1){
				amr=1.2;
			}else if(active == 2){
				amr=1.375;
			}else if(active == 3){
				amr=1.55;
			}else if(active == 4){
				amr=1.725;
			}else if(active == 5){
				amr=1.9;
			}
			call_from=Math.round((bmr*amr)-(bmr*amr)*0.2);
			call_to=call_from+100;
      text_value.html(call_from+'-'+call_to);
      
		} else if (item == 4){
			//Вода
      let l='';

			if(weight>=90){
				if(active==1){
					l=3;
				}else if(active==2 || active==3){
					l=3.5;
				}else if(active==4 || active==5){
					l=3.9;
				}
			}else if(weight>=80){
				if(active==1){
					l=2.5;
				}else if(active==2 || active==3){
					l=2.9;
				}else if(active==4 || active==5){
					l=3.3;
				}
			}else if(weight>=70){
				if(active==1){
					l=2.3;
				}else if(active==2 || active==3){
					l=2.5;
				}else if(active==4 || active==5){
					l=3;
				}
			}else if(weight>=60){
				if(active==1){
					l=1.8;
				}else if(active==2 || active==3){
					l=2.3;
				}else if(active==4 || active==5){
					l=2.6;
				}
			}else if(weight>=50){
				if(active==1){
					l=1.5;
				}else if(active==2 || active==3){
					l=2;
				}else if(active==4 || active==5){
					l=2.3;
				}
			}
			text_value.html(l+ 'л');
		}else if(item==5){
			//Похудение в зонах
			//Нечего считать
		}else if(item==6){
			//Достижимый вес
				let good_weight='';
				// let libra=$('.block-diet-6__image span');
				let value=$('.block-diet-6__value');
				let label=" кг";
			if(weight>new_weight){
					let maxdown='';
				if(weight>=100){
					maxdown=8;
				}else if(weight>=70){
					maxdown=6;
				}else{
					maxdown=5;
				}
				if((weight-new_weight)<maxdown){
					good_weight=new_weight;
				}else{
					good_weight=weight-maxdown;
				}
			}else{
					let maxup=weight+weight/100*7;
				if(new_weight>=maxup){
					good_weight=maxup;
				}else{
					good_weight=new_weight;
				}
			}

			text_value.html(Math.round(good_weight)+label);
		}else if(item==7){
			//Мой вес
				let max_weight=250;
				let good_weight='';
				let label=" кг";

			if(weight>new_weight){
					let maxdown='';
					let dif=weight-new_weight;
				if(weight>=100){
					maxdown=8;
				}else if(weight>=70){
					maxdown=6;
				}else{
					maxdown=5;
				}
				if(dif<maxdown){
					good_weight=new_weight;
				}else{
					good_weight=weight-maxdown;
				}
			}else{
        let maxup=weight+weight/100*7;
				if(new_weight>=maxup){
					good_weight=maxup;
				}else{
					good_weight=new_weight;
				}
			}
			text_value.html(Math.round(good_weight)+label);
		} else if(item==8){
			//Кетогенная диета
			//Нечего считать 
		}
	}  

	let personData = document.getElementsByName('person-data');
	personData.forEach(function(item) {
		item.addEventListener('change', function(){
			if(item.id === "age") {
				data.handleChange('age', parseInt(item.value));

			} else if (item.id === "height") {
				data.handleChange("height", parseInt(item.value));
				
			} else if (item.id === "weight") {
				data.handleChange("weight", parseInt(item.value));
				
			} else if (item.id === "wish-weight") {
				data.handleChange("new_weight", parseInt(item.value));
				
			}
		});
	});
});