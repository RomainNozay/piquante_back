I) Serveur
Mettre  les informations pour les variables d'environnement (base de donnée MongoDB Atlas)

Pour lancer le server : `nodemen server`

II)Routes

1)Route (POST) pour créer un compte
http://localhost:3000/api/auth/signup

2)Route (POST) pour se logger
http://localhost:3000/api/auth/login

3)Route (POST) pour créer une sauce
http://localhost:3000/api/sauces

4)Route (GET) pour récupérer toutes les sauces
http://localhost:3000/api/sauces

5)Route (GET) pour récupérer une sauce grâce à son identifiant
http://localhost:3000/api/sauces:id

6)Route (PUT) pour modifier une sauce selectionnée par son _id
http://localhost:3000/api/sauces:id

