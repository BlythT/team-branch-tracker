# Team Branch Tracker
See who's working on what, when, where, and how... or something along those lines

### Front-End
- [x] Basic drag and drop lists
- [x] Dynamicly populate "people" and "teams" based on config (state stand-in)
- [x] Port to Vue
- [ ] Finalise data format for "people" and "teams"
- [ ] Render "people" in their assigned teams when loading from config (state stand-in)
- [ ] Send state in full over websocket whenever change is made
- [ ] Update state live whenever state recieved from websocket
- [ ] Add config to point at git branch and display time since last commit, commit author, etc
- [ ] Update styling
- [ ] Add navigation
- [ ] Add animation (https://github.com/SortableJS/Vue.Draggable or https://www.npmjs.com/package/vue-drag-n-drop ?)
- [ ] ? Recieve only updates (this might be more trouble than it's worth for a simple project)

### Back-End
- [ ] Create server that can talk to client
- [ ] Set up websocket communication
- [ ] Broadcast state in full whenever recieved from client
- [ ] Add database or other storage method to persist the state
- [ ] ? Broadcast only updates (this might be more trouble than it's worth for a simple project)