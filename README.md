# ember-cli-csv

Export formatted data to a csv file. Forked from [pauln/ember-cli-data-export](https://github.com/roofstock/ember-cli-spreadsheet-export).

## What's Different

- Fastboot compatible
- Removed Excel support (Excel can import a csv)


## Installation

 - ember install ember-cli-csv


## Usage

 - Automatically injects a service csv format
 - Feed a datastructure that's an array of arrays, where each internal array is the set of data to be rendered for that row.
 - Example: [['Title 1', 'Title 2', 'Title 3'],['row1cell1', 'row1cell2', 'row1cell3'],['row2cell1', 'row2cell2', 'row2cell3']]


## Example
 
```
    // Service
    csv: service(),
    
    
    // Data
    data: computed(function() {
      return [
        ['Title 1', 'Title 2', 'Title 3'],
        ['row1cell1', 'row1cell2', 'row1cell3'],
        ['row2cell1', 'row2cell2', 'row2cell3']
      ];
    }),

    
    // Actions
    actions: {
      downloadCSV(data) {
        this.csv.export(data, {fileName: 'file-name-here.csv'});
      }
    }
```