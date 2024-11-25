/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8724444444444445, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9866666666666667, 500, 1500, "Kültür"], "isController": false}, {"data": [0.9733333333333334, 500, 1500, "Elektronik"], "isController": false}, {"data": [0.9933333333333333, 500, 1500, "Oyun"], "isController": false}, {"data": [1.0, 500, 1500, "Spor"], "isController": false}, {"data": [1.0, 500, 1500, "Sağlık"], "isController": false}, {"data": [0.9933333333333333, 500, 1500, "Enerji"], "isController": false}, {"data": [1.0, 500, 1500, "Dünya"], "isController": false}, {"data": [0.8866666666666667, 500, 1500, "Astronomi"], "isController": false}, {"data": [0.7466666666666667, 500, 1500, "Anasayfa"], "isController": false}, {"data": [1.0, 500, 1500, "Güvenlik"], "isController": false}, {"data": [1.0, 500, 1500, "Uzay Havacılık"], "isController": false}, {"data": [0.9866666666666667, 500, 1500, "Fizik"], "isController": false}, {"data": [1.0, 500, 1500, "Savunma"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "Otomotiv"], "isController": false}, {"data": [1.0, 500, 1500, "Yapay-Zeka"], "isController": false}, {"data": [1.0, 500, 1500, "https://2nhaber.com/hakkimizda/"], "isController": false}, {"data": [0.006666666666666667, 500, 1500, "https://2nhaber.com/?s=İstanbul"], "isController": false}, {"data": [0.9933333333333333, 500, 1500, "Kimya"], "isController": false}, {"data": [0.9933333333333333, 500, 1500, "Bilgisayar"], "isController": false}, {"data": [0.9533333333333334, 500, 1500, "Neden"], "isController": false}, {"data": [1.0, 500, 1500, "Ayıklama Örnekleyicisi"], "isController": false}, {"data": [1.0, 500, 1500, "Debug Sampler"], "isController": false}, {"data": [0.6933333333333334, 500, 1500, "https://2nhaber.com/"], "isController": false}, {"data": [0.9933333333333333, 500, 1500, "Diğer"], "isController": false}, {"data": [0.9933333333333333, 500, 1500, "Eğitim"], "isController": false}, {"data": [1.0, 500, 1500, "Cevre"], "isController": false}, {"data": [0.98, 500, 1500, "Biyoloji"], "isController": false}, {"data": [1.0, 500, 1500, "Türkiye"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2100, 0, 0.0, 826.7047619047614, 0, 15180, 330.0, 486.0, 864.9499999999998, 14828.849999999997, 12.868199003633734, 2607.5130367111333, 5.833595516504997], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Kültür", 75, 0, 0.0, 334.00000000000006, 266, 591, 308.0, 431.00000000000006, 470.00000000000006, 591.0, 0.6777149259935301, 136.35800799251803, 0.3302536602253628], "isController": false}, {"data": ["Elektronik", 75, 0, 0.0, 376.4266666666667, 315, 612, 338.0, 466.20000000000005, 527.0, 612.0, 0.6735216200440034, 138.03078414754614, 0.3308411864083337], "isController": false}, {"data": ["Oyun", 75, 0, 0.0, 319.4, 264, 515, 287.0, 398.0, 406.00000000000006, 515.0, 0.6785058396735935, 121.87417307100789, 0.32931386945095303], "isController": false}, {"data": ["Spor", 75, 0, 0.0, 309.2666666666667, 261, 424, 289.0, 365.0, 391.6, 424.0, 0.6793847491711505, 137.52131746573636, 0.32974044954888854], "isController": false}, {"data": ["Sağlık", 75, 0, 0.0, 345.15999999999985, 304, 489, 334.0, 401.80000000000007, 453.20000000000005, 489.0, 0.6772804031172959, 137.9245824989615, 0.33004191519094794], "isController": false}, {"data": ["Enerji", 75, 0, 0.0, 295.37333333333333, 265, 573, 286.0, 336.8, 351.6, 573.0, 0.6736607624043401, 134.8490343774701, 0.32827804730445875], "isController": false}, {"data": ["Dünya", 75, 0, 0.0, 345.8933333333334, 313, 433, 328.0, 399.8, 424.2, 433.0, 0.6768953068592057, 138.0254576094314, 0.3291932254061372], "isController": false}, {"data": ["Astronomi", 75, 0, 0.0, 410.3733333333334, 273, 779, 434.0, 552.2, 600.4000000000001, 779.0, 0.6715495782668649, 136.38553724246074, 0.33052830805322253], "isController": false}, {"data": ["Anasayfa", 75, 0, 0.0, 635.6400000000001, 372, 2075, 492.0, 1061.0000000000002, 1537.6000000000004, 2075.0, 0.6674557476839285, 299.0556683123159, 0.32069162877001256], "isController": false}, {"data": ["Güvenlik", 75, 0, 0.0, 316.9333333333334, 261, 465, 284.0, 408.0, 421.2, 465.0, 0.6756574146644685, 137.25790350260803, 0.3305706686981433], "isController": false}, {"data": ["Uzay Havacılık", 75, 0, 0.0, 316.8133333333335, 261, 430, 298.0, 397.6, 408.8, 430.0, 0.6763764260269649, 137.36213546128872, 0.33488559374577265], "isController": false}, {"data": ["Fizik", 75, 0, 0.0, 341.7333333333333, 262, 544, 324.0, 426.80000000000007, 480.20000000000005, 544.0, 0.6721032350569047, 134.7039630287212, 0.32817540774262927], "isController": false}, {"data": ["Savunma", 75, 0, 0.0, 340.16, 308, 397, 333.0, 377.8, 392.4, 397.0, 0.6729112833763997, 138.54210300757697, 0.32856996258613264], "isController": false}, {"data": ["Test", 150, 0, 0.0, 11573.866666666669, 1963, 16370, 10505.0, 16007.1, 16154.9, 16356.23, 1.2591815320041972, 3572.112277019937, 7.99162185204617], "isController": true}, {"data": ["Otomotiv", 75, 0, 0.0, 334.58666666666676, 311, 472, 331.0, 354.4, 357.2, 472.0, 0.6732858143167496, 138.97149595411332, 0.32941034469989405], "isController": false}, {"data": ["Yapay-Zeka", 75, 0, 0.0, 362.10666666666674, 311, 498, 335.0, 449.40000000000003, 472.8, 498.0, 0.6735458145863081, 137.23665235662455, 0.3308530710321416], "isController": false}, {"data": ["https://2nhaber.com/hakkimizda/", 75, 0, 0.0, 325.4266666666666, 253, 467, 285.0, 406.4, 452.6, 467.0, 1.7244947230461476, 199.13791430985722, 0.847090669621301], "isController": false}, {"data": ["https://2nhaber.com/?s=İstanbul", 75, 0, 0.0, 13968.53333333334, 1172, 15180, 14538.0, 15069.6, 15139.4, 15180.0, 1.3013603553581343, 235.5427675813784, 0.6455967387909495], "isController": false}, {"data": ["Kimya", 75, 0, 0.0, 320.5333333333332, 263, 531, 285.0, 412.00000000000006, 449.20000000000005, 531.0, 0.6717420510523958, 132.86116631213613, 0.326687052171966], "isController": false}, {"data": ["Bilgisayar", 75, 0, 0.0, 321.9066666666668, 262, 579, 290.0, 410.8, 420.40000000000003, 579.0, 0.6751586622856371, 136.7391805824369, 0.33164531946257375], "isController": false}, {"data": ["Neden", 75, 0, 0.0, 408.77333333333314, 316, 759, 396.0, 497.6000000000001, 518.6, 759.0, 0.6710808876163207, 169.78436458426538, 0.32636550979778095], "isController": false}, {"data": ["Ayıklama Örnekleyicisi", 75, 0, 0.0, 0.12, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.6815703380588877, 0.307931348827699, 0.0], "isController": false}, {"data": ["Debug Sampler", 75, 0, 0.0, 0.2400000000000002, 0, 5, 0.0, 1.0, 1.2000000000000028, 5.0, 1.7372370981191512, 0.8508390131335125, 0.0], "isController": false}, {"data": ["https://2nhaber.com/", 75, 0, 0.0, 702.0266666666668, 389, 2603, 537.0, 1075.4, 1619.8000000000002, 2603.0, 1.6503828888302086, 739.456846957244, 0.7929574036176392], "isController": false}, {"data": ["Diğer", 75, 0, 0.0, 333.26666666666665, 269, 536, 328.0, 399.6000000000001, 442.0, 536.0, 0.672645739910314, 131.1997442544843, 0.3271265414798206], "isController": false}, {"data": ["Eğitim", 75, 0, 0.0, 365.0933333333333, 304, 553, 338.0, 459.0000000000001, 481.20000000000005, 553.0, 0.6771214214132879, 138.57417731157966, 0.329964442661358], "isController": false}, {"data": ["Cevre", 75, 0, 0.0, 331.73333333333346, 270, 465, 309.0, 440.0, 451.4, 465.0, 0.6775312567753126, 136.18067726024427, 0.3295025057364313], "isController": false}, {"data": ["Biyoloji", 75, 0, 0.0, 370.84, 268, 623, 382.0, 454.0, 470.60000000000014, 623.0, 0.6721092580809936, 136.16360350538585, 0.3288347053697049], "isController": false}, {"data": ["Türkiye", 75, 0, 0.0, 315.3733333333333, 259, 437, 287.0, 391.0, 419.00000000000006, 437.0, 0.6771214214132879, 136.69642615313776, 0.3306256940494569], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2100, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
