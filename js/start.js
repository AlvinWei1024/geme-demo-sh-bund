//舞台
var Stage=function(){
	this.stage=$('<div></div>').addClass('stage stop').appendTo(document.body);
	this.build_elm=function(name){
		return $('<div></div>')
      .addClass(name)
      .appendTo(this.stage);
        
	}
	this.move_left=function(speed){
		var left=this.stage.css('background-position').substring(0,this.stage.css('background-position').indexOf('px'));
		var new_left=parseInt(left)-parseInt(speed);
		if(new_left<-2390){
			new_left=0;
		}
		this.stage.css('background-position',this.stage.css('background-position').replace(left,new_left));
	}
	this.move_right=function(){
		
	}
	this.stop=function(){
		
	}
    
}
//地板
var Ground=function(){
	this.ground = $('<div></div>').addClass('ground');
	this.move_left=function(speed){
		var left=this.ground.css('background-position').substring(0,this.ground.css('background-position').indexOf('px'));
		var new_left=parseInt(left)-parseInt(speed);
		if(new_left<-2390){
			new_left=0;
		}
		this.ground.css('background-position',this.ground.css('background-position').replace(left,new_left));
		
	}
	this.move_right=function(){
		
	}
	this.stop=function(){
		
	}
}
//角色
var People=function(){
    
    self=this;
    this.speed = 5;
    this.is_running = false;
    this.max_left=(384-36)/2;//屏幕中央
    this.left=this.max_left;
    this.role = $('<div></div>').addClass('role').css('left',this.left);
    
    this.move_left=function(){
    	self.role.removeClass('stop');
    	self.role.addClass('runleft');
    	
    }
    this.move_right=function(){
    	self.role.removeClass('stop');
		self.role.addClass('runright');
	}
	this.stop=function(){
		self.role.removeClass('runleft');
    	self.role.removeClass('runright');
    	self.role.addClass('stop');
	}
	this.pos=function(left){
		var left = left;
		if(left<0){
			left=0;
			$(document).trigger('left:disable');
		}
		else if(left>self.max_left){
			left=self.max_left;
			$(document).trigger('left:enable');
		}
		self.left=left;
		self.role.css('left',left);
		this.meet();
	}

	this.meet=function(){
		var girls = window.game.girl.roles;
		if(girls.length > 0){
			var g0 = girls[0];
			var girl_width=36,role_width=36;
			if(Math.abs(g0.data('left')-self.left)<=36){
				g0.removeClass('bye');
				g0.addClass('hello');
			}
			else{
				g0.removeClass('hello');
				g0.addClass('bye');
			}
		}
		
	}
}
//
var Girl=function(){
	// this.role=$('<div></div>').addClass('girl');
	this.roles=[];
	this.is_stop=true;
	this.generate_new=function(){
		var last_role = this.roles[this.roles.length - 1];
		var left;
		if(last_role){
			left = last_role.data('left') + (Math.random() * (600 - 250) + 250);
		}
		else{
    		left = 384 + (Math.random() * (600 - 250) + 250);//否则从屏幕外取
    	}
    	var girl = $('<div></div>').addClass('girl').css('left',left).data('left', left);
    	var talk = $('<div>Hi, Boy<a name="get_girl" href="http://github.com/alvinwei1024" target="_Blank">约走</a></div>').addClass('talk').appendTo(girl);
    	this.roles.push(girl);
    	$(document).trigger('girl:created',girl);//触发girl:created
	}
	this.draw=function(speed){
		if (this.is_stop){
			return;
		}
		for(girl in this.roles){
			var left = this.roles[girl].data('left') - speed;//人移动速度
			this.roles[girl].css('left', left).data('left', left);
		}
		if(this.roles.length>0){
			if (this.roles.length < 4){
				this.generate_new();
			}
			var girl0 = this.roles[0];
	        // 移除过时的girl
	      	if(girl0.data('left') < -50){
	      		girl0.remove();
	      		this.roles.splice(0,1);
	      	}  
		}
	}
	this.stop=function(){
		this.is_stop = true;
	}
	this.clear=function(){
		for(girl in this.roles){
			this.roles[girl].remove();
		}
    	this.roles = [];
	}
	this.start=function(){
		this.is_stop = false; 
    	this.generate_new();
  	}
}
//云
var Cloud=function(){
	this.is_stop=true;
	this.max_y_distance=100;
	this.min_y_distance=0;
	this.max_x_distance=150;
	this.min_x_distance=80;
	this.clouds=[];
	this.generate_new=function(){
		var top = Math.random() * (this.max_y_distance - this.min_y_distance) + this.min_y_distance;
		var left;
		last_cloud = this.clouds[this.clouds.length - 1];
		if(last_cloud){
			left = last_cloud.data('left') + (Math.random() * (this.max_x_distance - this.min_x_distance) + this.min_x_distance);
		}
    	else{
    		left = 100+ (Math.random() * (this.max_x_distance - this.min_x_distance) + this.min_x_distance);
    	}
    	var cloud = $('<div></div>').addClass('cloud').css({'left':left,'top':top}).data('left', left);
        this.clouds.push(cloud);
    	$(document).trigger('cloud:created',cloud);//触发cloud:created
	}
	this.draw=function(){
		if (this.is_stop){
			return;
		}
		for(cloud in this.clouds){
			var left = this.clouds[cloud].data('left') - 1;//云移动速度
			this.clouds[cloud].css('left', left).data('left', left);
		}
		if(this.clouds.length>0){
			if (this.clouds.length < 15){
				this.generate_new();
			}
			var cloud0 = this.clouds[0];
	        // 移除过时的云朵
	      	if(cloud0.data('left') < -100){
	      		cloud0.remove();
	      		this.clouds.splice(0,1);
	      	}  
		}
	}
	this.stop=function(){
		this.is_stop = true;
	}
	this.clear=function(){
		for(cloud in this.clouds){
			this.clouds[cloud].remove();
		}
    	this.clouds = [];
	}
	this.start=function(){
		this.is_stop = false; 
    	this.generate_new();
  	}
}



var Game=function(){
	this.stage=new Stage();
	this.ground=new Ground();
	this.people=new People();
	this.girl=new Girl();
	this.cloud=new Cloud();
	var self=this;
	this.stage.build_elm('arrow-left');
	this.stage.build_elm('arrow-right');
	this.stage.build_elm('start-message').html('今天天气不错，赶快游外滩，我们一起约妹子去吧~~');
	this.ground.ground.appendTo(this.stage.stage);
	this.people.role.appendTo(this.stage.stage);
	this.start=function(){
		$(document).on('cloud:created', function(evt, elem){
			self.stage.stage.append(elem);
		});
		$(document).on('girl:created', function(evt, elem){
			self.stage.stage.append(elem);
		});
		$(document).on('left:disable', function(evt){
			self.stage.stage.removeClass('left-enable');
			self.stage.stage.addClass('left-disable');
		});
		$(document).on('left:enable', function(evt){
			self.stage.stage.removeClass('left-disable');
			self.stage.stage.addClass('left-enable');
		});

		this.cloud.start();
		this.girl.start();
		setInterval(function(){
			self.cloud.draw();
		},100);
		$(document).on('keydown',function(){
	    	if (event.keyCode == 37||event.keyCode == 33){
	    		self.people.move_left();
	    		self.people.pos(self.people.left-=self.people.speed);
	    		self.stage.stage.removeClass('stop');
				self.stage.stage.addClass('running');
	    	} 
	    	else if (event.keyCode == 39||event.keyCode == 34){
	    		self.people.move_right();
	    		self.people.pos(self.people.left+=self.people.speed);
	    		if(self.people.left>=self.people.max_left){
	    			
	    			self.girl.draw(self.people.speed)
		    		self.stage.move_left(self.people.speed);
		    		self.ground.move_left(self.people.speed)
	    		}
	    		self.stage.stage.removeClass('stop');
				self.stage.stage.addClass('running');
	    	}
	    })
	    $(document).on('keyup',function(){
	    	self.people.stop();
	    })
	}
	
}





var game=new Game();
game.start();