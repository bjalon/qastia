https://qastia.com/2019/09/15/installation-des-outils-cuda-2080ti-ubuntu-18-04-3-linux-5-0-x/

Installation des outils Cuda – 2080Ti / Ubuntu 18.04.3 (linux 5.0.x)
Introduction
Je vous propose de vous faciliter votre vie si vous vous retrouvez comme moi avec une super configuration pour faire du deep learning ou machine learning mais que vous voulez le faire avec Ubuntu et si possible la dernière version.

Ce n’est pas compliqué, il faut juste faire les bonnes choses… Au début je voulais faire en utilisant les .run fournis par Nvidia et cela ne marche pas. Ceci est dû au fait que la version 18.4.3 introduit le kernel 5.0 de linux… Et patatra rien ne marche.

J’ai eu la flemme de downgrader en 18.4.1 pour que tout marche. En fait, il faut dans ce cas utiliser la version .deb des package. J’ai utilisé la version network, mais je vous laisse faire le test avec local, si vous le voulez.

Bref revenons sur la genèse… Au début, il y avait des dinosaures, ….

Configuration matériel
La configuration de mon PC est dotée d’une Geforce RTX 2080Ti (oui, je sais cela montre mon statut social :). Pour le reste, je pense que la carte mère et l’architecture choisie (AMD/Intel) n’a pas vraiment d’importance pour le reste de notre propos.

Installation du système
Comme je l’ai dit en introduction, j’ai installé un Ubuntu 18.04.3. Je pense que la démarche devrait marcher pour pas mal de version de Ubuntu à venir car c’est vraiment le passage au kernel 5.0.x qui a changé pas mal de choses…

Bizarrement, quand j’ai installé Ubuntu en configurant le réseau directement au moment de l’installation, il m’est impossible de me connecter à la fin de l’installation. Il semblerait qu’il y ait un problème à l’initialisation du service graphique (Nouveau, si j’ai bien compris). Car l’installer Ubuntu tente de récupérer des composant plus à jour durant l’installation.

J’ajoute qu’étant donné que je prévoie d’utiliser cette machine que pour du gros calcul, j’ai choisi la sélection de package minimale (pas de open office, blah blah).

J’ai cherché un peu à résoudre ce problème, puis j’ai finalement choisi de rejouer l’installation depuis le début sans configurer la connection réseau (j’ai débranché le cable Ethernet). Tout fonctionne bien à la fin.

Puis quand, l’installation a été terminée et que le système a redémarré, j’ai fait :

sudo apt-get update
sudo apt-get upgrade
Voilà, mon système qui est installé et maintenant à jour.

Installation du driver
Il est nécessaire de désactiver le driver libre fourni par défaut (appelé Nouveau) et d’enlever toute trace des anciens drivers potentiels installés.

Pour cela, il suffit de lancer les lignes de commandes suivantes :

sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt-get update
sudo apt-get purge "nvidia*"
sudo apt autoremove
sudo apt-get install nvidia-driver-440
sudo reboot -n
Vérification
Vérifier que la ligne de commande suivante retourne bien le driver NVidia :

sudo lshw -c video | grep 'configuration'
CUDA
Installation
Ma sélection de package minimale fait que certains composants dont je vais avoir besoin ne sont pas présents. Donc il faut les installer :

sudo apt-get install gcc make
Puis en suivant la documentation Nvidia :

Cliquer sur Linux / X86_64 / Ubuntu / 18.04 / deb (Network)
 Exécuter les lignes de commandes indiquées par le site excepté pour le package à installer… installer cuda-10-0 au lieu de cuda (version 10.1) !!!! Tous les outils ne sont pas encore alignés pour fonctionner avec cette dernière version du Framework. J’ai bien tenté de les faire fonctionner sans succès…
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin
sudo mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub
sudo add-apt-repository "deb http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/ /"
sudo apt-get update
sudo apt-get -y install cuda-10-0
Ceci installera donc le Toolkit Cuda complet. J’insiste sur le complet car j’ai cherché à installer les samples sans y parvenir… En fait c’est déjà dans le package cuda dans le répertoire /usr/local/cuda/bin/.

