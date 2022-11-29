I) Serveur

Bonjour,

Cette Api à été réaliser grâce à Node.js.

Pour lancer cette api 

1) Dans un terminal tapez 'npm install'

2) Puis toujours dans ce terminal tapez 'nodemon server' ou 'node server'.

II) Routes

1) Route (POST) pour créer un compte :
http://localhost:3000/api/auth/signup

2) Route (POST) pour se connecter :
http://localhost:3000/api/auth/login

3) Route (POST) pour créer une sauce :
http://localhost:3000/api/sauces

4) Route (GET) pour récupérer toutes les sauces :
http://localhost:3000/api/sauces

5) Route (GET) pour récupérer une sauce grâce à son identifiant :
http://localhost:3000/api/sauces:id

6) Route (PUT) pour modifier une sauce selectionnée par son identifiant :
http://localhost:3000/api/sauces:id

7) Route (DELETE) pour supprimer une sauce selectionnée par son identifiant :
http://localhost:3000/api/sauces:id

8) Route (POST) pour ajouter des like ou des dislike :
http://localhost:3000/api/sauces:id/like
