# **"La Esquina" Bakery**
### *Project of an e-commerce site for a *(fictional)* local bakery, made with the MERN stack*

![Screenshot](https://raw.githubusercontent.com/AugustoNicola/Panaderia-La-Esquina/produccion/screenshot.png)

<br>

### [README en español acá :argentina: :mexico:](https://github.com/AugustoNicola/Panaderia-La-Esquina/blob/produccion/README.md)

<br>

The online store is a Progressive Web App (PWA) which consists of two parts: the **frontend**, made with React; and the **backend**, which uses Node.js + Express.js and connects to MongoDB database.

Some funcionalities in the project are: product listing with search queries and filers, account managing, buying carts and payment integration using paypal.

<br />

# Installation and Local Usage
In order to configure the development enviroment, please follow these steps:

1. **Clone the repository and move to the target directory**
	
		$ git clone https://github.com/AugustoNicola/Proyecto-LaEsquina
		$ cd Panaderia-La-Esquina/
	
2. **Install the necessary dependencies**
		
		npm run install-all-dependencies

3. **Connect to the required services**  
	Create a `.env` file in the root directory of the project. This file holds the sensitive information needed for all services. Inside the file add the following fields:
	
		MONGODB_URL=your_own_mongodb_url
		SECRETO_TOKEN_ACCESO=your_own_access_secret
		SECRETO_TOKEN_REACCESO=your_own_relog_secret
	The `MONGODB_URL` field connects the app to your own cluster, whereas the `SECRETO`s *(secrets)* are used to verify user sessions, so any password will do (using a SHA256 hash is advised).

That's it, the project should be ready to boot!

<br />

## Commands

* `npm run client`: Starts the react client at `localhost:3000`
* `npm run node-server`: Starts the node backend at `localhost:5000`
* `npm run server`: Starts the node backend at `localhost:5000`, but using nodemon for debugging purposes
* `npm run dev`: Starts both the client and the backend
* `npm run server-install-dependencies`: Installs all backend dependencies
* `npm run client-install-dependencies`: Installs all client dependencies
* `npm run install-all-dependencies`: Installs all dependencies

<br />

# Contributing and License
This work is licensed under the [MIT License](https://choosealicense.com/licenses/mit/). **You are free to read, use or modify any part you want!**

Any contribution by submitting code, notifying bugs, suggestions or any other way is always greatly appreciated.

¡I hope you've liked my work! :+1: