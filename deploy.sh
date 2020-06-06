hugo
ssh root@51.178.53.161 'mkdir -p /var/www/qastia/html/'
rsync -az public/ root@51.178.53.161:/var/www/qastia/html/

