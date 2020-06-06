https://qastia.com/2019/09/15/installer-un-serveur-git-sur-votre-synology/


Installer un serveur Git sur votre Synology
Vous êtes parano, vous travailler pour la NSA et votre projet concerne les écoutes téléphoniques de la planète… Ce tutoriel est pour vous.

Je n’ai pas précisé, il faut aussi avoir une rémunération conséquente ou que vos notes de frais ne soient pas limitée : il faut acheter un Synology et mettre des disques dedans.

Par contre après vous aller pouvoir :

sauvegarder vos ordinateurs en toute sérénité
mettre toute votre vie numérique dans un coffre fort visible que par vous (j’oublie les backdoors probables, mais faisons abstraction de ces bassesses…)
et surtout vous faire un repo local répliqué autant de fois que de réplication que vous avez configuré dans votre Synology.
J’aime beaucoup GitHub mais pour des projets personnel un peu sensible, je ne préfère pas mettre tout ça sur le net.

Après cette merveilleuse introduction voici la procédure :

Dans le gestionnaire de paquet, recherche git-server. Il est possible d’installer un gitlab mais je ne veux pas spécialement tout l’armada nucléaire associé (gestionnaire de tâches, wiki, …). Je veux juste pouvoir avoir un repo distant sécurisé
Installer le paquet
Ensuite ouvrir le File Station
Créer un dossier partagé. Alors là faites attention… Il y semble y avoir un problème si on chiffre le dossier. Je me suis pris une erreur de permission denied. J’ai passé un temps fou à comprendre. Donc voici, ce que j’ai sélectionné et qui marche
Créer dossier partagé
Ne pas cocher : Cacher ce dossier partagé…
Vous pouvez cocher : Masquer les sous-dossiers…
Ne pas cocher : Chiffre ce dossier partagé
