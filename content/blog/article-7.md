https://qastia.com/2018/12/29/developper-nuxeo-sur-mac-os/

Développer Nuxeo sur Mac OS
Je reviens à mes anciennes amours : Nuxeo.

C’est la plateforme sur laquelle j’ai développé pendant plus de 7 ans mais que j’ai délaissée depuis plus de 3 ans.

Pour un de nos projet, nous devons développer une application impliquant cette plateforme. Je me retrouve donc à monter un nouvel environnement sur mon mac.

« Voici leurs histoires »

 

Installation des outils
BREW : Si vous n’avez pas encore installé brew, c’est le moment.
JAVA : Eh oui c’est ce vieux langage qui est utilisé par Nuxeo 😉 Java 8 minimum
ECLIPSE : Tout d’abord, il faut installer Intellij ou Eclipse. Je suis parti sur Eclipse car j’ai mes vieilles habitudes.
MAVEN : Nuxeo est écrit en java, c’est un passage obligé. un brew install maven devrait suffire. Vérifier dans une ligne de commande que mvn -version affiche bien la version de maven 3.3+
NODE/NPM : Il est possible d’utiliser brew, mais je conseille plus tôt la version officielle sur le site. Un paquet à télécharger, un double-click à effectuer, des suivants/suivants pour terminer. C’est fait ! Vérifier que l’appel npm -version affiche bien une version supérieure à 2.x.x
NUXEO-CLI : Nuxeo met gentiment à disposition un ensemble d’outils à destination des développeurs, notamment pour générer votre projet à base de template yeoman. Il suffit de lancer npm install -g nuxeo-cli
Voilà vous avez tout ce qui est nécessaire pour commencer à développer avec Nuxeo, nous allons pouvoir commencer.

Création du projet
Grâce à nuxeo-cli, cette étape est très simple. Beaucoup plus qu’à mon époque. Les archétypes maven étaient bien lourd et tout n’était pas templétisé. Ce temps est révolue.

Dans le terminal, créer un répertoire
Dans ce répertoire lancer la ligne de commande
nuxeo bootstrap
Pour les réponses suggérées, valider. Pour les autres mettre les noms qu’il vous convient.
Lancer un premier build maven :
mvn install
Générer les fichiers de description d’Eclipse avec le téléchargement des sources de Nuxeo :
mvn eclipse:clean eclipse:eclipse -DdownloadSources=true -DdownloadJavadocs=true -Declipse.useProjectReferences=true
Un problème ancestral qui ne semble toujours pas résolu par ce plugin fait pointer le répertoire de build maven et d’Eclipse dans le même répertoire. Il arrive alors parfois que des désynchronisations se produisent et tout devienne rouge sans raison (en fait, si, car ils travaillent tous les deux dans le même répertoire) apparente (ah voilà). Pour éviter cela, les développeurs Nuxeo, qui en ont eu assez de faire un mvn clean, ont mis un script à disposition pour configurer le répertoire de travail d’Eclipse à un autre endroit. Il suffit de lancer, toujours dans le répertoire la ligne de commande :
curl -o- https://raw.githubusercontent.com/nuxeo/nuxeo/master/fixeclipse|bash
Il ne reste plus qu’à lancer Eclipse et d’ouvrir le répertoire racine de votre projet.
Vous voilà fin prêt à développer sur la plateforme Nuxeo.

Attention, il faut utiliser le menu File > Open project from file system pour qu'Eclipse détecte les fichiers de description. Pour cela il faut ouvrir Eclipse sur un workspace avant.
Installation de Nuxeo
On va installer un serveur Nuxeo, sur lequel nous allons pouvoir travailler.

Je suis parti sur une VM plutôt qu’une installation directement sur le Mac car il y a un certain nombre de dépendances à installer qui risque de polluer mon mac.

Je ne pars par sur docker dans la phase de travail, la VM étant plus flexible pour moi.

