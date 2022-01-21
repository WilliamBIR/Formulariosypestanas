This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
## SendGrid
Antes de iniciar, Crear una cuenta en SendGrid, meter un correo que no sea de gmail necesariamente y sacar la API KEY de este.

El proceso no es dificil

## Que correo va a ser el que envie?
SendGrid  => Single Sender Verificacion
Para poder enviar correos solo desde una dirección.
Tambien es posible enviarlos desde un dominio de google.


## API
Sacar una API KEY para usarla como variable env.

## Mensaje
El mensaje se configura en el api/post casi hasta el final, una vez que los datos se suben a la db, se envia un correo con los datos principales subidos.
