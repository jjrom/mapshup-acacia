(function(c) {

    /*
     * Update configuration options
     * 
     * Should be changed to match target server
     */
    c["general"].rootUrl = 'http://localhost/devel/mapshup-acacia/build';
    c["general"].serverRootUrl = c["general"].rootUrl + "/s";
    c["general"].confirmDeletion = false;

    /*
     * !! DO NOT EDIT UNDER THIS LINE !!
     */
    c["general"].themePath = "/js/mapshup/theme/default";
    c["general"].displayContextualMenu = true;
    c["general"].displayCoordinates = true;
    c["general"].displayScale = false;
    c["general"].timeLine = {
        enable: false
    };
    c["general"].overviewMap = "closed";
    c.remove("layers", "Streets");
    c.remove("layers", "Satellite");
    c.remove("layers", "Relief");
    c.remove("layers", "MapQuest OSM");
    c.remove("layers", "OpenStreetMap");
    c.add("layers", {
        type: "Bing",
        title: "Satellite",
        key: "AmraZAAcRFVn6Vbxk_TVhhVZNt66x4_4SV_EvlfzvRC9qZ_2y6k1aNsuuoYS0UYy",
        bingType: "Aerial"
    });
    c["general"].location = {
        lon: 0,
        lat: 40,
        zoom: 3
    };

    /*
     * Remove plugins
     */
    c.remove("plugins", "Streetview");
    c.remove("plugins", "Logger");
    c.remove("plugins", "Welcome");
    c.remove("plugins", "WorldGrid");
    c.remove("plugins", "WPSClient");
    /*
    c.add("plugins", {
        name: "WPSClient",
        options: {
            urls: "http://constellation-wps.geomatys.com/cstl-wrapper/WS/wps/OTB_processing?service=WPS&"
        }
    });
    */
   
    /**
     * Assisted Classification of eArth observation ImAges (ACAcIA)
     * 
     * options:
     *      url: // Endpoint to OTB Web Processing Service
     *      processId: // WPS unique identifier for the OTB SVM classification process
     *      classes: // array of classification classes object
     *                  Structure of classification class object is 
     *                      {
     *                          className: // Name of the class (e.g. "Water")
     *                          classNumber: // Identifier of the class (e.g. "1")
     *                      }
     *                      
     */
    c.add("plugins", {
        name: "ACAcIA",
        options: {
            url:"http://constellation-wps.geomatys.com/cstl-wrapper/WS/wps/OTB_processing?service=WPS&",
            //url: "http://localhost/mspsrv/plugins/wps/accacia/dummywps.php?",
            trainingListSchemaLocation: "http://constellation-wps.geomatys.com/cstl-wrapper/webdav/OTB_processing/trainingList.xsd",
            processId: "urn:ogc:cstl:wps:orfeo:svmclassification",
            inputImageId: "urn:ogc:cstl:wps:orfeo:svmclassification:input:inputImage",
            sampleRatioId: "urn:ogc:cstl:wps:orfeo:svmclassification:input:sampleRatio",
            svmModelid: "urn:ogc:cstl:wps:orfeo:svmclassification:input:svmModel",
            trainingListId: "urn:ogc:cstl:wps:orfeo:svmclassification:input:trainingList",
            outputImageId: "urn:ogc:cstl:wps:orfeo:svmclassification:output:outputImage",
            classes: [
                {
                    className: "burned",
                    classNumber: "1"
                },
                {
                    className: "farmland",
                    classNumber: "2"
                },
                {
                    className: "grass",
                    classNumber: "3"
                },
                {
                    className: "road",
                    classNumber: "4"
                },
                {
                    className: "scrubland",
                    classNumber: "5"
                },
                {
                    className: "snow",
                    classNumber: "6"
                },
                {
                    className: "urban",
                    classNumber: "7"
                },
                {
                    className: "water",
                    classNumber: "8"
                },
                {
                    className: "wood",
                    classNumber: "9"
                }
            ]
        }
    });

    // Layers
    /*
    c.add("layers", {
        type: 'GeoJSON',
        title: 'Classes',
        url: c["general"].rootUrl + '/data/prades_polygons.json',
        unremovable: true,
        clusterized: false,
        featureInfo: {
            title: "$identifier$ : $className$",
            label: {
                value: "$className$",
                color: "#F00",
                size: 15
            }
        }
    });
    */
    /*
    c.add("layers", {
        type: 'GeoJSON',
        title: 'Prades',
        url: c["general"].rootUrl + '/data/prades_footprint.json',
        unremovable: true,
        opacity: 0,
        clusterized: false
    });
    */
})(window.M.Config);
