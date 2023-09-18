let HAUTEUR  = 700;
let LONGUEUR = 700;
let TAUX_BOMBE = 0.1;
let COTE = 20;


let canvas = document.getElementById('canvas');
let gc = canvas.getContext('2d');
let plateau = new Array();
let visible	 = new Array();
let gameOver = false;

function draw () {
	if(!gameOver){
		drawBackground();
		drawGrid();
	}
}

function setup() {
	for(let i = 0; i < (HAUTEUR-COTE)/(COTE+1); i++){
		plateau [i] = new Array();
		visible [i] = new Array();
		for (let j = 0; j < (LONGUEUR-COTE)/(COTE+1); j++) {
			if(Math.random() < TAUX_BOMBE)
				plateau[i][j] = 'B';
			visible[i][j]=false;
		}
	}
	calculeBombeVoisine();

	canvas.addEventListener("click",function(e){
		let x = parseInt((e.clientX-10)/(COTE+1),10);
		let y = parseInt((e.clientY-10)/(COTE+1),10);
		retournerCase(x,y);
		draw();
		if(plateau[x][y] == 'B')
			gameOver = true;
	});
}

function drawBackground () {
	gc.fillStyle = "#333333";
	gc.fillRect(0,0, HAUTEUR, LONGUEUR);	
}

function drawGrid () {
	for(let i = 0; i < (HAUTEUR-COTE)/(COTE+1); i++){
		for (let j = 0; j < (LONGUEUR-COTE)/(COTE+1); j++) {
			if(plateau[i][j] == 'B'){
				//Dessiner les bombes
				gc.fillStyle = "#aa3333";
				gc.fillRect(i*(COTE+1)+4,j*(COTE+1)+4,COTE,COTE);
				gc.fillText(plateau[i][j], i*(COTE+1)+4+4,j*(COTE+1)+4+17);
			} else {
				//Nombre de plateau autour
				gc.fillStyle = "#aaaaaa";	
				gc.font = "20px Arial";
				if(plateau[i][j] != 0)gc.fillText(""+plateau[i][j], i*(COTE+1)+4+4,j*(COTE+1)+4+17);
			}
			//Dessiner les cases
			gc.fillStyle = "#aaaaaa";
			if(!visible[i][j]) gc.fillRect(i*(COTE+1)+4,j*(COTE+1)+4,COTE,COTE);
		}
	}
}

function calculeBombeVoisine () {
	calculeCoin();
	calculeLigneHautBas();
	calculeColonneGaucheDroite();
	calculeCentre();
}

function calculeCoin () {
	let nbrDeBombe = 0;

	//Coin en haut à droite
	if(plateau[0][1] == 'B') nbrDeBombe++;
	if(plateau[1][0] == 'B') nbrDeBombe++;
	if(plateau[1][1] == 'B') nbrDeBombe++;

	plateau[0][0] = nbrDeBombe;
	nbrDeBombe = 0;

	//Coin en haut à gauche
	if(plateau[[parseInt((LONGUEUR-COTE)/(COTE+1), 10)-1]][0] == 'B') nbrDeBombe++;
	if(plateau[[parseInt((LONGUEUR-COTE)/(COTE+1), 10)  ]][1] == 'B') nbrDeBombe++;
	if(plateau[[parseInt((LONGUEUR-COTE)/(COTE+1), 10)-1]][1] == 'B') nbrDeBombe++;

	plateau[[parseInt((LONGUEUR-COTE)/(COTE+1), 10)]][0] = nbrDeBombe;
	nbrDeBombe = 0;

	//Coin en bas à droite
	if(plateau[0][parseInt((HAUTEUR-COTE)/(COTE+1), 10)-1] == 'B') nbrDeBombe++;
	if(plateau[1][parseInt((HAUTEUR-COTE)/(COTE+1), 10)-1] == 'B') nbrDeBombe++;
	if(plateau[1][parseInt((HAUTEUR-COTE)/(COTE+1), 10)  ] == 'B') nbrDeBombe++;

	plateau[0][parseInt((HAUTEUR-COTE)/(COTE+1), 10)] = nbrDeBombe;
	nbrDeBombe = 0;

	//Coin en bas à gauche
	if(plateau[[parseInt((LONGUEUR-COTE)/(COTE+1), 10)-1]][parseInt((HAUTEUR-COTE)/(COTE+1), 10)  ] == 'B') nbrDeBombe++;
	if(plateau[[parseInt((LONGUEUR-COTE)/(COTE+1), 10)  ]][parseInt((HAUTEUR-COTE)/(COTE+1), 10)-1] == 'B') nbrDeBombe++;
	if(plateau[[parseInt((LONGUEUR-COTE)/(COTE+1), 10)-1]][parseInt((HAUTEUR-COTE)/(COTE+1), 10)-1] == 'B') nbrDeBombe++;

	plateau[[parseInt((LONGUEUR-COTE)/(COTE+1), 10)]][parseInt((HAUTEUR-COTE)/(COTE+1), 10)] = nbrDeBombe;
	nbrDeBombe = 0;
}

