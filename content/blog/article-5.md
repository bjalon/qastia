
https://qastia.com/2019/01/08/installer-fish-sur-mac-os/
    
Installer Fish sur Mac OS
Fish est un interpréteur bien puissant qui peut valoir le détour. Il est modulaire et il est possible d’installer différents modules. Je vous laisse juger :

Installation de fish
Fish est un terminal beaucoup plus puissant que celui de Mac OS (complétion, …). Vous pouvez ou ne pas l’installer :

brew install  fish : installe fish
sudo echo /usr/local/bin/fish >> /etc/shells : ajoute fish comme terminal disponible. Si Mac OS refuse :
faire un sudo nano /etc/shells, cela vous permet d’éditer le fichier avec les droits root (il faut saisir le mot de passe root, donc)
ajouter sur une nouvelle ligne : /usr/local/bin/fish
chsh -s /usr/local/bin/fish : Défini fish comme terminal par défaut
Entrer dans un session fish en tapant fish dans un terminal ou ouvrez un nouveau terminal.
Si vous voulez revenir à votre bon vieux bash :

chsh -s /bin/bash
Installation de fisher
Fisher est le npm ou le brew ou encore le apt-get de Fish. Bref c’est le gestionnaire de package de fish pour les béotiens.

Pour l’installer il suffit simplement de lancer :

curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs https://git.io/fisher
Par la suite, il suffira simplement de lancer la commande

fisher add <lePackage>
