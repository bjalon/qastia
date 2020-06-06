
https://qastia.com/2019/01/11/executer-plusieurs-versions-de-python-sur-ubuntu/

Exécuter plusieurs versions de Python sur Ubuntu
Comme l’article que nous avons vu sur l’exécution de plusieurs versions de python sur Mac OS, voici l’adaptation pour Ubuntu.

Nettoyage de printemps
Tout comme pour Mac OS, il faut retirer tout interpréteur pirate :

apt-get uninstall python
dans le fichier ~/.bashrc supprimer toute référence à Anaconda
Installation
Il est proposé un installer dans GitHub. Il est conseillé de le builder directement depuis les source :

il faut d’abord installer les dépendances :
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev python-openssl
Ensuite, il est possible d’installer pyenv
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
On peut alors installer un interpréteur
pyenv install 3.6.4
Pour le reste, je vous laisse lire l’article sur Mac OS, les appels pyenv sont les mêmes.
