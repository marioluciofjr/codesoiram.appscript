function inserirLinhaPontilhada() {
var doc = DocumentApp.getActiveDocument();
var body = doc.getBody();
var par = body.insertListItem(2,"").setText("Insira seu texto aqui .......................................................... pág nº");
}

function inserirLinhaTracejada() {
var doc = DocumentApp.getActiveDocument();
var body = doc.getBody();
var par = body.insertListItem(2,"").setText("Insira seu texto aqui ---------------------------------------------------------- pág nº");
}

function onOpen() {
var ui = DocumentApp.getUi();
ui.createMenu('Linhas')
.addItem('Linha Pontilhada', 'inserirLinhaPontilhada')
.addSeparator()
.addItem('Linha Tracejada', 'inserirLinhaTracejada')
.addToUi();
}
