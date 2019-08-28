import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  // Services
  csv: service(),

  
  // Data
  data: computed(function() {
    return [
      ['Column 1', 'Column 2', 'Column 3'],
      ['foo', 'bar', 'baz'],
      ['foobar', 'barbar', 'bazbar'],
    ];
  }),


  // Actions
  actions: {
    downloadCSV(data) {
      this.csv.export(data, {fileName: 'demo.csv'});
    },
  }

});
