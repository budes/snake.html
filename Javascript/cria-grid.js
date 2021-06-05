
// Cria a estrutura do grid baseado nos REMs

function CriaGrid() {
	var larg_pixel = 2 // 1 → 1rem 

	var layout = document.querySelector("#container-tela")

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
}
