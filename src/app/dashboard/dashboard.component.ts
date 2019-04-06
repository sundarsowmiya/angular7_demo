import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../../assets/css/vendor/jquery-jvectormap-1.2.2.css',
]
})
export class DashboardComponent implements OnInit {
  loadAPI: Promise<any>;
  constructor() {
  this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    }); }
    ngOnInit() {
        this.loadScript();
    }
    
    public loadScript() {         
    var isFound = false;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }

    if (!isFound) {
        var dynamicScripts = [
           // "../../assets/js/app.min.js",
          "../../assets/js/vendor/Chart.bundle.min.js",
          "../../assets/js/vendor/jquery-jvectormap-1.2.2.min.js",
          "../../assets/js/vendor/jquery-jvectormap-world-mill-en.js",
          "../../assets/js/pages/demo.dashboard.js",
          "../../assets/js/vendor/d3.min.js",
          "../../assets/js/vendor/britecharts.min.js",
          "../../assets/js/pages/demo.britechart.js",
         

      ];

        for (var i = 0; i < dynamicScripts .length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }
  }


  }

 



