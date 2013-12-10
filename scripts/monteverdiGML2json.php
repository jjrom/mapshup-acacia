<?php
/*
 * R&T WPS - Convert monteverdi GML file to GeoJSON
 *
 *  @author   Jerome Gasperi
 *  @date     2013.03.19
 *
 */

/* 
 *
 * Monteverdi GML looks like

  <ogr:FeatureCollection
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://ogr.maptools.org/ classif3.xsd"
     xmlns:ogr="http://ogr.maptools.org/"
     xmlns:gml="http://www.opengis.net/gml">
  <gml:boundedBy>
    <gml:Box>
      <gml:coord><gml:X>2.317653894056436</gml:X><gml:Y>42.51230910445119</gml:Y></gml:coord>
      <gml:coord><gml:X>2.77259945054353</gml:X><gml:Y>42.78922031257009</gml:Y></gml:coord>
    </gml:Box>
  </gml:boundedBy>
                                                                                                 
  <gml:featureMember>
    <ogr:DOCUMENT fid="DOCUMENT.0">
      <ogr:geometryProperty><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates>2.53111481264589,42.653791073897665 2.538818116804877,42.654927316178643 2.539740796690217,42.652370741853112 2.532166238561741,42.651155543134472 2.53111481264589,42.653791073897665 2.53111481264589,42.653791073897665 2.53111481264589,42.653791073897665</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></ogr:geometryProperty>
      <ogr:Class>1</ogr:Class>
      <ogr:Name>water</ogr:Name>
    </ogr:DOCUMENT>
  </gml:featureMember>
  ...etc...
 
 */

/**
 * Return GeoJSON polygon geometry from poslist
 * @param <String> $posList : coordinates string (lon1 lat1 lon2 lat2 ... lonn latn)
 */
function posListToGeoJSONGeometry($posList) {

    /*
     * Explode posList into the $coordinates array
     * Note the trim() to avoid weird results :)
     */
    $posList = preg_replace('!\s+!', ' ', $posList);
    $coordinates = explode(' ', trim($posList));
    $count = count($coordinates);
    $couples = array();

    /*
     * Parse each coordinates
     */
    for ($i = 0; $i < $count; $i = $i + 2) {
        array_push($couples, array(floatval($coordinates[$i]), floatval($coordinates[$i + 1])));
    }

    $geometry = array(
        'type' => 'Polygon',
        'coordinates' => array($couples)
    );

    return $geometry;
}

/* ============================= MAIN ============================================ */

// Remove PHP NOTICE
error_reporting(E_PARSE);

// Set Timezone
date_default_timezone_set("Europe/Paris");

// This application can only be called from a shell (not from a webserver)
if (empty($_SERVER['SHELL'])) {
    exit;
}

// Get format and callid
if (!$_SERVER['argv'][1]) {
    echo "\n    Usage : " . $_SERVER['argv'][0] . " [GML FILE]\n\n";
    exit;
}

// Parse GML file
libxml_use_internal_errors(true);
$doc = new DOMDocument();
$doc->loadXML(file_get_contents($_SERVER['argv'][1]));
$errors = libxml_get_errors();

$features = $doc->getElementsByTagname('featureMember');
$count = 0;

$geojson = array(
    'type' => 'FeatureCollection',
    'features' => array()
);
foreach($features as $feature) {
    $identifier = $count++;
    $posList = trim($feature->getElementsByTagName('coordinates')->item(0)->nodeValue);
    $className = trim($feature->getElementsByTagName('Name')->item(0)->nodeValue);
    $classValue = trim($feature->getElementsByTagName('Class')->item(0)->nodeValue);

    // Add feature array to feature collection array
    array_push($geojson['features'], array(
        'type' => 'Feature',
        'geometry' => posListToGeoJSONGeometry(str_replace(",", " ", $posList)),
        'crs' => array(
            'type' => 'EPSG',
            'properties' => array('code' => '4326')
        ),
        'properties' => array(
            'identifier' => $identifier,
            'className' => $className,
            'classValue' => $classValue
        )   
    ));

}

echo json_encode($geojson);

?>