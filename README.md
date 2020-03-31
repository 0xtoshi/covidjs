<h1> CovidJS </h1>

<a href="https://github.com/ximplah/COVID-REACT"> New Repo Update </a>


run in production

```
git clone https://github.com/ximplah/covidjs.git

> npm install
> npm i -g @adonisjs/cli adonis
> adonis migration:run

```
<h2> Configure  Nginx </h2>

Install Nginx

```
apt install nginx
apt install mysql-server

```

NGINX Config


```
  server {
  listen 80;

  server_name myapp.com;

  location / {
      proxy_pass http://localhost:3333;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_cache_bypass $http_upgrade;
  }
}
```
