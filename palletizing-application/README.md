# PalletizingApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## How to run this application?

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## how to run the application?

- On running, the Initial page will appear by default.
- click on next button to get started,
- By default left settings panel will be activated, choose object-type, dimensions and number of object you want to insert on pallet and then press save.
- On save, it will toggle the settings button and disable left panel activating right side (pallet board setting) to edit.
- Use the orientation buttons to select object orientation to be placed (by default HORIZONTAL will be selected),
- Use the + button to add the object in the pallet.
- When the pallet board is full, it will show alert message when trying to add more pallet which cant be inserted in remaining space.
- Click on any inserted object to select it,
- On selecting, the clone and delete buttons will appear. the delete button will delete the selected object from the pallet while clone will insert a copy of selected to the end of the object list
- When the number of objects in the pallet box matches with the input settings from the left panel, the save button will get enabled itself (otherwise it will stay disabled),
- On pressing save button, the values from the pallet will be forwarded to next (final) page.
- The final page will simply display data with a restart button to restart the application from the begining again.

# About the application

- it uses bootstrap css for easy and fast layout development, its imported through cdn in src/index.html file,
- it uses font-awesome for icons, the library is kept inside assets/font-awesome directory and imported through angular.json file.
- it uses images for complex image-type buttons, all the images are stored inside assets/images directory
- application starts from app.component.ts file which makes use of other smaller components
- all the custom styles are available in src/styles.css file

# way of approach

- Scanned the requirements and thought about the feasibility (passed except some doubts about the object values x and y),
- I try for the completion first so chosen angular,
- Tried to do with custom styling but realised bootstrap can help a lot.
- Researched about the toggle button, updated style to match the requirement,
- Created Initial static page and kept aside in a component,
- Started joining elements piece by piece for the left panel,
- Researched about the positions methods (not very known to these methods), found getBoundingClientRect method very useful for our case.
- Asked for clarification about the doubt,
- Continued for x,y calculation then added the boundary limitation.
- Created last page with the informations from main page.

# known issues

- the object values (x and y) seems to be not properly comming as expected, thorough testing is required,
- working on drag-drop feature

---

### Update

# in second try

---

1. Completely modified the algorithm for pallet dimensition, which helped me to achieve exact middle point as required. (I was looking for this multiplicationFactor from the begining itself, found in the second try.)
2. Drag and drop functionality has been added
3. Updated the Object model to include id and itemNumber for better tracking of object while manipulating, Id will keep every object unique on change of position, while itemNumber is the name of the object. When we copy one object, the itemNumber will be copied while it will get a new Id.
4. Layout design improved to modern view,
5. Components broken down in to multiple (re-designing layout in proper way helped) smaller components stored in components/partials,
6. The last page has selection behaviour. selecting an item will select the object and vise versa.
7. The pallet screen will now always stay in the visible zone. it calculates the maximum size it can be in to be visible in given area maintaining the height and width ratio with original display size.
8. The outer container height of the pallet is maintained to be 550px considernig my own device. The value can be adjusted from the constant stored in src/app/constants/app.constant.ts
9. Added calculated values at places for better understanding of adjusted numbers. eg- below input field.
