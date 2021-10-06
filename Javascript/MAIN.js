function Substitui(seu_array, ind, valor) {
	// Deleta o elemento do indice e substitui pelo valor
	seu_array.splice(ind, 1, valor) 

	return seu_array
}


document.addEventListener("DOMContentLoaded", function (){
	// VARIÁVEIS CONSTANTES 

	var layout = document.querySelector("#container-tela")

	var quant_x = undefined
	var quant_y = undefined
	
	var maca_x = undefined
	var maca_y = undefined

	var tecla = undefined
	var tecla_antiga = undefined

	var cobra = []

	// =======================================


	// FUNÇÕES USADAS NO CÓDIGO 

	// Tela
	function CriaGrid(larg_pixel) {

		// larg_pixel = 1 // 1 → 1rem 

		var larg = getComputedStyle(layout).width
		larg = Number(larg.substr(0, larg.length - 2)) / 16

		var alt = getComputedStyle(layout).height
		alt = Number(alt.substr(0, alt.length - 2)) / 16


		var coluna = "" // column
		for (var ix = 0; ix <= larg/larg_pixel - 1; ix++) {
			coluna += larg_pixel + "rem "
		}
		
		var eixo = "" // row (não tenho 100% de ctz da tradução)
		for (var iy = 0; iy <= alt/larg_pixel - 1; iy++) {
			eixo += larg_pixel + "rem "
		}

		layout.style.gridTemplateColumns = coluna
		layout.style.gridTemplateRows = eixo

		return [larg, alt] // Retorna quantos elementos no x e no y
	}

	// Cobra
	function DesenhaCobra(ID) {
		var parte = document.querySelector("#P"+ID)
		var pos = cobra[ID]

		x = pos[0]
		y = pos[1]

		parte.style.gridColumn = x + " / " + (x + 1)
		parte.style.gridRow = y + " / " + (y + 1)

	}

	function AddCobra(pos) {
		ID = cobra.length

		layout.innerHTML += "\
		<div \n \
			style='background-color:black' \n \
			id='P" + ID + "'> \n \
		</div>"

		cobra.push(pos)
		DesenhaCobra(ID)

	}

	function CobraInicial() {
		
		AddCobra([5, 8])
		AddCobra([4, 8])
		AddCobra([3, 8])
	}

	function DeletaTudo() {
		layout.innerHTML = ""
		cobra = []

		maca_x = undefined
		maca_y = undefined

		tecla = undefined
	}

	// Maçã
	function EscreveMaca() {
		layout.innerHTML += "\
		<div \n \
			style='background-color:red' \n \
			id='maca'> \n \
		</div>"
	}

	function AddMacaTela() {
		var sem_pos = true

		while (sem_pos) {
			maca_x = Math.ceil(Math.random() * quant_x)
			maca_y = Math.ceil(Math.random() * quant_y) 

			var falha = false
			for (var testes in cobra) {
				if (maca_x == cobra[testes][0] && maca_y == cobra[testes][1]) {
					falha = true
					break
				}
			}

			if (!falha) {sem_pos = false}
		}

		var parte = document.querySelector("#maca")

		parte.style.gridColumn = maca_x + " / " + (maca_x + 1)
		parte.style.gridRow = maca_y + " / " + (maca_y + 1)
	}

	// Movimentação
	function DetectaTecla() {

		if (tecla == undefined ) {
			tecla = event.keyCode
			tecla_antiga = tecla
		}
		else {
			tecla = event.keyCode

			if ((tecla == 39 && tecla_antiga == 37 || tecla == 37 && tecla_antiga == 39) || 
			(tecla == 38 && tecla_antiga == 40 || tecla == 40 && tecla_antiga == 38)) {
			tecla = tecla_antiga
			} 
			else {
				tecla_antiga = tecla
			}
		}
	}
	window.addEventListener("keydown", DetectaTecla)
	
	function AttPosicoes() {
		if (cobra.length > 1) {
			for (var ind = cobra.length - 1; ind > 0; ind--) {
				pos_corpo = cobra[ind]

				Substitui(pos_corpo, 0, cobra[ind - 1][0])
				Substitui(pos_corpo, 1, cobra[ind - 1][1])

				DesenhaCobra(ind)
			}
		}
	}

	function Movimenta() {
		if (tecla != undefined) {
			if (tecla >= 37 && tecla <= 40) { // Códigos das setinhas
				AttPosicoes()

				if (tecla == 37 || tecla == 39) { 
					var mod = (tecla == 39) * 2 - 1 

					// 37 → Esquerda == -1
					// 39 → Direita == 1

					cabeca = cobra[0]
					
					Substitui(cabeca, 0, cabeca[0] + mod)
					DesenhaCobra(0)

				}
				else if (tecla == 38 || tecla == 40) {
					var mod = (tecla == 40) * 2 - 1	

					// 38 → Cima == -1
					// 40 → Baixo == 1

					cabeca = cobra[0]
					
					Substitui(cabeca, 1, cabeca[1] + mod)
					DesenhaCobra(0)
				}
			}

			ColisCobra()
		}
	}

	// Colisões
	function ColisCobra() {
		var morto = false

		if (cobra[0][0] > quant_x || cobra[0][1] > quant_y || cobra[0][0] < 1 || cobra[0][1] < 1 ){
			morto = true
		}
		for (var ind in cobra) {
			if (ind > 0 && cobra[ind] == cobra[0]) {
				morto = true
			}
		}

		// Colisão com a maçã
		if (cobra[0][0] == maca_x && cobra[0][1] == maca_y) {
			AddMacaTela()
			
			AddCobra([0, 0])
			AttPosicoes()
			
			var string = ""
			for (var i in cobra) {
				string += cobra[i] + " || "
			}
			console.log(cobra.length - 1, "Cobra: " + string)


		}
		
		// Se for morto
		if (morto) {
			window.alert("Você perdeu!")
			
			DeletaTudo()

			CobraInicial()

			EscreveMaca()
			AddMacaTela()
		}
	}
	// =======================================


	var quantidades = CriaGrid(2) // Gera um grid dentro do layout

	quant_x = quantidades[0] / 2
	quant_y = quantidades[1] / 2

	CobraInicial()
	
	EscreveMaca()
	AddMacaTela()
	
	window.setInterval(Movimenta, 100)
})