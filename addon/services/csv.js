import Service from '@ember/service';
import optionize from "../utils/utils";
import moment from 'moment';

const defaultConfig = {
  fileName: 'export.csv',
  raw: false,
  separator: ',',
  withSeparator: true
};

export default Service.extend({

  export: function (data, options) {
    options = optionize(options, defaultConfig);

    let csv = this.jsonToCsv(data, options);

    saveAs(new Blob([csv], {type: "data:text/csv;charset=utf-8"}), options.fileName);
  },

  jsonToCsv(objArray, options) {
    let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;

    let str = '';
    let line = '';
    let value;

    if (options.withSeparator) {
      // add separator identifier;
      str += `sep=${options.separator}\r\n`;
    }

    // add heading row
    let head = array[0];
    for (let i = 0; i < head.length; i++) {
      value = head[i] + "";
      if (i > 0) {
        line += options.separator;
      }
      line += this.quoteValue(value, options.raw);
    }

    str += line + '\r\n';

    // add items
    for (let i = 1; i < array.length; i++) {
      line = '';

      for (let index = 0; index < array[i].length; index++) {
        value = array[i][index];

        if (index > 0) {
          line += options.separator;
        }
        if (typeof value === 'object') {
          if (value) {
            let resolveValue = this.getValueFromObject(value)
            line += this.quoteValue(resolveValue, options.raw);
          } else {
            line += this.quoteValue('', options.raw);
          }
        } else {
          value = value + "";
          if (value && value !== 'undefined') {
            line += this.quoteValue(value, options.raw);
          } else {
            line += this.quoteValue('', options.raw);
          }
        }
      }

      str += line + '\r\n';
    }
    return str;
  },

  getValueFromObject(value) {
    let resolveValue;
    if (value._d instanceof Date) {
      // This is an improvised check for a momentjs object
      resolveValue = value.format('YYYY-MM-DD HH:mm:ss')
    } else {
      if (value instanceof Date) {
        resolveValue = moment(value).format('YYYY-MM-DD HH:mm:ss')
      } else {
        resolveValue = value.toString();
      }
    }
    return resolveValue;
  },

  quoteValue(value, raw) {
    return raw ? value : '"' + value.replace(/"/g, '""') + '"';
  },
});