function calculeLigneHautBas () {
	let nbrDeBombe = 0;

	for(let i = 1; i < (LONGUEUR-COTE)/(COTE+1)-1; i++){
		//Ligne Haut	
		if(plateau[i][0] != 'B'){
			if(plateau[i-1][1] == 'B') nbrDeBombe++;
			if(plateau[i  ][1] == 'B') nbrDeBombe++;
			if(plateau[i+1][1] == 'B') nbrDeBombe++;

			if(plateau[i-1][0] == 'B') nbrDeBombe++;
			if(plateau[i+1][0] == 'B') nbrDeBombe++;

			plateau[i][0]= nbrDeBombe;
			nbrDeBombe = 0;
		}
		//Ligne Bas
		if(plateau[i][parseInt((LONGUEUR-COTE)/(COTE+1), 10)] != 'B'){
			if(plateau[i-1][parseInt((LONGUEUR-COTE)/(COTE+1), 10)-1] == 'B') nbrDeBombe++;
			if(plateau[i  ][parseInt((LONGUEUR-COTE)/(COTE+1), 10)-1] == 'B') nbrDeBombe++;
			if(plateau[i+1][parseInt((LONGUEUR-COTE)/(COTE+1), 10)-1] == 'B') nbrDeBombe++;

			if(plateau[i-1][parseInt((LONGUEUR-COTE)/(COTE+1), 10)  ] == 'B') nbrDeBombe++;
			if(plateau[i+1][parseInt((LONGUEUR-COTE)/(COTE+1), 10)  ] == 'B') nbrDeBombe++;

			plateau[i][parseInt((LONGUEUR-COTE)/(COTE+1), 10)]= nbrDeBombe;
			nbrDeBombe = 0;
		}
	}
}

function calculeColonneGaucheDroite () {
	let nbrDeBombe = 0;

	for(let j = 1; j < (HAUTEUR-COTE)/(COTE+1)-1; j++){
		//Colone Gauche
		if(plateau[0][j] != 'B'){
			if(plateau[1][j-1] == 'B') nbrDeBombe++;
			if(plateau[1][j  ] == 'B') nbrDeBombe++;
			if(plateau[1][j+1] == 'B') nbrDeBombe++;

			if(plateau[0][j-1] == 'B') nbrDeBombe++;
			if(plateau[0][j+1] == 'B') nbrDeBombe++;

			plateau[0][j]= nbrDeBombe;
			nbrDeBombe = 0;
		}
		//Colone Droite
		if(plateau[parseInt((HAUTEUR-COTE)/(COTE+1), 10)][j] != 'B'){
			if(plateau[parseInt((HAUTEUR-COTE)/(COTE+1), 10)-1][j-1] == 'B') nbrDeBombe++;
			if(plateau[parseInt((HAUTEUR-COTE)/(COTE+1), 10)-1][j  ] == 'B') nbrDeBombe++;
			if(plateau[parseInt((HAUTEUR-COTE)/(COTE+1), 10)-1][j+1] == 'B') nbrDeBombe++;

			if(plateau[parseInt((HAUTEUR-COTE)/(COTE+1), 10)  ][j-1] == 'B') nbrDeBombe++;
			if(plateau[parseInt((HAUTEUR-COTE)/(COTE+1), 10)  ][j+1] == 'B') nbrDeBombe++;

			plateau[parseInt((HAUTEUR-COTE)/(COTE+1), 10)][j]= nbrDeBombe;
			nbrDeBombe = 0;
		}
	}
}

