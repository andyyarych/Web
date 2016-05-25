<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$outp = '[  {name:"Briarbridge Patrol",icon:"Briarbridge Patrol.png", desc:"Creature - Human Warrior", land:"Mana_G.png", price:0.09},'.
			'{name:"Furtive Homunculus",icon:"Furtive Homunculus.png", desc:"Creature - Homunculus", land:"Mana_U.png", price:0.02},'.
			'{name:"Gatstaf Arsonists",icon:"Gatstaf Arsonists.png", desc:"Creature - Human Werewolf", land:"Mana_R.png", price:0.02},'.
			'{name:"Heir of Falkenrath",icon:"Heir of Falkenrath.png", desc:"Creature - Vampire", land:"Mana_B.png", price:0.83},'.
			'{name:"Inspiring Captain",icon:"Inspiring Captain.png", desc:"Creature - Human Knight", land:"Mana_W.png", price:0.02},'.
			'{name:"Invocation of Saint Traft",icon:"Invocation of Saint Traft.png", desc:"Enchantment - Aura", land:"Mana_Mult.png", price:0.24} ]';
echo($outp);
?>