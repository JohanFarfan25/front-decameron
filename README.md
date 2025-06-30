# 🏨 Front Decameron

Este es el frontend del proyecto Decameron, hecho con React + Vite.  
A continuación encontrarás una guía paso a paso para ponerlo a funcionar en tu computador, como si te lo explicara tu abuelita 👵.

---

## 🧰 Requisitos antes de comenzar

### 1. Tener instalado **Node.js** y **npm**

📦 Node.js es lo que hace funcionar el proyecto.  
🛍️ npm es el gestor de herramientas (dependencias) del proyecto.

🔗 Descárgalo desde aquí: [https://nodejs.org/](https://nodejs.org/)  
> Elige la **versión LTS** ("Recommended for most users").

Después de instalarlo, abre una terminal y verifica que estén funcionando:

```bash
node -v
npm -v
```

---

## 🚀 Instrucciones paso a paso para ejecutar el proyecto

### 1. Abrir la terminal

- En **Windows**: abre “CMD” o “Símbolo del sistema”.
- En **Mac**: abre “Terminal”.
- En **Linux**: abre tu terminal favorita.

### 2. Clonar el repositorio (traer el proyecto a tu computador)

```bash
git clone https://github.com/JohanFarfan25/front-decamero.git
```

### 3. Entrar a la carpeta del proyecto

```bash
cd front-decamero
```

### 4. Instalar las dependencias

```bash
npm install
```

📝 Este paso descarga todas las herramientas necesarias para que funcione el proyecto.  
Puede tardar unos minutos dependiendo de tu conexión a internet.

### 5. Crear el archivo `.env`

Este archivo guarda configuraciones del entorno. Vamos a copiar el ejemplo:

```bash
cp .env.example .env
```

🛠️ Luego abre el archivo `.env` y edita esta línea si es necesario:

```env
VITE_API_URL=http://localhost:8000
```

🔁 Cámbiala si tu backend está en otra URL o en producción.

### 6. Iniciar el proyecto

Ahora vamos a levantar el proyecto en modo desarrollo:

```bash
npm run dev
```

Verás un mensaje como este:

```
VITE vX.X.X  ready in XX ms

➜  Local:   http://localhost:5173/
```

Abre esa dirección en tu navegador y… ¡listo! Ya está funcionando el frontend de Decameron. 🎉

---

## 🧼 ¿Cómo lo apago?

Para cerrar el servidor, ve a la terminal y presiona:

```bash
Ctrl + C
```

---

## 🧑‍💻 Tecnologías utilizadas

- ⚛️ React
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔧 JavaScript (ES6+)
- 🧩 npm como gestor de dependencias

---

## 🆘 ¿Problemas?

Si tienes dudas o algo no te funciona, puedes:

1. Revisar los mensajes de error en la terminal.
2. Escribirme por GitHub abriendo un "issue" en este repositorio.

---

## ✨ ¡Gracias por usar este proyecto!
