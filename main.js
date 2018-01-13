//on focusing the input elements
	$(document).ready(function () {
		$('.form-box').on('focus','input',function () {
			$(this).val("");
		});
	});

	$(document).ready(function () {
		var dec = $('.dec');
		var bin = $('.bin');
		var oct = $('.oct');
		var hex = $('.hex');
		//when any changes on .dec
		$('.form-box').on('keyup','.dec',function () {
			var res = [];
			var base = [2,8,16];
			var num = Math.abs(eval(parseInt($(this).val())));
			var wNum = Math.floor(num);
			var fNum = num -wNum;
			var i=0;
			//alert(fNum);
			var isFractional = (fNum > 0) ? true : false ;
			while(i < base.length)
			{
				if(isFractional)
				{
					res[i] = DTO(wNum,base[i],false) + '.' + DTO(fNum,base[i],true);
				}else
				{
					res[i] = DTO(wNum,base[i],false);
				}
				i++;
			}
				$('.bin').val(res[0]);
				$('.oct').val(res[1]);
				$('.hex').val(res[2]);
		});

		//when keyup on .bin
		$('.form-box').on('keyup','.bin',function () {


			var dec = OTD($(this).val(),2);
			$('.dec').val(dec);
			var res = [];
			var base = [8,16];
			var num = Math.abs(eval(dec));
			var wNum = Math.floor(num);
			var fNum = num -wNum;
			var i=0;
			//alert(fNum);
			var isFractional = (fNum > 0) ? true : false ;
			while(i < base.length)
			{
				if(isFractional)
				{
					res[i] = DTO(wNum,base[i],false) + '.' + DTO(fNum,base[i],true);
				}else
				{
					res[i] = DTO(wNum,base[i],false);
				}
				i++;
			}
				$('.oct').val(res[0]);
				$('.hex').val(res[1]);
		});
		//when keyup on .oct
		$('.form-box').on('keyup','.oct',function () {
			var dec = OTD($(this).val(),8);
			$('.dec').val(dec);
			var res = [];
			var base = [2,16];
			var num = Math.abs(eval(dec));
			var wNum = Math.floor(num);
			var fNum = num -wNum;
			var i=0;
			//alert(fNum);
			var isFractional = (fNum > 0) ? true : false ;
			while(i < base.length)
			{
				if(isFractional)
				{
					res[i] = DTO(wNum,base[i],false) + '.' + DTO(fNum,base[i],true);
				}else
				{
					res[i] = DTO(wNum,base[i],false);
				}
				i++;
			}
				$('.bin').val(res[0]);
				$('.hex').val(res[1]);
		});
		//when keyup on .hex
		$('.form-box').on('keyup','.hex',function () {
			var dec = OTD($(this).val(),16);
			$('.dec').val(dec);
			var res = [];
			var base = [2,8];
			var num = Math.abs(eval(dec));
			var wNum = Math.floor(num);
			var fNum = num -wNum;
			var i=0;
			//alert(fNum);
			var isFractional = (fNum > 0) ? true : false ;
			while(i < base.length)
			{
				if(isFractional)
				{
					res[i] = DTO(wNum,base[i],false) + '.' + DTO(fNum,base[i],true);
				}else
				{
					res[i] = DTO(wNum,base[i],false);
				}
				i++;
			}
				$('.bin').val(res[0]);
				$('.oct').val(res[1]);
		});
		//alert(display(DTO(0.0001,2,true)));
	});





	// this function convert decimal to othe number system
	function DTO(num,base,f) {
		var i=0;
		var a = [ ];
		if (f) 
		{
			while(i < 4 && num != 0)
			{
				res = num * base;
				var carry = Math.floor(res);
				a[i] = Math.floor(res);
				num = res - carry;
				i++;
			}
		}
		else{
			while(num >= base)
			{
				rem = num % base;
				a[i] = rem;
				num = Math.floor(num / base);
				i++;
			}
			a[i] = num;
			a.reverse();
		}
		if(base == 16)
		{
			for(i in a)
			{
				switch(a[i])
				{
					case 10:
						a[i] = 'A';
						break;
					case 11:
						a[i] = 'B';
						break;
					case 12:
						a[i] = 'C';
						break;
					case 13:
						a[i] = 'D';
						break;
					case 14:
						a[i] = 'E';
						break;
					case 15:
						a[i] = 'F';
						break;						
				}
			}
		}
		return display(a);
	}
	function display(arr) {
		var ans = ' ';
		for(i in arr)
		{
			ans = ans + arr[i];
		}
		//alert(ans);
		return ans;
	}




	// ODT function accept num as string or input of num should be string
	function OTD(num,base) {
		var str = [];
		str = (num).split("");	
		var wNum = [];
		var fNum = [];
		var i = 0;
		var f = false;
		var res = 0;
		var strLen = str.length;
		while(i < strLen)
		{
			if(str[i] == '.')
			{
				f = true;
				break;
			}
			if (base == 16) 
			{
				str[i] = isHexVal(str[i]);
			}
			wNum[i] = parseInt(str[i],10);
			i++;
		}
		//increment to skip the .
		i++;
		var j = 0;
		while(i < strLen)
		{
			if(base == 16)
			{
				str[i] = isHexVal(str[i]);
			}
			fNum[j] = parseInt(str[i],10);
			j++;
			i++;
		}
		if(f)
		{
			res = subOTD(wNum,base,false) + subOTD(fNum,base,true);
			return res;
		}
		else
		{
			res = subOTD(wNum,base,false);
			return res;
		}

	}

	//check for any alphabet and assign the it's value
	function isHexVal(ch) {
		switch(ch)
		{
			case 'A':
			case 'a':
				return '10';
				break;
			case 'B':
			case 'b':
				return '11';
				break;
			case 'C':
			case 'c':
				return '12';
				break;
			case 'D':
			case 'd':
				return '13';
				break;
			case 'E':
			case 'e':
				return '14';
				break;
			case 'F':
			case 'f':
				return '15';
				break;
			default :
				return ch;
		}
	}
	//alert(isHexVal('F'));


	//this converts the othe number system into decimal passing num as a array
	function subOTD(num,base,f) {
		var sum = 0,sub = 0;
		if(!f)
		{
			var i = 0;
			for(i in num.reverse())
			{
				subSum = num[i] * Math.pow(base,i);
				sum = sum + subSum;
				i++;
			}
			return sum;
		}
		else
		{
			var j = 1,i = 0;
			for(i in num)
			{
				subSum = num[i] * Math.pow(base, -j);
				i++;
				j++;
				sum = sum + subSum;
			}
			return sum;
		}

	}






















	//ading style and event
	$(document).ready(function () {
			$('.field-box').find('input').addClass('f-light');
			//$('.field-box').find('label').addClass('t-dark');
		$('.color-btn').on('click','i',function () {
			$(this).toggleClass('t-light')
			$('body').toggleClass('dark');
			$('.field-box').find('input').toggleClass('f-dark');
			$('.field-box').find('label').toggleClass('t-light');
			
		});
	});

