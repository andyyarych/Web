
"use strict";

// hide local variables scope
(function()
{
	// jQuery-style notation
	var $ = function (a) { return document.getElementById(a);}
	
    //var h = Math.floor( Math.min( window.innerWidth, screen.availHeight) * 0.75);
    //$("itemcontainer").innerHTML = '<hr><div class="w3-row"><div class="w3-col" style="height:'+h+'px"><h3>Loading...</h3></div></div>';
    var myitems = [];

 
	var calculatePrice = function()
	{
		 var price = 0;
		 var atLeastOneIsSelected = false;
		 for(var i in myitems)
		 {
			 var checkid = "itemcheck_"+i;
			 var count = $("itemcount_"+i).value;

			 if ($(checkid).checked) { price += myitems[i].price * count; atLeastOneIsSelected = true; }
		 }
		 return [price, atLeastOneIsSelected];
	}
 
    var selection_change_f = function()
    {
		var price = calculatePrice();// [price, is_selected]
		$("totalprice").innerHTML = "Total price = $" + price[0].toFixed(2);
		$("buybutton").disabled = !price[1];
    }
	
	$("buybutton").onclick = function()
	{
		$('dialogprice').innerHTML = calculatePrice()[0].toFixed(2);
		$('buydialog').style.display='block';
	}

    var updateContentF = function()
    {
        var itemcontainer = $("itemcontainer");
        itemcontainer.appendChild(document.createElement('hr'));

        for(var i in myitems)
        {
            var item = myitems[i];
            item.price = Number.parseFloat(item.price); // make sure it is a number
			
			var count = "itemcount_"+i;
            var nameid = "itemname_"+i;
            var textid = "itemtext_"+i;
            var checkid = "itemcheck_"+i;
     
            var div = document.createElement('div');
            div.className = "w3-row";
            div.innerHTML = '<div class="w3-col s3 m2"><img src="' + item.icon + '" style="width:100%"></img></div>' +
                            '<div class="w3-col s9 m5 w3-container"><h3 id="' + nameid + '"></h3>' + 
							'<div class="w3-col s6 m4 w3-container"><p id="' + textid + '"></p></div>'+
							'<div class="w3-col s6 m8 w3-container"><img src="' + item.land + '" style="width:52px;height:52px;"></div>'+
							'</div>' +
							'<div class="w3-col s3 m2 w3-container"><h3 style="text-align:right;"><small>Ціна:</small></h3><h3 style="text-align:right;"><small>Кількість:</small></h3></div>' +
							'<div class="w3-col s9 m3 w3-container">' + '<h3><input id="' + checkid + '" type="checkbox"></input>&nbsp;<small>$' + item.price + ' </small> </h3>'+
							'<div class="w3-col s12 m12 w3-container"><input class="w3-input w3-border w3-round-large" id="' + count + '" type="text" size="5"></input></div>'+
							'</div>';
			
            itemcontainer.appendChild(div);
            itemcontainer.appendChild(document.createElement('hr'));

            $(nameid).appendChild(document.createTextNode(item.name));
            $(textid).appendChild(document.createTextNode(item.desc));
            $("itemcheck_"+i).onchange = selectionChangeF;
			$("itemcount_"+i).onchange = selectionChangeF;
        }

        selectionChangeF();
    }
     
     	var xmlhttp = new XMLHttpRequest();
        var url = "shop2.php";
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4)
            {
                if (xmlhttp.status == 200)
                {
                    myitems = JSON.parse(xmlhttp.responseText);
                    updateContentF();
                }
                else
                {
                    alert("Немає доступу до сервера, загружається стандартний контент!");
                    var myitems = [ {name:"Briarbridge Patrol",icon:"Briarbridge Patrol.png", desc:"Creature - Human Warrior", land:"Mana_G.png", price:0.09},
						{name:"Furtive Homunculus",icon:"Furtive Homunculus.png", desc:"Creature - Homunculus", land:"Mana_U.png", price:0.02},
						{name:"Gatstaf Arsonists",icon:"Gatstaf Arsonists.png", desc:"Creature - Human Werewolf", land:"Mana_R.png", price:0.02},
						{name:"Heir of Falkenrath",icon:"Heir of Falkenrath.png", desc:"Creature - Vampire", land:"Mana_B.png", price:0.83},
						{name:"Inspiring Captain",icon:"Inspiring Captain.png", desc:"Creature - Human Knight", land:"Mana_W.png", price:0.02},
						{name:"Invocation of Saint Traft",icon:"Invocation of Saint Traft.png", desc:"Enchantment - Aura", land:"Mana_Mult.png", price:0.24} ]
                    updateContentF();
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send(); 
})();