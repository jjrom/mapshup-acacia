mapshup-acacia
=============

mapshup build for ACAcIA - Assisted Classification of eArth observation ImAges
See ACAcIA in action in video (http://vimeo.com/67288677)

Installation
============

This document supposes that mapshup-acacia application will be installed in $TARGET directory

Apache configuration (Linux ubuntu)
--------------------------------------

1. Add the following rule to /etc/apache2/sites-available/default file

        Alias /mapshup-acacia/ "/$TARGET/"
        <Directory "/$TARGET/">
            Options -Indexes -FollowSymLinks
            AllowOverride None
            Order allow,deny
            Allow from all
        </Directory>

Note: $TARGET should be replaced by the $TARGET value (i.e. if $TARGET=/var/www/mapshup-acacia, then put /var/www/mapshup-acacia in the apache configuration file)

2. Relaunch Apache

        sudo apachectl restart

Build mapshup-acacia
--------------------

The first time, you need to peform a complete build

        ./build.sh -a -t $TARGET

Once mapshup is cloned and compiled, you need to perform a partial build each time you change a file from the src directory.

        ./build.sh -t $TARGET


Configure mapshup
-----------------

Check and configure $TARGET/s/config.php and $TARGET/acacia/config.js (see https://github.com/jjrom/mapshup/blob/master/README.md)

Run application
---------------

1. Go to http://localhost/mapshup-acacia/

2. (Long) click on the map to display contextual menu. Then choose 'Classify'. It opens the classification popup (top right)

3. Within the classification popup, choose draw classes then draw your classes (forest, water, etc.). Then choose image to classify (click on the first button (red) in the classification popup and drag&drop image url)

4. Click 'process'. When finished, image should be displayed as a WMS layer