En post-installation penser à ajouter le répertoire bin dans votre path. Bizarrement, le deb ne le fait pas 😦 Il faut donc ajouter dans le .bashrc dans votre home :

# NVIDIA
export CUDA_HOME=/usr/local/cuda
export PATH=$CUDA_HOME/bin/${PATH:+:${PATH}}
export LD_LIBRARY_PATH=$CUDA_HOME/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
Remarque : Il est étrange car dans la documentation Nvidia, ils parlent d’ajouter également dans le PATH /usr/local/cuda/NsightCompute-2019.1. Mais je n’ai rien à cette adresse. Pour l’instant, je ne le mets pas tant que je n’ai pas résolu ce mystère…

Vérification
Maintenant vérifions que tout est bien installé :

sudo reboot -n
# vous me remercierez plus tard
cat /proc/driver/nvidia/version 
# will return the driver version

nvcc -V 
# will return the nvcc version

/usr/local/cuda/bin/cuda-install-samples-10.*.sh /tmp/samples
cd /tmp/samples/NVIDIA_CUDA-10.*_Samples/
make
# Really long build (16mn on my config)

./bin/x86_64/linux/release/deviceQuery
# Will return your device info

./bin/x86_64/linux/release/bandwidthTest
# Will return some performance of your device 

/bin/systemctl status nvidia-persistenced
# Should be started otherwise execute sudo /bin/systemctl enable nvidia-persistenced
Développer
Dans le package Cuda, il est fourni un plugin pour l’IDE Eclipse (C/C++). Pour l’installer, il suffit d’exécuter cette commande :

/usr/local/cuda/bin/nsight_ee_plugins_manage.sh install <eclipse-dir>
De plus, il est indiqué que pour développer, il faut les packages suivants d’installés (pour ma part, ils étaient déjà tous installés) :

sudo apt-get install g++ freeglut3-dev build-essential libx11-dev libxmu-dev libxi-dev libglu1-mesa libglu1-mesa-dev
Cudnn
Installation
Pour installer CUDnn :
wget "http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb"
sudo dpkg -i nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
sudo apt-get update
sudo apt-get install libcudnn7=7.6.3.30-1+cuda10.0 libcudnn7-dev=7.6.3.30-1+cuda10.0
reboot -n
Nous forçons la version de libcudnn 7.6.3.30-1+cuda10.0 en attendant que la version 10.1 soit mieux supportée par les frameworks, du moins pour l’installation.

Il semblerait en plus que la version de cuda-10.1 soit plus véloce… Ce sera à voir.

Vérification
sudo apt-get install git
git clone https://github.com/mmmn143/cudnn_samples_v7.git /tmp/cudnn
cd /tmp/cudnn/mnistCUDNN
make clean && make
./mnistCUDNN
# Test passed!
Pytorch
Prérequis
Il faut d’abord installer miniconda :

wget "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh"
chmod +x Miniconda3-latest-Linux-x86_64.sh
./Miniconda3-latest-Linux-x86_64.sh
Installation
conda create -n pytorch
conda activate pytorch
conda install pytorch torchvision cudatoolkit=10.0 -c pytorch
Vérification
Et dans une console python :

from __future__ import print_function
import torch
x = torch.rand(5, 3)
print(x)
torch.cuda.is_available()
Depuis un console :

cd /qastia/projects 
git clone https://github.com/pytorch/examples.git
cd examples/mnist
python main.py
 

Tensorflow
Il faut que Conda soit installé… Il suffit d’exécuter la documentation dans le chapitre précédent, si cela n’a pas été fait (par ce que vous n’aimez pas Pytorch).

conda create -n tensorflow
conda activate tensorflow
conda install tensorflow-gpu
Voilà !

Vérification
Dans une session python :

import tensorflow as tf 
hello = tf.constant("hello TensorFlow!") 
sess = tf.Session()
print(sess.run(hello))