function calculeCentre () {
	let nbrDeBombe = 0;
	for(let i = 1; i < (HAUTEUR-2*COTE)/(COTE+1); i++){
		for (let j = 1; j < (LONGUEUR-2*COTE)/(COTE+1); j++) {
			if(plateau[i][j] != 'B'){
				if(plateau[i-1][j-1] == 'B') nbrDeBombe++;
				if(plateau[i  ][j-1] == 'B') nbrDeBombe++;
				if(plateau[i+1][j-1] == 'B') nbrDeBombe++;

				if(plateau[i-1][j  ] == 'B') nbrDeBombe++;
				if(plateau[i+1][j  ] == 'B') nbrDeBombe++;

				if(plateau[i-1][j+1] == 'B') nbrDeBombe++;
				if(plateau[i  ][j+1] == 'B') nbrDeBombe++;
				if(plateau[i+1][j+1] == 'B') nbrDeBombe++;

				plateau[i][j] = nbrDeBombe;
				nbrDeBombe = 0;
			}
		}
	}
}

function retournerCase (x,y){
	visible[x][y] = true;

	if(plateau[x][y] == 0){
		decouvrirAutour(x, y);
	}
}

function decouvrirAutour (x,y) {
	if(x-1>-1 && y-1 > -1 && x-1<parseInt((LONGUEUR-COTE)/(COTE+1), 10)+1&& y-1<parseInt((HAUTEUR-COTE)/(COTE+1), 10)+1&& !visible[x-1][y-1])retournerCase (x-1,y-1);
	if(x  >-1 && y-1 > -1 && x  <parseInt((LONGUEUR-COTE)/(COTE+1), 10)+1&& y-1<parseInt((HAUTEUR-COTE)/(COTE+1), 10)+1&& !visible[x  ][y-1])retournerCase (x,y-1);
	if(x+1>-1 && y-1 > -1 && x+1<parseInt((LONGUEUR-COTE)/(COTE+1), 10)+1&& y-1<parseInt((HAUTEUR-COTE)/(COTE+1), 10)+1&& !visible[x+1][y-1])retournerCase (x+1,y-1);

	if(x-1>-1 && y   > -1 && x-1<parseInt((LONGUEUR-COTE)/(COTE+1), 10)+1&& y  <parseInt((HAUTEUR-COTE)/(COTE+1), 10)+1&& !visible[x-1][y  ])retournerCase (x-1,y);
	if(x+1>-1 && y   > -1 && x+1<parseInt((LONGUEUR-COTE)/(COTE+1), 10)+1&& y  <parseInt((HAUTEUR-COTE)/(COTE+1), 10)+1&& !visible[x+1][y  ])retournerCase (x+1,y);

	if(x-1>-1 && y+1 > -1 && x-1<parseInt((LONGUEUR-COTE)/(COTE+1), 10)+1&& y+1<parseInt((HAUTEUR-COTE)/(COTE+1), 10)+1&& !visible[x-1][y+1])retournerCase (x-1,y+1);
	if(x  >-1 && y+1 > -1 && x  <parseInt((LONGUEUR-COTE)/(COTE+1), 10)+1&& y+1<parseInt((HAUTEUR-COTE)/(COTE+1), 10)+1&& !visible[x  ][y+1])retournerCase (x,y+1);
	if(x+1>-1 && y+1 > -1 && x+1<parseInt((LONGUEUR-COTE)/(COTE+1), 10)+1&& y+1<parseInt((HAUTEUR-COTE)/(COTE+1), 10)+1&& !visible[x+1][y+1])retournerCase (x+1,y+1);
}