# Puller la version 20 de Node.js si on veut mettre notre app en PROD on va ajouter `as builder`
# Du coup c'est pas cette image qu'on va créer un docker container et on va utiliser le nginx ci-dessous
FROM node:20

# Créer un dossier /app dans le conteneur
WORKDIR /app

# Installer git dans le container
RUN apt update && \
    apt install git -y

# J'ai ajouter le . parce que lorsqu'il va cloner le projet on va avoir cette arborécense
# app/eshop du coup on doit entrer dans le dossier eshop pour avoir le package.json
RUN git clone https://github.com/Balha147/eshop.git .


# Installer les dépendances
RUN npm install

# Exposer le port 4200 vu qu'on a utilisé le build on n'a pas besoin d'exposer le port
# Et on va ajouter `npm run build`
EXPOSE 4200

RUN npm run build

# Démarrer le serveur de développement Angular et se lier à 0.0.0.0
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

#NOTES

# Copier package.json pour installer les dépendances
# COPY package.json package-lock.json ./

# Copier tous les fichiers du projet dans le conteneur
# COPY . .
