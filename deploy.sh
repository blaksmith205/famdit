echo "Building the server files..."
npm run build
echo "Replacing files..."
sudo rm -r /var/www/famdit.com/html
sudo mkdir -p /var/www/famdit.com/html && sudo cp -r ./build/* /var/www/famdit.com/html/
echo "Server deployed!"
