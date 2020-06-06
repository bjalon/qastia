https://qastia.com/2019/01/08/executer-plusieurs-interpreteurs-python-sur-mac-os/

Exécuter plusieurs interpréteurs python sur Mac OS
Cet article s’inspire fortement de l’article se trouvant ici. Merci Eduardo García pour son aide. Quelques manques sont à noter, notamment autour de l’installation de fish.

Pourquoi c’est utile ? Même si vous n’utilisez qu’une seule version de python, Mac OS protège comme un père son bébé l’interpréteur qui est installé par défaut par le système. C’est à dire qu’il est inaltérable (même avec les droits root).

Donc, si comme moi, vous avez été confronté au Permission denied à chaque fois que vous avez utilisé pip, cet article est pour vous.

Nettoyage de printemps
Bon, il faut retirer toutes vos tentatives veines avant tout chose :

si vous avez installé un nouvel interpréteur avec brew :
brew uninstall --ignore-dependencies python
si vous n’avez pas installé brew (qui serait une erreur) ou si vous n’avez pas installé python avec brew, c’est normal vous aurez une erreur.

si vous avez installé anaconda (which python vous dira si c’est le cas), il faut retirer tous les vestiges de ce passé glorieux :
retirer dans la ~/.bashrc ou ~/.profile toute référence au Path anaconda
rm -rf ~/anaconda3/
rm -rf ~/.conda/
rm -rf /anaconda3/
Voilà vous avez un Mac OS vierge d’interpréteur python barbare (il ne reste que celui du système konpeutpasmodifier)

Installation de PyEnv
Et voilà la formule magique

Je vous l’ai déjà dit… Il faut installer brew ! C’est un peut le apt-get de Mac OS, c’est indispensable.
brew update : pour la mise à jour de la liste des paquets disponibles
brew install pyenv : installe pyenv
pyenv install -l : cela liste tous les interpréteurs disponibles
pyenv install 3.6.4 : pour installer python 3.6.1… Non je déconne le 3.6.4
pyenv install  2.7.14 : pour installer un deuxième interpréteur
pyenv versions : liste les versions d’interpréteur que vous avez installées.
pyenv global 3.6.4 : pour définir par défaut l’interpréteur 3.6.4
pyenv local 2.7.14 dans un répertoire contenant un projet nécessitant une version particulière de python. Cela crée un fichier .python-version dans le répertoire indiquant la version à utiliser. Donc si vous exécutez un script dans ce répertoire, il utilisera la version de python indiquée, sinon la version par défaut sera utilisée.
Remarque :

si à l’installation d’un interpréteur python vous avez l’erreur Error: can’t decompress data; zlib not available :
installer avec brew :
brew install readline xz 
ou update si leur version est trop ancien
brew reinstall xz readline
installer xcode : xcode-select –install
Installation de fish
Fish est un terminal beaucoup plus puissant que celui de Mac OS (complétion, …). Vous pouvez ou ne pas l’installer :

brew install  fish : installe fish
sudo echo /usr/local/bin/fish >> /etc/shells : déclare le script fish comme terminal disponible. Si Mac OS refuse :
faire un sudo nano /etc/shells, cela vous permet d’éditer le fichier avec les droits root (il faut saisir le mot de passe root, donc)
ajouter sur une nouvelle ligne : /usr/local/bin/fish
chsh -s /usr/local/bin/fish
Entrer dans un session fish en tapant fish dans un terminal ou ouvrez un nouveau terminal,
curl -Lo ~/.config/fish/functions/fisher.fish –create-dirs https://git.io/fisher
Encore merci à Eduardo García…
