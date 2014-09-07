// ==UserScript==
// @name hacer
// @namespace https://github.com/doomred
// @description Provide a better HTML architecture for add functions and CSS design. This script is by hacers for hacers.
// @version 0.0.8
// @encoding utf-8
// @license ISC
// @copyright hacer contributors
// @author dye `Eric' jarhoo
// @homepageURL http://saltyremix.com
// @icon https://raw.github.com/doomred/hacer/master/hacer_icon.png
// @updateURL https://raw.github.com/doomred/hacer/devvel/hacer.meta.js
// @resource mburl https://raw.github.com/doomred/hacer/devvel/hacer.meta.js
// @include http://h.acfun.tv/*
// @exclude http://h.acfun.tv/homepage/ref*
// @run-at document-end
// @grant GM_openInTab
// @grant GM_getResourceText
// @grant GM_registerMenuCommand
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

/***********
 * Many thanks for the followings, without you the mates,
 * `hacer' would not make hacers this kinds of happy!!
 *   zjworks,
 *
\*********************************************************/

/*****************************
 * Origin License: LGPL
 * Origin Copyright info: Copyright 2009-2013, GM_config Contributors
 * GM_config Contributors: Mike Medley <medleymind@gmail.com>, Joe Simmons, Izzy Soft, Marti Martz
 *
 * LICENSE: LGPL
 * LICENSE NOTICE:
 *  GM_config is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Discreption: Customize for hacer, just work & easy to use.
 * Edit & Optimize By:
 *             dye E. jarhoo(github.com/doomred),
 * Many Thanks To:
 *             zjworks,
\*******************************************************/


// The GM_config constructor
function GM_configStruct() {
  // call init() if settings were passed to constructor
  if (arguments.length) {
    GM_configInit(this, arguments);
    this.onInit();
  }
}

// This is the initializer function
function GM_configInit(config, args) {
  // Initialize instance variables
  if (typeof config.fields == "undefined") {
    config.fields = {};
    config.onInit = config.onInit || function() {};
    config.onOpen = config.onOpen || function() {};
    config.onSave = config.onSave || function() {};
    config.onClose = config.onClose || function() {};
    config.onReset = config.onReset || function() {};
    config.isOpen = false;
    config.title = 'User Script Settings';
    config.css = {
      basic: [
        "#GM_config * { font-family: arial,tahoma,myriad pro,sans-serif; }",
        "#GM_config { background: #FFF; }",
        "#GM_config input[type='radio'] { margin-right: 8px; }",
        "#GM_config .indent40 { margin-left: 40%; }",
        "#GM_config .field_label { font-size: 12px; font-weight: bold; margin-right: 6px; }",
        "#GM_config .radio_label { font-size: 12px; }",
        "#GM_config .block { display: block; }",
        "#GM_config .saveclose_buttons { margin: 16px 10px 10px; padding: 2px 12px; }",
        "#GM_config .reset, #GM_config .reset a," +
          " #GM_config_buttons_holder { color: #000; text-align: right; }",
        "#GM_config .config_header { font-size: 20pt; margin: 0; }",
        "#GM_config .config_desc, #GM_config .section_desc, #GM_config .reset { font-size: 9pt; }",
        "#GM_config .center { text-align: center; }",
        "#GM_config .section_header_holder { margin-top: 8px; }",
        "#GM_config .config_var { margin: 0 0 4px; }",
        "#GM_config .section_header { background: #414141; border: 1px solid #000; color: #FFF;",
        " font-size: 13pt; margin: 0; }",
        "#GM_config .section_desc { background: #EFEFEF; border: 1px solid #CCC; color: #575757;" +
          " font-size: 9pt; margin: 0 0 6px; }"
        ].join('\n') + '\n',
      basicPrefix: "GM_config",
      stylish: ""
    };
  }

  if (args.length == 1 &&
    typeof args[0].id == "string" &&
    typeof args[0].appendChild != "function") var settings = args[0];
  else {
    // Provide backwards-compatibility with argument style intialization
    var settings = {};

    // loop through GM_config.init() arguments
    for (var i = 0, l = args.length, arg; i < l; ++i) {
      arg = args[i];

      // An element to use as the config window
      if (typeof arg.appendChild == "function") {
        settings.frame = arg;
        continue;
      }

      switch (typeof arg) {
        case 'object':
          for (var j in arg) { // could be a callback functions or settings object
            if (typeof arg[j] != "function") { // we are in the settings object
              settings.fields = arg; // store settings object
              break; // leave the loop
            } // otherwise it must be a callback function
            if (!settings.events) settings.events = {};
            settings.events[j] = arg[j];
          }
          break;
        case 'function': // passing a bare function is set to open callback
          settings.events = {onOpen: arg};
          break;
        case 'string': // could be custom CSS or the title string
          if (/\w+\s*\{\s*\w+\s*:\s*\w+[\s|\S]*\}/.test(arg))
            settings.css = arg;
          else
            settings.title = arg;
          break;
      }
    }
  }

  /* Initialize everything using the new settings object */
  // Set the id
  if (settings.id) config.id = settings.id;
  else if (typeof config.id == "undefined") config.id = 'GM_config';

  // Set the title
  if (settings.title) config.title = settings.title;

  // Set the custom css
  if (settings.css) config.css.stylish = settings.css;

  // Set the frame
  if (settings.frame) config.frame = settings.frame;

  // Set the event callbacks
  if (settings.events) {
    var events = settings.events;
    for (e in events) 
      config["on" + e.charAt(0).toUpperCase() + e.slice(1)] = events[e];
  }

  // Create the fields
  if (settings.fields) {
    var stored = config.read(), // read the stored settings
        fields = settings.fields,
        customTypes = settings.types || {};

    for (var id in fields) {
      var field = fields[id];

      // for each field definition create a field object
      if (field)
        config.fields[id] = new GM_configField(field, stored[id], id,
          customTypes[field.type]);
      else if (config.fields[id]) delete config.fields[id];
    }
  }

  // If the id has changed we must modify the default style
  if (config.id != config.css.basicPrefix) {
    config.css.basic = config.css.basic.replace(
      new RegExp('#' + config.css.basicPrefix, 'gm'), '#' + config.id);
    config.css.basicPrefix = config.id;
  }
}

