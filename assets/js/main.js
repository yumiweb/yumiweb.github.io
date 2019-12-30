
// Global Variables

// onload
function initSite() {
    if (!callContent('page')) {
        initContent('main');
    }
    setTimeout(hideSplash, 1500);
}

// Content Management
var currentElement;
function initContent(args) {
    if (currentElement != args) {
        if (loadContent(args, 0)) {
            nav_setInactive();
            if (args == 'main') {
                nav_setActive(1);
                currentElement = args;
            } else if (args == 'plan') {
                nav_setActive(2);
                currentElement = args;
            } else if (args == 'addon') {
                nav_setActive(3);
                currentElement = args;
            } else if (args == 'pay') {
                nav_setActive(4);
                currentElement = args;
            } else if (args == 'about') {
                nav_setActive(5);
                currentElement = args;
            }
        }
    }else{
        scrollIntoViewz('placeholder');
    }
}

function loadContent(args, args02) {
    var xhttp = new XMLHttpRequest();
    var var01 = [];
    if(!args02){
        var01[0] = 'content-view';
        var01[1] = 'placeholder';
        var01[2] = args;
    }else{
        var01[0] = 'content-view-2';
        var01[1] = 'placeholder';
        var01[2] = args + '/' + args02;
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(var01[0]).innerHTML = this.responseText;
            scrollIntoViewz(var01[1]);
            // Section Specifics
            if(!args02){
                if (args == 'plan') {
                    subnav_sel('plan');
                }else if(args == 'addon'){
                    subnav_sel('addon');
                }else if(args == 'about'){
                    subnav_sel('about');
                }
            }
        }
    }
    xhttp.open('GET', 'assets/docs/' + var01[2] + '.html', true);
    xhttp.send();
    return true;
}

function nav_setActive(args) {
    document.getElementById('content-nav-item-' + args).classList.add('active');
    document.getElementById('nav-button-' + args).classList.add('active');
}

function nav_setInactive() {
    var element = document.getElementsByClassName('content-nav-item');
    var element2 = document.getElementsByClassName('nav-button');
    for (var i = 0; i < element.length; i++) {
        element[i].classList.remove('active');
    }
    for (var i = 0; i < element2.length; i++) {
        element2[i].classList.remove('active');
    }
}

// PAGE SUBNAV
var subnav_sel_curr = 1;
function subnav_sel(args, args2) {
    if(!args2){
        args2 = 1;
        document.getElementById('sub-nav-sel-' + args2).classList.add('active');
    }else{
        if(document.getElementById('sub-nav-sel-1').classList.contains('active') && subnav_sel_curr != 1){
            subnav_sel_curr = 1;
        }
        if(args2 != subnav_sel_curr){
            document.getElementById('sub-nav-sel-' + args2).classList.add('active');
            document.getElementById('sub-nav-sel-' + subnav_sel_curr).classList.remove('active');
            subnav_sel_curr = args2;
        }
    }
    loadContent(args, args2);
}

// PAGE: PAY
function securePay(){
    var var01 = document.getElementById('account').value;
    var status = "Under Maintenance";
    if(var01.length<9){
        status = "Invalid Account No."
    }
    document.getElementById('pay-status').innerHTML = status;
    return false;
}

// PAGE: DASHBOARD
function secureLogin(){
    var var01 = document.getElementById('username').value;
    var status = "Under Maintenance";
    if(var01.length<9){
        status = "Invalid Account No."
    }
    document.getElementById('login-status').innerHTML = status;
    return false;
}

// Call Page and Section according to URL Parameters
function callContent(args) {
    var isCalled = false;
    if (args == 'page') {
        var pages = ['plan', 'pay', 'addon', 'about'];
        if (pages.indexOf(getUrlParams().page) != '-1') {
            initContent(getUrlParams().page);
            isCalled = true;
        }
    }
    return isCalled;
}

// Scroll Content Into View
function scrollIntoViewz(args) {
    document.getElementById(args).scrollIntoView({ behavior: "smooth" });
}

// Splash Screen
function hideSplash() {
    document.getElementById('splash').style.pointerEvents = 'none';
    document.getElementById('splash').style.opacity = '0';
    setTimeout(function () {document.getElementById('splash').style.display = 'none'}, 1000);
}

// Get URL Parameters
function getUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};

    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                }
                else {
                    obj[paramName][paramNum] = paramValue;
                }
            }
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}

