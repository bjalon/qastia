
https://qastia.com/2018/10/18/montage-de-la-configuration-pour-le-machine-learning/

Montage de la configuration pour le machine learning
Non, je ne suis pas un gros gamer aimant faire scintiller ses LED dans la nuit. Je suis bien à la recherche de performance pour jouer à Quake (oui, j’ai de vieilles références) faire travailler un jeu de données sensible que je ne peux pas faire tourner sur Amazon.

La configuration que j’ai sélectionnée est celle qui est décrite [dans cet article](https://qastia.wordpress.com/2018/10/25/configuration-pour-le-machine-learning/).

Maintenant n’étant pas un fou furieux du montage voici, ce qui après coup m’aurait permis de mieux monter ma machine.

Ce qu’il faut prévoir
Une table bien stable et dégagée (j’ai travaillé par terre, ce n’est vraiment pas pratique),
Un jeu de tourne-vis très fin. Pour ma part, j’ai [acheté ce kit](https://www.amazon.fr/gp/product/B00V9SHQ2C/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1),
Bien séparer les accessoires de chaque composant au moment de l’ouverture de chaque boîte, ce sera plus facile pour retrouver les bonnes vis.
Montage de la carte mère
Il faut tout d’abord prévoir un endroit pour monter la carte mère. J’ai déchiré le film qui entourait la carte pour l’ouvrir en deux et j’ai posé dessus la carte mère que j’ai laissé dans son cocon en simili mousse noire.

J’ai commencé par installé le SSD MVNE. Pour cela, il faut
retirer le radiateur qui est entre la prise PCI et le socket du processeur avec le tourne-vis très fin.
insérer le SSD dans la nappe et le pousser pour qu’il soit collé au petit support rond.
utiliser la toute petite vis avec un embout bleu seule dans un petit sachet fourni par la carte-mère pour fixer le SSD sur ce support rond (la vis est toujours fournit par le constructeur de la carte mère),
retirer le film plastique bleu du radiateur,
refixer le radiateur.
Ensuite, j’ai installé les 4 barettes de DDR4,
J’ai installé le processeur sur son socket.
Il faut ensuite préparer le Water Cooling :

il faut mettre les deux attaches en forme de C ayant une vis à main et un ergo
et attacher le ventilateur Noctua en mode push et celui fournit par Coolmaster en pull.
Je prends un instant pour expliquer : les ventilateurs poussent l’air dans un sens (représenté par une flèche sur le côté et correspondant le plus souvent du côté où l’étiquette constructeur est). Pour rendre le refroidissement plus efficace, on m’a dit de faire du push/pull. C’est à dire que d’un côté du radiateur (celui côté intérieur de la tour), le ventilateur pousse (push) vers le radiateur et de l’autre côté le ventilateur tire (pull). Sur internet, les avis sont partagés, certains disent que le rendement de refroidissement avec uniquement un push est suffisant. De mon côté comme j’avais les ventilateurs, j’ai fait le push/pull.

Pour installer le Noctua, j’ai fait comme indiqué dans la notice, j’ai utilisé les vis du Water Cooling et non les tiges en plastique du Noctua.
Il reste maintenant à le fixer au processeur :

J’ai mis la pâte sur le processeur,
J’ai étalé avec une spatule bien propre la pâte surtout sans que cela déborde et pour qu’il y ait une très fine épaisseur (juste de quoi cacher la couleur métallique du processeur),
J’ai positionné le système de refroidissement sur le processeur en serrant les ergots sur les attaches prévues à cet effet.
Bon je me rend compte que ce serait mieux avec une vidéo, mais je ne me vois pas redémonter la machine pour vous montrer. Peut-être, si je refais une deuxième machine…

J’ai fixé la carte mère dans la tour
Je ne vous conseille pas de fixer tout de suite le radiateur du Water Cooling avec ses ventilateurs, car il va gêner pour la suite.
J’ai branché ensuite la carte graphique monstrueuse (j’avais souvenir des configurations dans les années 90, c’est pas la même chose… ). J’ai choisi le port PCI du bas car celui-ci laisse plus d’espace au centre.
Et j’ai commencé à mettre en place les ventilateurs :

J’ai démonté le ventilateur fourni par Fractal qui est au fond, à l’arrière et je l’ai mis en bas dans la position faisant entrer de l’air dans la tour
Je garde cet emplacement pour le radiateur du water cooling que j’attends de monter. Il faut que je garde l’espace accessible pour la nappe d’alimentation du CPU qui en dessous.
J’ai démonté la grille au-dessus. Il suffit d’appuyer sur le gros bouton derrière en haut et retirer le filtre, puis de retirer les 3 vis qui maintiennent la grille.
J’ai monté les 2 ventilateurs Noctua que j’avais et le ventilateur du Water Cooling sur la grille. J’ai collé les 3 ventilateurs, le plus en avant possible car derrière il y a le radiateur. Mais il faut aussi faire attention de laisser un petit centimètre devant car la cage du lecteur optique gênera. Je n’ai pas là non plus utilisé les tiges du Noctua, car elles auraient gêné la fermeture du boitier.
J’ai branché tous les ventilateurs sur le concentrateur de la tour se trouvant derrière la carte mère. Vous avez largement assez de connectiques pour tous les radiateurs. Faire attention au premier démarrage, il faudra quand même brancher un ventilateur sur le port d’alimentation noté FAN 1 de la carte mère (se trouvant à côté du processeur), sinon la carte mère refuse de démarrée.

Maintenant le bloc d’alimentation :

J’ai démonté la grille de support du bloc d’alimentation
Je l’ai fixée au bloc d’alimentation
Avant de fixer le bloc d’alimentation à la tour, il faut brancher tous les cables d’alimentation derrière. J’ai fixé donc derrière le bloc d’alimentation :
le cable d’alimentation 24 broches à brancher sur la carte mère
un cable PCI (c’est écrit dessus) en faisant attention à le brancher sur la prise prévue
2 cables CPU (faire aussi attention à la prise)
1 cable SATA. J’ai pris le plus long pour pouvoir brancher le concentrateur de ventilateurs et le disque dur (j’aurais peut-être dû prévoir deux cables SATA, mais tout semble bien fonctionner)
Il reste à fixer maintenant les alimentations. Sur la photo en haut, vous pouvez voir les passages de fil (je suis un peu fier) :

Le cable du CPU est sous le radiateur (c’est pour cela que je ne le fixe pas encore)
le cable de l’alimentation de le carte mère
le cable d’alimentation pour PCI vers la carte graphique
les petits fils pour les éléments de façade de la tour (power, reset, usb, led HD/Power)
et le gros fil pour les port USB. Pour lui, j’ai dû relâcher un peu de tension pour que je puisse atteindre sa nappe.
La fixation du disque dur nécessite de démonter le panneau où il y a écrit Fractal Design sur le côté gauche de la tour. Cela se fait avec des vis à main, donc rien de plus simple.

Ensuite retirer un support à disque blanc avec la vis à main (avec un tourne-vis, c’est serré comme une brute),
Mettre le petit rond en caoutchouc fourni par Fractal en face des trous du disque dur,
Fixer le disque avec des vis plates fourni par Fractal,
Remettre le support blanc dans son rail et le fixer,
Refermer le cache,
Ensuite brancher le cable SATA entre le HD et la carte mère fourni par Asrock,
Vous pouvez enfin fixer le radiateur. Et voilà, résultat des courses 2j de travail et un processeur qui ne prend par feu.

 