GM_configStruct.prototype = {
  // Support old method of initalizing
  init: function() { 
    GM_configInit(this, arguments);
    this.onInit(); 
  },

  // call GM_config.open() from your script to open the menu
  open: function () {
    // Die if the menu is already open on this page
    // You can have multiple instances but you can't open the same instance twice
    var match = document.getElementById(this.id);
    if (match && (match.tagName == "IFRAME" || match.childNodes.length > 0)) return;

    // Sometimes "this" gets overwritten so create an alias
    var config = this;

    // Function to build the mighty config window :)
    function buildConfigWin (body, head) {
      var create = config.create,
          fields = config.fields,
          configId = config.id,
          bodyWrapper = create('div', {id: configId + '_wrapper'});

      // Append the style which is our default style plus the user style
      head.appendChild(
        create('style', {
        type: 'text/css',
        textContent: config.css.basic + config.css.stylish
      }));

      // Add header and title
      bodyWrapper.appendChild(create('div', {
        id: configId + '_header',
        className: 'config_header block center'
      }, config.title));

      // Append elements
      var section = bodyWrapper,
          secNum = 0; // Section count

      // loop through fields
      for (var id in fields) {
        var field = fields[id],
            settings = field.settings;

        if (settings.section) { // the start of a new section
          section = bodyWrapper.appendChild(create('div', {
              className: 'section_header_holder',
              id: configId + '_section_' + secNum
            }));

          if (Object.prototype.toString.call(settings.section) !== '[object Array]')
            settings.section = [settings.section];

          if (settings.section[0])
            section.appendChild(create('div', {
              className: 'section_header center',
              id: configId + '_section_header_' + secNum
            }, settings.section[0]));

          if (settings.section[1])
            section.appendChild(create('p', {
              className: 'section_desc center',
              id: configId + '_section_desc_' + secNum
            }, settings.section[1]));
          ++secNum;
        }

        // Create field elements and append to current section
        section.appendChild((field.wrapper = field.toNode(configId)));
      }

      // Add save and close buttons
      bodyWrapper.appendChild(create('div',
        {id: configId + '_buttons_holder'},

        create('button', {
          id: configId + '_saveBtn',
          textContent: 'Save & Close',
          title: 'Save settings than close',
          className: 'saveclose_buttons',
          onclick: function () { config.save() }
        }),

        create('div',
          {className: 'reset_holder block'},

          // Reset link
          create('a', {
            id: configId + '_resetLink',
            textContent: 'Reset to defaults',
            href: '#',
            title: 'Reset fields to default values',
            className: 'reset',
            onclick: function(e) { e.preventDefault(); config.reset() }
          })
      )));

      body.appendChild(bodyWrapper); // Paint everything to window at once
      config.center(); // Show and center iframe
      window.addEventListener('resize', config.center, false); // Center frame on resize

      // Call the open() callback function
      config.onOpen(config.frame.contentDocument || config.frame.ownerDocument,
                    config.frame.contentWindow || window,
                    config.frame);

      // Close frame on window close
      window.addEventListener('beforeunload', function () {
          config.close();
      }, false);

      // Now that everything is loaded, make it visible
      config.frame.style.display = "block";
      config.isOpen = true;
    }

    // Change this in the onOpen callback using this.frame.setAttribute('style', '')
    var defaultStyle = 'bottom: auto; border: 1px solid #000; display: none; height: 75%;'
      + ' left: 0; margin: 0; max-height: 95%; max-width: 95%; opacity: 0;'
      + ' overflow: auto; padding: 0; position: fixed; right: auto; top: 0;'
      + ' width: 75%; z-index: 999;';

    // Either use the element passed to init() or create an iframe
    if (this.frame) {
      this.frame.id = this.id; // Allows for prefixing styles with the config id
      this.frame.setAttribute('style', defaultStyle);
      buildConfigWin(this.frame, this.frame.ownerDocument.getElementsByTagName('head')[0]);
    } else {
      // Create frame
      document.body.appendChild((this.frame = this.create('iframe', {
        id: this.id,
        style: defaultStyle
      })));

      // In WebKit src can't be set until it is added to the page
      this.frame.src = 'about:blank';
      // we wait for the iframe to load before we can modify it
      this.frame.addEventListener('load', function(e) {
          var frame = config.frame;
          var body = frame.contentDocument.getElementsByTagName('body')[0];
          body.id = config.id; // Allows for prefixing styles with the config id
          buildConfigWin(body, frame.contentDocument.getElementsByTagName('head')[0]);
      }, false);
    }
  },

  save: function () {
    var forgotten = this.write();
    this.onSave(forgotten); // Call the save() callback function

    // If frame is an iframe then remove it
    if (this.frame.contentDocument) {
      this.remove(this.frame);
      this.frame = null;
    } else { // else wipe its content
      this.frame.innerHTML = "";
      this.frame.style.display = "none";
    }

    // Null out all the fields so we don't leak memory
    var fields = this.fields;
    for (var id in fields) {
      var field = fields[id];
      field.wrapper = null;
      field.node = null;
    }

    this.onClose(); //  Call the close() callback function
    this.isOpen = false;
  },

  set: function (name, val) {
    this.fields[name].value = val;
  },

  get: function (name) {
    return this.fields[name].value;
  },

  write: function (store, obj) {
    if (!obj) {
      var values = {},
          forgotten = {},
          fields = this.fields;

      for (var id in fields) {
        var field = fields[id];
        var value = field.toValue();

        if (field.save) {
          if (value != null) {
            values[id] = value;
            field.value = value;
          } else 
            values[id] = field.value;
        } else
          forgotten[id] = value;
      }
    }
    try {
      this.setValue(store || this.id, this.stringify(obj || values));
    } catch(e) {
      this.log("GM_config failed to save settings!");
    }

    return forgotten;
  },

  read: function (store) {
    try {
      var rval = this.parser(this.getValue(store || this.id, '{}'));
    } catch(e) {
      this.log("GM_config failed to read saved settings!");
      var rval = {};
    }
    return rval;
  },

  reset: function () {
    var fields = this.fields;

    // Reset all the fields
    for (var id in fields) fields[id].reset();

    this.onReset(); // Call the reset() callback function
  },

  create: function () {
    switch(arguments.length) {
      case 1:
        var A = document.createTextNode(arguments[0]);
        break;
      default:
        var A = document.createElement(arguments[0]),
            B = arguments[1];
        for (var b in B) {
          if (b.indexOf("on") == 0)
            A.addEventListener(b.substring(2), B[b], false);
          else if (",style,accesskey,id,name,src,href,which,for".indexOf("," +
                   b.toLowerCase()) != -1)
            A.setAttribute(b, B[b]);
          else
            A[b] = B[b];
        }
        if (typeof arguments[2] == "string")
          A.innerHTML = arguments[2];
        else
          for (var i = 2, len = arguments.length; i < len; ++i)
            A.appendChild(arguments[i]);
    }
    return A;
  },

  center: function () {
    var node = this.frame;
    if (!node) return;
    var style = node.style,
        beforeOpacity = style.opacity;
    if (style.display == 'none') style.opacity = '0';
    style.display = '';
    style.top = Math.floor((window.innerHeight / 2) - (node.offsetHeight / 2)) + 'px';
    style.left = Math.floor((window.innerWidth / 2) - (node.offsetWidth / 2)) + 'px';
    style.opacity = '1';
  },

  remove: function (el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
};

// Define a bunch of API stuff
(function() {
  var isGM = typeof GM_getValue != 'undefined' &&
             typeof GM_getValue('a', 'b') != 'undefined',
      setValue, getValue, stringify, parser;

  // Define value storing and reading API
  if (!isGM) {
    setValue = function (name, value) {
      return localStorage.setItem(name, value);
    };
    getValue = function(name, def){
      var s = localStorage.getItem(name);
      return s == null ? def : s
    };

    // We only support JSON parser outside GM
    stringify = JSON.stringify;
    parser = JSON.parse;
  } else {
    setValue = GM_setValue;
    getValue = GM_getValue;
    stringify = typeof JSON == "undefined" ?
      function(obj) {
        return obj.toSource();
    } : JSON.stringify;
    parser = typeof JSON == "undefined" ?
      function(jsonData) {
        return (new Function('return ' + jsonData + ';'))();
    } : JSON.parse;
  }

  GM_configStruct.prototype.isGM = isGM;
  GM_configStruct.prototype.setValue = setValue;
  GM_configStruct.prototype.getValue = getValue;
  GM_configStruct.prototype.stringify = stringify;
  GM_configStruct.prototype.parser = parser;
  GM_configStruct.prototype.log =  window.console ?
    console.log : (isGM && typeof GM_log != 'undefined' ?
      GM_log : (window.opera ?
        opera.postError : function(){ /* no logging */ }
  ));
})();

function GM_configDefaultValue(type, options) {
  var value;

  if (type.indexOf('unsigned ') == 0)
    type = type.substring(9);

  switch (type) {
    case 'radio': case 'select':
      value = options[0];
      break;
    case 'checkbox':
      value = false;
      break;
    case 'int': case 'integer':
    case 'float': case 'number':
      value = 0;
      break;
    default:
      value = '';
  }

  return value;
}

function GM_configField(settings, stored, id, customType) {
  // Store the field's settings
  this.settings = settings;
  this.id = id;
  this.node = null;
  this.wrapper = null;
  this.save = typeof settings.save == "undefined" ? true : settings.save;

  // Buttons are static and don't have a stored value
  if (settings.type == "button") this.save = false;

  // if a default value wasn't passed through init() then
  //   if the type is custom use its default value
  //   else use default value for type
  // else use the default value passed through init()
  this['default'] = typeof settings['default'] == "undefined" ?
    customType ? 
      customType['default']
      : GM_configDefaultValue(settings.type, settings.options)
    : settings['default'];

  // Store the field's value
  this.value = typeof stored == "undefined" ? this['default'] : stored;

  // Setup methods for a custom type
  if (customType) {
    this.toNode = customType.toNode;
    this.toValue = customType.toValue;
    this.reset = customType.reset;
  }
}

GM_configField.prototype = {
  create: GM_configStruct.prototype.create,

  toNode: function(configId) {
    var field = this.settings,
        value = this.value,
        options = field.options,
        type = field.type,
        id = this.id,
        labelPos = field.labelPos,
        create = this.create;

    function addLabel(pos, labelEl, parentNode, beforeEl) {
      if (!beforeEl) beforeEl = parentNode.firstChild;
      switch (pos) {
        case 'right': case 'below':
          if (pos == 'below') 
            parentNode.appendChild(create('br', {}));
          parentNode.appendChild(labelEl);
          break;
        default:
          if (pos == 'above')
            parentNode.insertBefore(create('br', {}), beforeEl);
          parentNode.insertBefore(labelEl, beforeEl);
      }
    }

    var retNode = create('div', { className: 'config_var',
          id: configId + '_' + id + '_var',
          title: field.title || '' }),
        firstProp;

    // Retrieve the first prop
    for (var i in field) { firstProp = i; break; }

    var label = field.label && type != "button" ? 
      create('label', {
        id: configId + '_' + id + '_field_label',
        for: configId + '_field_' + id,
        className: 'field_label'
      }, field.label) : null;

    switch (type) {
      case 'textarea':
        retNode.appendChild((this.node = create('textarea', {
          innerHTML: value,
          id: configId + '_field_' + id,
          className: 'block',
          cols: (field.cols ? field.cols : 20),
          rows: (field.rows ? field.rows : 2)
        })));
        break;
      case 'radio':
        var wrap = create('div', {
          id: configId + '_field_' + id
        });
        this.node = wrap;

        for (var i = 0, len = options.length; i < len; ++i) {
          var radLabel = create('label', {
            className: 'radio_label'
          }, options[i]);

          var rad = wrap.appendChild(create('input', {
            value: options[i],
            type: 'radio',
            name: id,
            checked: options[i] == value
          }));

          var radLabelPos = labelPos && 
            (labelPos == 'left' || labelPos == 'right') ? 
            labelPos : firstProp == 'options' ? 'left' : 'right';

          addLabel(radLabelPos, radLabel, wrap, rad);
        }

        retNode.appendChild(wrap);
        break;
      case 'select':
        var wrap = create('select', {
          id: configId + '_field_' + id
        });
        this.node = wrap;

        for (var i = 0, len = options.length; i < len; ++i) {
          var option = options[i];
          wrap.appendChild(create('option', {
            value: option,
            selected: option == value
          }, option));
        }

        retNode.appendChild(wrap);
        break;
      default: // fields using input elements
        var props = {
          id: configId + '_field_' + id,
          type: type,
          value: type == 'button' ? field.label : value
        };

        switch (type) {
          case 'checkbox':
            props.checked = value;
            break;
          case 'button':
            props.size = field.size ? field.size : 25;
            if (field.script) field.click = field.script;
            if (field.click) props.onclick = field.click;
            break;
          case 'hidden': 
            break;
          default:
            // type = text, int, or float
            props.type = 'text';
            props.size = field.size ? field.size : 25;
        }

        retNode.appendChild((this.node = create('input', props)));
    }

    if (label) {
      // If the label is passed first, insert it before the field
      // else insert it after
      if (!labelPos)
        labelPos = firstProp == "label" || type == "radio" ? 
          "left" : "right";

      addLabel(labelPos, label, retNode);
    }

    return retNode;
  },

  toValue: function() {
    var node = this.node,
        field = this.settings,
        type = field.type,
        unsigned = false,
        rval = null;

    if (!node) return rval;

    if (type.indexOf('unsigned ') == 0) {
      type = type.substring(9);
      unsigned = true;
    }

    switch (type) {
      case 'checkbox':
        rval = node.checked;
        break;
      case 'select':
        rval = node[node.selectedIndex].value;
        break;
      case 'radio':
        var radios = node.getElementsByTagName('input');
        for (var i = 0, len = radios.length; i < len; ++i)
          if (radios[i].checked)
            rval = radios[i].value;
        break;
      case 'button':
        break;
      case 'int': case 'integer':
      case 'float': case 'number':
        var num = Number(node.value);
        var warn = 'Field labeled "' + field.label + '" expects a' +
          (unsigned ? ' positive ' : 'n ') + 'integer value';

        if (isNaN(num) || (type.substr(0, 3) == 'int' && 
            Math.ceil(num) != Math.floor(num)) ||
            (unsigned && num < 0)) {
          alert(warn + '.');
          return null;
        }

        if (!this._checkNumberRange(num, warn))
          return null;
        rval = num;
        break;
      default:
        rval = node.value;
        break;
    }

    return rval; // value read successfully
  },

  reset: function() {
    var node = this.node,
        field = this.settings,
        type = field.type;

    if (!node) return;

    switch (type) {
      case 'checkbox':
        node.checked = this['default'];
        break;
      case 'select':
        for (var i = 0, len = node.options.length; i < len; ++i)
          if (node.options[i].textContent == this['default'])
            node.selectedIndex = i;
        break;
      case 'radio':
        var radios = node.getElementsByTagName('input');
        for (var i = 0, len = radios.length; i < len; ++i)
          if (radios[i].value == this['default'])
            radios[i].checked = true;
        break;
      case 'button' :
        break;
      default:
        node.value = this['default'];
        break;
      }
  },

  remove: function(el) {
    GM_configStruct.prototype.remove(el || this.wrapper);
    this.wrapper = null;
    this.node = null;
  },

  reload: function() {
    var wrapper = this.wrapper;
    if (wrapper) {
      var fieldParent = wrapper.parentNode;
      fieldParent.insertBefore((this.wrapper = this.toNode()), wrapper);
      this.remove(wrapper);
    }
  },

  _checkNumberRange: function(num, warn) {
    var field = this.settings;
    if (typeof field.min == "number" && num < field.min) {
      alert(warn + ' greater than or equal to ' + field.min + '.');
      return null;
    }

    if (typeof field.max == "number" && num > field.max) {
      alert(warn + ' less than or equal to ' + field.max + '.');
      return null;
    }
    return true;
  }
};

// Create default instance of GM_config
var GM_config = new GM_configStruct();


/* init global foobar varible */
var i = 0, k = 0;

/* init variable Handler */
var hacerVersion = '0.0.8';
var currentStyle = GM_getValue('gm_currentstyle', 'day');


var hboxCSS, nightCSS, frameNightCSS, frameDayCSS;
frameNightCSS = ' html body tbody tr td font[color="#cc1105"],font[color="#117743"] {display: none;}html body tbody tr td font[color="#789922"] {color: red;}.posttime {display: none;}.report {display: none;}.threadpost {margin: 0;}img {width: 30%;height: 30%;}table {padding: 0;width: 18em;}body{margin: 0;background-color: black;color:rgb(198,198,198) !important;}td{z-index: -50;background:rgba(50,50,60,0.7) !important;padding:9px !important;transition:background .1s ease-in-out;}td:hover {background:rgb(50,50,60) !important;}td:active {background:rgb(50,50,100) !important;}a{transition:color .1s ease-in-out;}a:link{color:rgb(100,100,224) !important}a:visited{color:rgb(100,100,190) !important}a:hover{color:lightblue !important}img{z-index: 50;opacity:0.3;transition:all .3s ease-in-out;}img:hover{opacity:0.9;}';

frameDayCSS = ' html body tbody tr td font[color="#cc1105"],font[color="#117743"] {display: none;}html body tbody tr td font[color="#789922"] {color: red;}.posttime {display: none;}.report {display: none;}.threadpost {margin: 0;}img {width: 30%;height: 30%;}table {padding: 0;width: 18em;}';
nightCSS = ' body{background-color:black;background-image:url("http://avdot.net/cover.php");background-position: center;background-repeat: no-repeat;background-attachment: fixed;background-repeat: no-repeat;color:rgb(198,198,198) !important;transition:background .5s ease-in-out;}#right_content{// background:black !important;background-image: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.5), rgba(0,0,0,0.9)) !important;background-attachment: fixed;transition:background .5s ease-in-out;}td{z-index: -50;background:rgba(50,50,60,0.7) !important;border: solid 0;border-radius: 1em;padding:9px !important;transition:background .1s ease-in-out;}td:hover, .originpost {background:rgb(50,50,60) !important;// padding: 6em !important;}td:active {background:rgb(50,50,100) !important;}a{transition:color .1s ease-in-out;}a:link{color:rgb(100,100,224) !important}a:visited{color:rgb(100,100,190) !important}a:hover{color:lightblue !important}#right_content img{z-index: 50;opacity:0.3;transition:all .3s ease-in-out;}#right_content img:hover{opacity:0.9;}#menu{background:rgb(12,12,30) !important;}.toolbar-bottom {color:#ffffff !important;background-image: url("data:image/png;base64,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");transition:background .1s ease-in-out;}#postform_tbl input, #emotion, textarea {background-color:black !important;color:rgb(150,150,150) !important;}font[color="#707070"]{color:rgb(100,100,100);}';
hboxCSS = ' #thebox {display: table-cell;vertical-align: middle;background-position: center;background-repeat: no-repeat;filter: Alpha(Opacity=100);visibility: hidden;z-index: 120;margin-left: auto;margin-right: auto;}#box-bg {position: fixed;display: table;z-index: 110;top: 0;left: 0;text-align: center;width: 100% !important;height: 100% !important;background-color: rgba(0, 0, 0, 0.8);visibility: hidden;transition: all 0.5s ease-in-out;}';

/* overwrite bad CSS plus must have CSS, custom style goto altCSS */
var htmlHead, htmlBody, owCSS;
htmlHead = window.document.getElementsByTagName('head')[0];
htmlBody = window.document.getElementsByTagName('body')[0];
owCSS = window.document.createElement('style');
owCSS.type = 'text/css';
owCSS.id = 'overwritecss';
owCSS.innerHTML += '#postform_tbl p {line-height: 1.5em; padding-bottom: 2em;}';
owCSS.innerHTML += 'body {margin: -2em; min-width: 50em; overflow-x: hidden;}';
owCSS.innerHTML += '#right_content {margin: 0 50px;}';
owCSS.innerHTML += '.nav-bottom {position: fixed; bottom: 1em; right: 0; z-index: 100; font-size: 12pt !important;}';
owCSS.innerHTML += '.originpost {padding-bottom:6em !important; }';
owCSS.innerHTML += '#hacerfeedback, #dangerarea, #dangerswitcher, #cssswitcher, #writepadswitcher, #settingswitcher  {text-decoration: underline; margin: 0 0.5em;}';
owCSS.innerHTML += '#hacerfeedback:hover, #dangerarea:hover, #dangerswitcher:hover, #cssswitcher:hover, #writepadswitcher:hover, #settingswitcher:hover  {color: #810400; cursor: pointer; text-decoration: underline; margin: 0 0.5em;}';
owCSS.innerHTML += '#alertbox {opacity: 0.9; border-color: white; border-width: 5px; border-style: solid; font-size: 18pt; position: fixed; top: 80%; left: 0.5em; transition: all 0.66s ease-in-out; background: black; z-index: 200;}';
owCSS.innerHTML += '#alertbox {opacity: 0.9; border-color: white; border-width: 5px; border-style: solid; font-size: 18pt; position: fixed; top: 80%; left: 0.5em; transition: all 0.66s ease-in-out; background: black; z-index: 200;}';
htmlHead.appendChild(owCSS);

/* init global alertNotice function */
var alertDiv;
alertDiv = document.createElement('div');
alertDiv.id = 'alertbox';
alertDiv.style.display = 'none';
htmlBody.appendChild(alertDiv);
function alertoff() {
    alertDiv.style.display = 'none';
}
function alertNotice(alertContent, delay) {
    var alertDiv = document.getElementById('alertbox');
    alertDiv.innerHTML = alertContent;
    alertDiv.style.display = 'inline';
    window.setTimeout(alertoff, delay);
}

function giveup(x) {
    return x;
}

function forceupdate() {
    GM_openInTab('https://raw.github.com/doomred/hacer/devvel/beauty.user.js');
    giveup(0);
}
function checkupdate() {
    var updateMB = GM_getResourceText('mburl');
    if (updateMB.search(hacerVersion) === -1) {
        alertNotice('New version Found, please wait awhile to install.', 3000);
        GM_openInTab('https://raw.github.com/doomred/hacer/devvel/beauty.user.js');
        giveup(0);
    } else {
        alertNotice('`hacer\' is up-to-date', 1500);
    }
}
GM_registerMenuCommand('hacer| check update', checkupdate, 'h');
GM_registerMenuCommand('hacer| force update', forceupdate, 'f');

function makegrabbable(targetDiv) {  /* make position=fixed div grabbable */
    targetDiv.addEventListener('mousedown', function (e) {
        if (!e && window.event) {
            e = window.event;
        }
        var pleft, ptop, xcoor, ycoor;
        pleft = parseInt(targetDiv.style.left, 10);
        ptop = parseInt(targetDiv.style.top, 10);
        xcoor = e.clientX;
        ycoor = e.clientY;
        window.document.onmousemove = function (e) {
            targetDiv.style.left = pleft + e.clientX - xcoor + 'px';
            targetDiv.style.top = ptop + e.clientY - ycoor + 'px';
        };
        window.document.onmouseup = function () {
            document.onmousemove = null;
        };
    }, false);
}

/* add CSS class toolbar-bottom */
var classToolbar = document.body.getElementsByTagName('div');
for (i = 0; i < classToolbar.length; i++) {
    if (classToolbar[i].style.width === '100%') {
        classToolbar[i].classList.add('toolbar-bottom');
    }
}

/* init GM_config container */
var classToolbar = document.getElementsByClassName('toolbar-bottom')[0];
var gmconfigDiv = document.createElement('div');  /* plan to contain setting panel */
gmconfigDiv.id = 'gm-config';
classToolbar.appendChild(gmconfigDiv);

function feedreportback() {
    var strWindowFeatures = 'left=50, top=50 location, resizable, scrollbars, status';
    if (window.confirm('YES for github, NO for acfun')) {
        window.open('https://github.com/doomred/hacer/issues', 'FEED_ME_BUGS', strWindowFeatures);
    } else {
        window.open('http://acfun.tv', 'Report & Suggestion', strWindowFeatures);
    }
}

/* add feedback element */
var fbAnchor = document.createElement('span');
fbAnchor.id = 'hacerfeedback';
fbAnchor.addEventListener('click', feedreportback, false);
fbAnchor.style.textAlign = 'right';
fbAnchor.innerHTML = 'feedback';
GM_config.init({
    'id': 'GM_config',
    'title': 'hacer setting',
    'fields':
    {
        'quoteSize':
        {
            'label': 'Quotes recursive time(enable betterquote first): ',
            'type': 'int',
            'min': 1,
            'max': 999,
            'default': '4'
        },
        'twoupOn':
        {
            'label': 'Use 2-up style: ',
            'type': 'checkbox',
            'default': true
        },
        'menuHide':
        {
            'label': 'If menu auto hide: ',
            'type': 'checkbox',
            'default': true
        },
        'hboxOn':
        {
            'label': 'If enable hbox: ',
            'type': 'checkbox',
            'default': true
        },
        'wpOn':
        {
            'label': 'If enable writepad: ',
            'type': 'checkbox',
            'default': true
        },
        'adminOn':
        {
            'label': 'If enable adminTool: ',
            'type': 'checkbox',
            'default': false
        },
        'altCSS':
        {
            'label': 'The alternative CSS',
            'type': 'textarea',
            'default': ''
        },
        'twOn':
        {
            'label': 'If enable Chinese time format: ',
            'type': 'checkbox',
            'default': true
        },
        'navFix':
        {
            'label': 'If fix page-navigation position',
            'type': 'checkbox',
            'default': true
        },
        'bqOn':
        {
            'label': 'If enable betterquote',
            'type': 'checkbox',
            'default': true
        }
    },
    'events':
    {
        'init': function () {
            dynamicparts();
        },
        'open': function () {
            /* document.getElementById('GM_config').style = ''; */
        },
        'save': function () {
            alertNotice('Reload to active!', 1000);
        },
        'close': function () {
        }
    },
    'css': '#GM_config {position: static !important; width: 99% !important; margin: 1.5em auto !important; border: 0 !important;;}'
    /* 'frame': gmconfigDiv */
});

function dynamicparts() {
    /* init foobar varibles */
    var i = 0, k = 0, tmp = null;

    /* Initilize for switchers */
    function nullHandler() {  /* useless for now */
        return false;
    }
    var currentCSS;
    currentCSS = document.createElement('style');
    currentCSS.type = 'text/css';
    currentCSS.id = 'currentcss';
    if(currentStyle === 'day') {
        currentCSS.innerHTML = GM_config.get('altCSS');
        parseframescss(frameDayCSS);
    } else {
        currentCSS.innerHTML = nightCSS;
        parseframescss(frameNightCSS);
    }
    htmlHead.appendChild(currentCSS);  /* initialize alternative CSS */

    function parseframescss(targetCSS) {
        var i, k;
        for (k = 0; k < window.top.frames.length; k++) {
            (function recursive(tmpWindow) {
                tmpWindow.document.getElementsByTagName('style')[0].innerHTML = targetCSS;
                for (i = 0; i < tmpWindow.frames.length; i++) {
                    tmpWindow.frames[i].document.getElementsByTagName('style')[0].innerHTML = targetCSS;
                    if (tmpWindow.frames[i].frames.length) {
                        tmpWindow = tmpWindow.frames[i];
                        recursive(tmpWindow);
                    }
                }
                return false;
            })(window.frames[k]);
        }
    }        
    function cssSwitchHandler() {
        if (currentStyle === 'day') {
            currentCSS.innerHTML = nightCSS;
            parseframescss(frameNightCSS);
            document.getElementById('cssswitcher') .innerHTML = 'CSS on';
            GM_setValue('gm_currentstyle', 'night');
        } else {
            currentCSS.innerHTML = GM_config.get('altCSS');
            parseframescss(frameDayCSS);
            document.getElementById('cssswitcher') .innerHTML = 'CSS off';
            GM_setValue('gm_currentstyle', 'day');
        }
    }

    /* init dynamic toolbar links */
    if (currentStyle === 'day') {
        classToolbar.innerHTML += '<span id="cssswitcher" >CSS off</span>';
    } else {
        classToolbar.innerHTML += '<span id="cssswitcher" >CSS on</span>';
    }
    if (GM_config.get('wpOn')) {
        classToolbar.innerHTML += '<span id="writepadswitcher" >writepad</span>';
    }
    classToolbar.innerHTML += '<span id="settingswitcher" >SETTING</span>';
    classToolbar.appendChild(fbAnchor);
    document.getElementById('cssswitcher') .addEventListener('click', cssSwitchHandler, false);
    document.getElementById('settingswitcher') .addEventListener('click', function () {
        GM_config.open();
    }, false);

    /*  add class threadfly */
    var divThreads, divThreadsName, divThreadsStyle, bqOP, bqOPPic, classThreadfly;
    divThreads = document.getElementById('right_content') .getElementsByTagName('div');
    k = 1;
    for (i = 0; i < divThreads.length; i++) {
        divThreadsName = divThreads[i].className;
        divThreadsStyle = divThreads[i].style;
        if (GM_config.get('twoupOn')) {
            if (divThreadsStyle.clear.search('both') !== -1) {  /* del nonsense clear:both */
                if (k === 1) {
                    divThreadsStyle.clear = 'none';
                }
                k *= -1;
            }
        }
        if (divThreadsName.search('threads') !== -1) {
            divThreads[i].classList.add('threadfly');
        }
    }
    classThreadfly = document.getElementsByClassName('threadfly');
    for (i = 0; i < classThreadfly.length; i++) {  /* add class originpost and originpost-pic*/
        bqOP = classThreadfly[i].getElementsByTagName('blockquote')[0];
        bqOPPic = classThreadfly[i].getElementsByTagName('a')[0];
        bqOP.classList.add('originpost');
        bqOPPic.classList.add('originpost-pic');
    }

    function disablescroll(e) {
        e.preventDefault();
        e.returnValue = false;
    }

    if (GM_config.get('menuHide')) {
        owCSS.innerHTML += '#menu {left: -125px; opacity: 0; transition: all 0.66s ease-in-out; padding: 0 0 0 1em; overflow: hidden; height: 100%}';
        function scrollmenu(e) {
            var delta, idMenu;
            idMenu = document.getElementById('menu');
            if (!e && window.event) {
                e = window.event;
            }
            if (e.wheelDelta) {
                delta = e.wheelDelta / 30;
            } else {
                delta = - e.detail * 10;
            }
            idMenu.scrollTop -= delta;
        }

        /* initialize left menu */
        var menuBlock, idRightContent, idMenu;
        idRightContent = window.document.getElementById('right_content');
        idMenu = window.document.getElementById('menu');
	if(GM_config.get('twoupOn')) {
            idRightContent.style.margin = 0;  /* fix right_content */
	} else {
            idRightContent.style.margin = '';  /* overwrite dynamic generated style */
	}
        idMenu.style.margin = idMenu.style.padding = idMenu.style.overflow = '';  /* overwrite dynamic generated style */
        idMenu.style.left = '-125px';  /* overwrite dynamic style */
        menuBlock = window.document.createElement('span');  /* dirty hack, depend on dynamic generate height */
        menuBlock.innerHTML = '<br />';
        idMenu.appendChild(menuBlock);
        idMenu.onmouseover = function () {
            window.addEventListener('DOMMouseScroll', disablescroll, false);
            window.onmousewheel = window.document.onmousewheel = disablescroll;
            idMenu.addEventListener('DOMMouseScroll', scrollmenu, false);
            idMenu.style.left = '0px';
            idMenu.style.opacity = 1;
        };
        idMenu.onmouseout = function () {
            window.removeEventListener('DOMMouseScroll', disablescroll, false);
            window.onmousewheel = document.onmousewheel = null;
            idMenu.style.left = '-125px';
            idMenu.style.opacity = 0;
        };
    }

    if (GM_config.get('adminOn')) {  /* enable hidden adminTools */
        var classAdminTool = document.getElementsByClassName('adminTool');
        for (i = 0; i < classAdminTool.length; i++) {
            classAdminTool[i].style.display = 'inline';
        }
    }

    if (GM_config.get('twoupOn')) {
        owCSS.innerHTML += '.threadfly {width: 45%; float: left; margin-left: 1%; margin-bottom: 2em;}';
        owCSS.innerHTML += '.threadfly table font {display: none;}';
        owCSS.innerHTML += '.rthreads {border-left-width: 15px; border-left-style: solid; padding: 0 0 0 2%; margin: 0 0 2em 2%;}';
        /* dirty hack, check if in thread reply page */
        if (classThreadfly.length === 1) {
            owCSS.innerHTML += '.threadfly {width: 80%; margin: 2em 10%; } .threadpost {padding: 0 5em;}';
        }

        /* remove all hr */
        owCSS.innerHTML += 'hr {display:none;}';

        /* add left border and related */
        k = -1;
        for (i = 0; i < classThreadfly.length; i++, k *= -1) {
            if (k === 1) {
                classThreadfly[i].classList.add('rthreads');
            }
        }
    }

    if (GM_config.get('twOn')) {
        owCSS.innerHTML += '.posttime {margin-left: 0.5em;} p, body {margin: 0;} ';

        /* use good time format */
        var tmpWeekdayPost, tmpMonthPost, tmpDayPost, objDate;
        var classPosttime = document.getElementsByClassName('posttime');
        for (i = 0; i < classPosttime.length; i++) {
            tmp = classPosttime[i].innerHTML;
            tmpWeekdayPost = tmp.substr(0, 3);
            tmpMonthPost = tmp.substr(4, 3);
            tmpDayPost = tmp.substr(8, 2);
            tmp = tmpWeekdayPost + ', ' + tmpDayPost + ' ' + tmpMonthPost + tmp.slice(10, - 5);
            objDate = new Date(tmp);
            classPosttime[i].innerHTML = '<span>' + objDate.toLocaleDateString() + ' ' + objDate.toLocaleTimeString('zh-CN', 'Asia/Berjing') + '</span><br />';
        }
    }

    if (GM_config.get('navFix')) {
        /* replace the page navigation */
        var key, tableNavigation;
        tableNavigation = document.getElementsByTagName('table');
        key = tableNavigation.length -1;  /* dirty hack, may failed later */
        if (tableNavigation[key].align === 'left') {
            tableNavigation[key].classList.add('nav-bottom');
            tableNavigation[key].align = '';
        }
    }

    if (GM_config.get('hboxOn')) {
        /* Use hbox to popup the Images
 * Rewrite from:  http://www.codeproject.com/Articles/32819/JavaScript-Image-Popup
 * Start Initializing
 */
        var hboxLoadImage = 'url("data:image/gif;base64,R0lGODlhyAAyAKECAI0gF/z9+v8AAP8AACH/C05FVFNDQVBFMi4wAwEAAAAh/iRDcmVhdGVkIHdpdGggR0lNUCwKYnkgZG9vbXJlZEBnaXRodWIAIfkEBQoAAgAsAAAAAMgAMgAAAv6Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ymUwkAyKIV6YLKwGa0z6yVEg2Lx+MG10BOK8LmL+bcTcAf6TrZu7az5fPAfuvGpDcYiEZYh8d35/Dnd1jY1vWImAfp5aZnKGHneDjRF+dYBVqJkCm6qWZKejC5iFQIZ2k4W8r4xRqpGOH6WtSI2goKfFv7l5vYeboaO0c81Mj1LFy724ZbfUm9TH0FOS0kjV0NbuuN6Zl3zuv8jdxzjA3RK3bNPGi+muq+/vS+3UubPmb2aD0iqC5fEHq+aH1qFy0QuHrK0jlMaA0aQ8+KCNk1K6OpoyKOnUR2w2iSSMRsKUepOvOM0sWZ9+glkcXy5Js7bGDilIIF6MGaAWE1QzkQkFArTCU6C2kQX0uIN/kZTMZhZUZvRDlNdZdzB0SSSDVobSlsK012oYKNJBd2njinxtA11Zmq7TBW5VwmxYsxXtO4bv2hu1ewQ0SFfNYG/QdV0mC67UAIZjyQVN+yTVRVmmtZC1VdxSAXdkJWYGTFj8Hekmv6dNsLhHltopMt9urZvHv7/g08uPDhxIsbP448ufLlzJs7fw49RgEAIfkEBQoAAwAsIgAOAIcAGgAAAv6cjwOQ7Q+jYjLRtmCucXN3fdNCliYpGieqYkqXxl/I0bP8sAhjtz0Ow/V4qyJPdpIcDz/gzDgqgl630K+pmZqiW2cMqxUtVUnqd0sbd6DckmX6zoJ3Zm8tXJnnmPUWvamm1Pemd+eXRZiiFmg1+CfmyFcIcwFmEyiY5uKTCQkYibiZmAeKJ0lHRmok9XmJ5jYadzf5MkdbGhorl0u2sfrouUr0q9spaolLNdlIi2lX6yl6aCo7vejovMtXbOxEQQTqvOTBeeoi1ZbRCFfl9X2UHU/o+6ophFrNdPUMr7xtns9Otj3r2H17NgsYwBrD6nGjhG/eQIS6GCVjt5Div09N5PZQvKapmbJKF4FgmQjtYzKUCseVvLeDWSuNFh9Sm1BOI76DqDrqbDmI5cZzPyP6PMRMJ0uhStQVlaSn462EKW3CfKryZyFLtqamglAAACH5BAUKAAMALK8AIgAMAAMAAAIJhIdpC6nc3FgFACH5BAUKAAMALMEAIgADAAMAAAIDhH8FADs=")';
        var hboxDiv = document.createElement('div');
        hboxDiv.id = 'thebox';
        hboxDiv.style.backgroundImage = hboxLoadImage;
        var hboxbgDiv = document.createElement('div');
        hboxbgDiv.id = 'box-bg';
        hboxbgDiv.appendChild(hboxDiv);
        document.body.appendChild(hboxbgDiv);

        /* add hboxstuff style */
        var hboxStyle = document.createElement('style');
        hboxStyle.type = 'text/css';
        hboxStyle.id = 'hboxcss';
        hboxStyle.innerHTML = hboxCSS;
        htmlHead.appendChild(hboxStyle);
        function hboxCloseHandler(e) {
            var eventSender;
            if (!e && window.event) {
                e = window.event;
            }
            eventSender = (window.event) ? e.srcElement : e.target;
            if (eventSender.id === 'thebox' || eventSender.id === 'box-bg') {
                hboxDiv.style.visibility = 'hidden';
                hboxbgDiv.style.visibility = 'hidden';
                hboxDiv.style.position = '';
                window.removeEventListener('DOMMouseScroll', disablescroll);
                window.onmousewheel = document.onmousewheel = null;
                hboxDiv.style.backgroundImage = hboxLoadImage;  /* revoke the loading gif */
            }
        }
        function scrollimage(e) {
            var delta, idThebox, topThebox;
            if (!e && window.event) {
                e = window.event;
            }
            if (e.wheelDelta) {
                delta = e.wheelDelta / 10;
            } else {
                delta = - e.detail * 30;
            }
            idThebox = document.getElementById('thebox');
            topThebox = parseInt(idThebox.style.top.slice(0, - 2), 10);
            topThebox += delta;
            idThebox.style.top = topThebox + 'px';
        }
        function imageOnloadHandler() {
            /* image resize on oversized */
            var idThebox, idImageinbox, idBoxBg, heightPic, heightWindow, widthWindow, widthPic;
            idImageinbox = document.getElementById('imageinbox');
            heightPic = idImageinbox.clientHeight;
            widthPic = idImageinbox.clientWidth;
            heightWindow = window.innerHeight || document.documentElement.offsetHeight;
            widthWindow = window.innerWidth || document.documentElement.offsetWidth;
            if (heightPic > heightWindow && (widthPic / heightPic) < 0.8) {  /* over 8:10, make scrollable */
                idImageinbox.width = widthWindow - 80;  /* 80 is MAGIC */
                idThebox = document.getElementById('thebox');
                idBoxBg = document.getElementById('box-bg');
                idThebox.style.left = '40px';
                idThebox.style.top = 0;
                idThebox.style.position = 'fixed';
                idBoxBg.addEventListener('DOMMouseScroll', scrollimage, false);
                window.addEventListener('DOMMouseScroll', disablescroll, false);  /* disable window scroll event */
                window.onmousewheel = document.onmousewheel = disablescroll;
                alertNotice('Use Mouse Wheel to ajust!', 1500);
            } else if (heightPic > heightWindow) {
                idImageinbox.height = heightWindow - 50;  /* 50 is MAGIC */
                alertNotice('The image is ' + parseInt(idImageinbox.height / heightPic * 100) + '% shrinked', 3000);
            } else if (widthPic > widthWindow) {
                idImageinbox.width = widthWindow - 50;
                alertNotice('The image is ' + parseInt(idImageinbox.width / widthPic * 100) + '% shrinked', 3000);
            }
            hboxDiv.style.backgroundImage = '';  /* remove the loading gif */
        }
        function hboxLauncher(e) {
            var eventSender, imageSource, hboxImg;
            if (!e && window.event) {
                e = window.event;
            }
            eventSender = (window.event) ? e.srcElement : e.target;
            eventSender = eventSender.parentNode;
            /* cant click empty anchor */
            imageSource = eventSender.rel;
            hboxbgDiv.addEventListener('click', hboxCloseHandler, false);
            hboxDiv.style.visibility = 'visible';
            hboxbgDiv.style.visibility = 'visible';
            hboxImg = document.createElement('img');
            hboxImg.id = 'imageinbox';
            hboxImg.src = imageSource;
            hboxImg.onload = imageOnloadHandler;
            hboxDiv.innerHTML = '';
            hboxDiv.appendChild(hboxImg);
        }
        /* anchor @thread image parse */

        var imgThread, anchorThread;
        for (k = 0; k < classThreadfly.length; k++) {
            anchorThread = classThreadfly[k].getElementsByTagName('a');
            for (i = 0; i < anchorThread.length; i++) {
                imgThread = anchorThread[i].getElementsByTagName('img');
                if (imgThread.length) {  /* fix the origin anchor */
                    anchorThread[i].rel = anchorThread[i].href;
                    anchorThread[i].addEventListener('click', hboxLauncher, false);
                    anchorThread[i].target = '';
                    anchorThread[i].href = 'javascript:void(0);';  /* dirty hack, use span instead */
                }
            }
        }
        function imageparse(targetObj) {  /* make anchor useless and parse image */
            var imgThread, anchorThread;
            anchorThread = targetObj.document.getElementsByTagName('a');
            for (i = 0; i < anchorThread.length; i++) {
                imgThread = anchorThread[i].getElementsByTagName('img');
                if (imgThread.length) {  /* fix the origin anchor */
                    anchorThread[i].rel = anchorThread[i].href;
                    anchorThread[i].addEventListener('click', hboxLauncher, false);
                    anchorThread[i].target = '';
                    anchorThread[i].href = 'javascript:void(0);';  /* dirty hack, use span instead */
                }
            }
        }
    }

    if (GM_config.get('wpOn')) {
        function padSwitchHandler() {
            if (padDisplay) {
                padDisplay = 0;
                padDiv.style.display = 'none';
            } else {
                padDisplay = 1;
                padDiv.style.display = 'inline';
            }
        }

        owCSS.innerHTML += '#postform_tblabandon p {line-height: 1.5em; padding-bottom: 2em;}';
        owCSS.innerHTML += '#writepad {border: 2px solid; background-color: #a09797;}';
        owCSS.innerHTML += '#writepad-close:hover {cursor: pointer; text-decoration: underline;}';
        owCSS.innerHTML += '#writepad-close {width: 100% ; color: white; background-color: #810400; text-align: center; font-weight: bold; font-size: 1.5em;}';
        /* add writepad */
        var padDisplay, idPostformMain, padDiv;
        padDisplay = 0;
        idPostformMain = document.getElementById('postform_main') .innerHTML;
        padDiv = document.createElement('div');
        padDiv.id = 'writepad';
        /* replace origin element */
        var idToAbandon, padListAbandon;
        padListAbandon = [
            'postform_tbl',
            '_csrf',
            'emotion',
            'content',
            'postform_main'
        ];
        for (i = 0; i < padListAbandon.length; i++) {
            idToAbandon = document.getElementById(padListAbandon[i]);
            idToAbandon.id += 'abandon';  /* abadon original id, move into pad smoothly */
        }

        /* rebuild the postform_main */
        var padForm = document.createElement('form');
        padForm.id = 'postform_main';
        padForm.enctype = 'multipart/form-data';
        padForm.method = 'post';
        padForm.action = '/综合版1/create';
        padForm.innerHTML = idPostformMain;
        /* hide origin form at top */
        var trBad = document.getElementById('postform_tblabandon') .getElementsByTagName('tr');
        for (i = 0; i < trBad.length -1; i++) {
            /* save the notice board */
            trBad[i].style.display = 'none';
        }

        /* add a close button */
	var padClose = document.createElement('div');
	padClose.id = 'writepad-close';
	padClose.innerHTML = 'CLOSE';
	padClose.addEventListener('click', padSwitchHandler, false);
        padDiv.appendChild(padClose);

        /* style the writepad */
        padDiv.style.position = 'fixed';
        padDiv.style.top = '50px';
        padDiv.style.left = '50px';
        padDiv.id = 'writepad';
        padDiv.style.display = 'none';
        padDiv.appendChild(padForm);
        document.body.appendChild(padDiv);
        makegrabbable(padDiv);  /* make the pad grabbable */
        if (GM_config.get('wpOn')) {
            document.getElementById('writepadswitcher') .addEventListener('click', padSwitchHandler, false);
        }
    }

    if (GM_config.get('bqOn')) {
        /* remove refView divbox */
        var idRefView = window.top.document.getElementById('refView');
        if (idRefView) {
            window.document.body.removeChild(idRefView);
        }
        function callResize(objWindow) {
            var frameWinList, frameList, heightNew, widthNew;
            frameWinList = objWindow.frames;
            frameList = objWindow.document.getElementsByTagName('iframe');
            for (i = 0; i < frameWinList.length; i++) {
                heightNew = frameWinList[i].document.getElementsByTagName('table')[0].clientHeight + 8;  /* 8 is MAGIC */
                widthNew = frameWinList[i].document.getElementsByTagName('table')[0].clientWidth + 5;  /* 5 is MAGIC */
                frameList[i].style.height = heightNew + 'px';
                frameList[i].style.width = widthNew + 'px';
                frameList[i].scrolling = 'no';
            }
        }
        function betterquote(targetObj) {
            /* betterQuote display */
            var numFrames, quoteFrame, quoteFrameParent, fontBar, tmpColor, quoteFrameSrc, tpBar;
            numFrames = 0;
            quoteFrame = [
            ];
            quoteFrameParent = [
            ];
            tpBar = targetObj.document.getElementsByClassName('threadpost');
            for (k = 0; k < tpBar.length; k++) {
                fontBar = tpBar[k].getElementsByTagName('font');
                for (i = 0; i < fontBar.length; i++) {
                    tmpColor = fontBar[i].color;
                    if (tmpColor.search('789922') !== -1) {  /* replace font with iframe tag */
                        tmp = fontBar[i].innerHTML;
                        tmp = tmp.substr(tmp.search('No') + 3);
                        if (!isNaN(parseInt(tmp, 10))) {  /* abandon on nonsense */
                            numFrames += 1;
                            quoteFrameSrc = 'http://h.acfun.tv/homepage/ref?tid=' + tmp;
                            quoteFrame[i] = document.createElement('iframe');
                            quoteFrame[i].src = quoteFrameSrc;
                            quoteFrame[i].onload = frameOnloadHandler;  /* use onload Handler, instead of checkonload */
                            quoteFrameParent[i] = fontBar[i].parentNode;
                            quoteFrameParent[i].replaceChild(quoteFrame[i], fontBar[i]);
                            i--;  /* dirty hack, onSuccess, fontBar.length will minus one */
                        } else {
                            fontBar[i].color = 'blue';  /* recolor nonsense quotes */
                        }
                    }
                }
            }
            if (numFrames) {
                return 1;
            }
            return false;
        }
        function styletheframe(targetObj) {
            /* insert css into iframe */
            var headFrame, iframeCSS, tdFirst, anchorInFrame;
            if (!targetObj.document.getElementsByClassName('fivehundred') .length) {  /* handle 40x page */
                headFrame = targetObj.document.getElementsByTagName('head')[0];
                iframeCSS = document.createElement('style');
                iframeCSS.type = 'text/css';
                iframeCSS.id = 'framecss';
    		if(currentStyle === 'day') {
        	    iframeCSS.innerHTML = frameDayCSS;
    		} else {
        	    iframeCSS.innerHTML = frameNightCSS;
    		}
                /* add condition on css switch */
                headFrame.appendChild(iframeCSS);
                tdFirst = targetObj.document.getElementsByTagName('td')[0];
                tdFirst.parentElement.removeChild(tdFirst);
                anchorInFrame = targetObj.document.getElementsByTagName('a');
                for (i = 0; i < anchorInFrame.length; i++) {  /* fix in_frame link */
                    anchorInFrame[i].target = '_top';
                }
            } else {
                targetObj.document.body.innerHTML = 'QUOTE_ERROR';
                /* EDGE handler */
                window.alert('HOLLLY SHIT!! It looks like you have met some boobs not able to handle the quote usage, please either hate them or blame monkeys@h.acfun.tv for not setting just a timeoutID for 40x pages\' nonsense setTimeout() event.');
                if (window.confirm('YES: Automatic open current into new tab, i.e: to save yourselves. NO&Cancel: Waiting for the doomsday.')) {
                    GM_openInTab(window.location.href);
                }
            }
        }
        function frameOnloadHandler(e) {
            var eventSender, windowCaller, tmp, mainFrameKey, recurKey, tmpWindow, fontBar, tmpBuffer;  /* gl: mainFrameList, quoteSize */
            if (!e && window.event) {
                e = window.event;
            }
            eventSender = (window.event) ? e.srcElement : e.target;
            windowCaller = eventSender.contentWindow || eventSender;
            if (GM_config.get('hboxOn')) {
                imageparse(windowCaller);
            }

            /* get mainFrameId */
            tmp = windowCaller;
            while (tmp.name === '' || tmp.name.search('iframe') === -1) {
                tmp = tmp.parent;
            }
            mainFrameKey = tmp.name.substr(7);
            recurKey = mainFrameList[mainFrameKey];
            mainFrameList.splice(mainFrameKey, 1, recurKey + 1);
            if (mainFrameList[mainFrameKey] < GM_config.get('quoteSize')) {
                if (!betterquote(windowCaller)) {
                    styletheframe(windowCaller);
                    tmpWindow = windowCaller.parent;
                    while (window.top !== tmpWindow) {
                        styletheframe(tmpWindow);
                        callResize(tmpWindow);
                        tmpWindow = tmpWindow.parent;
                    }
                    setTimeout(function () {
                        callResize(window);
                    }, 500);  /* dirty hack, MAGIC reduce error */
                }
            } else {
                fontBar = windowCaller.document.getElementsByTagName('font');
                for (i = 0; i < fontBar.length; i++) {
                    if (fontBar[i].color === '#789922') {
                        fontBar[i].title = 'Reached quoteSize limit.';
                        tmpBuffer = fontBar[i].innerHTML;
                        tmpBuffer = tmpBuffer.substr(tmpBuffer.search('No') + 3);
                        fontBar[i].onclick = function () {
                            GM_openInTab('http://h.acfun.tv/homepage/ref?tid=' + tmpBuffer);
                        };
                    }
                }
                styletheframe(windowCaller);
                tmpWindow = windowCaller.parent;
                while (window.top !== tmpWindow) {
                    styletheframe(tmpWindow);
                    callResize(tmpWindow);
                    tmpWindow = tmpWindow.parent;
                }
                callResize(window);
            }
        }

        /* betterquote @window */
        var mainFrameKey, mainFramList, quoteFrame, quoteFrameParent, fontBar, tmpColor, quoteFrameSrc, tpBar;
        mainFrameKey = 0;
        mainFrameList = [];
        quoteFrame = [];
        quoteFrameParent = [];
        tpBar = window.document.getElementsByClassName('threadpost');
        for (k = 0; k < tpBar.length; k++) {
            fontBar = tpBar[k].getElementsByTagName('font');
            for (i = 0; i < fontBar.length && i >= 0; i++) {  /* left when parsed all */
                tmpColor = fontBar[i].color;
                if (tmpColor.search('789922') !== -1) {  /* replace font with iframe tag */
                    tmp = fontBar[i].innerHTML;
                    tmp = tmp.substr(tmp.search('No') + 3);
                    if (!isNaN(parseInt(tmp, 10))) {  /* abandon on nonsense */
                        mainFrameList.push(0);
                        quoteFrameSrc = 'http://h.acfun.tv/homepage/ref?tid=' + tmp;
                        quoteFrame[i] = document.createElement('iframe');
                        quoteFrame[i].src = quoteFrameSrc;
                        quoteFrame[i].name = 'iframe_' + mainFrameKey;
                        quoteFrame[i].onload = frameOnloadHandler;  /* use onload Handler, instead of checkonload */
                        quoteFrameParent[i] = fontBar[i].parentNode;
                        quoteFrameParent[i].replaceChild(quoteFrame[i], fontBar[i]);
                        mainFrameKey += 1;
                        i--;  /* dirty hack, onSuccess, fontBar.length will minus one */
                    } else {
                        fontBar[i].color = 'blue';  /* recolor the nonsense */
                    }
                }
            }
        }
    }
}
