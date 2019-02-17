# Native Data Grid
A DataGrid with Native components.
The idea was to create a data grid that only use native components.

### How to install:
```
git clone https://github.com/farebord/nativedatagrid
cd nativedatagrid
npm i
npm start
```

### How to tests / see coverage
```
npm test
npm run coverage
```

##### To do:
- Add missing tests (actions, reducer and Example component) to reach 100% coverage.
- Finish renderEdit prop in order to catch save or cancel when keyDown or other events
- ...

### DataGrid
| Prop             | Type                    | Required | Information                                       |
| ---------------- |:-----------------------:|:--------:|:-------------------------------------------------:|
| columns          | array                   | yes      | Columns that will be rendered                     | 
| data             | arrayOf({id: Required}) | no       | Data to display. Id is required in every row      |
| loading          | boolean                 | no       | Display a loading message                         |
| loadingMessage   | string                  | no       | Text shown when loading is set as true            |
| noDataMessage    | string                  | no       | Text shown when there is no data                  |
| editable         | boolean                 | no       | Enables cell edit                                 |
| selectable       | boolean                 | no       | Adds a column with checkbox to select rows        |

| Events           | Type                    | Required | Information                                       |
| ---------------- |:-----------------------:|:--------:|:-------------------------------------------------:|
| onSelectedChange | func                    | no       | Returns an array with selected rows id            | 
| onCellChange     | func                    | yes      | Returns the object with the column changed        |
| onCellCancel     | func                    | yes      | Returns the row and the value that was canceled as second argument   |

### Cell
| Prop             | Type                    | Required | Information                                       |
| ---------------- |:-----------------------:|:--------:|:-------------------------------------------------:|
| value            | any                     | no       | The value to be displayed                         | 
| type             | string                  | no       | Value type. For eg: img renders and img tag       |
| editable         | boolean                 | yes      | Forces cell to be editable                        |
| renderValue      | func                    | no       | Function that returns how to render the value     |
| renderEdit       | func                    | no       | Function that returns how to edit the value       |

| Events           | Type                    | Required | Information                                       |
| ---------------- |:-----------------------:|:--------:|:-------------------------------------------------:|
| onCancel         | func                    | yes      | Returns the value canceled when Escape is pressed | 
| onChange         | func                    | yes      | Returns the value changed when input is blur      |
