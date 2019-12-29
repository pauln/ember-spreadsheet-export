'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-cli-csv',

	treeForVendor(defaultTree) {
 		var browserVendorLib = new Funnel(path.join('./vendor'), { files: ['Blob.js', 'FileSaver-1.3.3.js', 'jszip-0.10.8.js' ] });
    browserVendorLib = map(browserVendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }` );
    return new MergeTrees([defaultTree, browserVendorLib], { overwrite: true });
	},

  included() {
  	this._super.included.apply(this, arguments);
    this._ensureThisImport();

    this.import('vendor/Blob.js');
    this.import('vendor/FileSaver-1.3.3.js');
		this.import('vendor/jszip-0.10.8.js');
  },


  _ensureThisImport: function() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        var current = this;
        var app;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        var app = this._findHost();
        app.import(asset, options);
      };
    }
  }

  // isDevelopingAddon() {
  //   return true;
  // }
};
