function onOpen() {
var ui = DocumentApp.getUi();
ui.createMenu('COLOQUE O NOME DO MENU')
.addItem('COLOQUE O NOME DA OPÇÃO 1 DO MENU', 'COLOQUE O NOME DA FUNÇÃO ATRELADA')
.addSeparator()
.addItem('COLOQUE O NOME DA OPÇÃO 2 DO MENU', 'COLOQUE O NOME DA FUNÇÃO ATRELADA')
.addToUi();
}
