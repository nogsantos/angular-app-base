# Gerar os ambientes para desenvolvimento.
_VERSION := 0.1.0

all:
	@clear
	@echo ""
	@echo "  Ajuda "
	@echo ""
	@echo "  ‣ update: Atualiza o código pelo git"
	@echo "  ‣ commit: Após finalizar um release ou hotfix, envia as atualizações para o repositório remoto."
	@echo ""

update:
	@git pull
	@git checkout master
	@git pull
	@git pull --tags
	@git checkout develop

commit:
	@git push
	@git checkout master
	@git push
	@git push --tags
	@git checkout develop