Tout d’abord, il faut télécharger et installer Virtual box
Puis demander à Nuxeo de vous transmettre l’image Virtual Box de la dernière version LTS de la plateforme
Lancer VirtualBox et Importer un appareil virtuel… (j’adore les traductions)
Sélectionner le fichier se trouvant dans l’archive Nuxeo
C’est fait vous avez Nuxeo démarré sur votre poste. Dans L’interface de votre VirtualBox, vous avez l’URL d’accès.

Il faut enregistrer l’instance au près de Nuxeo pour pouvoir commencer, mais ce n’est pas obligatoire. Pour cela, il suffit d’aller dans la console VirtualBox et d’ouvrir une console Linux en faisant ALT+F2 :

Saisissez le login nuxeo et le mot de passe indiqué dans l’interface
Vous pouvez modifier le mot de passe en tapant passwd, mais attention à s’en souvenir ensuite.
Taper sudo apt-get update
Saisissez le mot de passe root (le même que Nuxeo initialement)
Taper sudo apt-get install vim (ce sera toujours utile)
Taper ensuite service nuxeo stop
Taper le mot de passe pour valider le droit d’arrêt du service
Aller dans le répertoire /etc/nuxeo et modifier le fichier vim nuxeo.conf en ajoutant à la toute fin du fichier :
# Initialisation
nuxeo.wizard.done=true
Taper enfin service nuxeo start pour relancer le service Nuxeo
Et voilà, vous avez un Nuxeo tout frais. Mais si vous vous connectez avec votre navigateur, vous n’aurez pas grand chose. Par contre avec un curl :

curl -X GET -u Administrator:Administrator http://ip.de.votre.machine/nuxeo/api/v1/path/default-domain/
Vous obtenez toutes les informations sur le document dont le path est /default-domain.

Pour plus d’information sur l’API Nuxeo, vous pouvez aller dans la documentation, elle est très riche.

Installer l’interface moderne
Il est possible d’utiliser Nuxeo uniquement en mode REST API. Si par contre vous avez besoin de l’interface, il suffit de faire la procédure suivante :

Dans le terminale de la VM, se connecter avec l’utilisateur nuxeo
Arrêter le serveur nuxeo (service nuxeo stop)
Lancer la commande suivante :
/var/lib/nuxeo/server/bin/nuxeoctl mp-install nuxeo-web-ui
Redémarrer le serveur nuxeo (service nuxeo start)
Et voilà, vous pouvez vous rendre sur la page indiquée par VirtualBox, vous avez un Nuxeo tout frais avec une interface web à base de web component, enfin je crois :).

Modifier le Context Path
Par défaut le serveur Nuxeo est servi de la manière suivante http://monServeur/nuxeo. Il est possible de changer le /nuxeo en ce que nous voulons, par exemple /quelleConnerieLaGuerreBarbara.

Pour cela il suffit de :

Arrêter le serveur (voir section installation de Nuxeo)
Modifier le fichier nuxeo.conf (voir section installation de Nuxeo) et d’ajouter les lignes suivantes à la toute fin du fichier :
# Changement du Context Path
org.nuxeo.ecm.contextPath=/quelleConnerieLaGuerreBarbara
nuxeo.url=http://localhost:8080/quelleConnerieLaGuerreBarbara
Aller dans le répertoire
/var/lib/nuxeo/server/templates/common-base/conf/Catalina/localhost/
renommer le fichier nuxeo.xml.nxftl comme suit
mv nuxeo.xml.nxftl quelleConnerieLaGuerreBarbara.xml.nxftl
redémarrer le service Nuxeo
modifier le fichier /etc/apache2/sites-available/nuxeo.conf
lancer la modification suivante (on utilise les regex pour modifier les nuxeo en ce que l’on désire :
:%s/nuxeo\([^_]\)/quelleConnerieLaGuerreBarbara\1/g
Relancer le service apache avec la commande service apache2 restart
