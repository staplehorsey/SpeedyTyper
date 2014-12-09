# SpeedyTyper
### A typing game created for Software Development Methods and Tools.

This game includes:
- Multiuser play
- Exciting graphics
- Broad selection of texts

### Repository organization:
The majority of our code is in the app directory, as is typical of a Ruby on Rails website. The models, views, and controllers are in their respective directories. Of special note is the app/assests/javascripts file, where the majority of our client side code is contained. Because of our two mostly distinct code bases and languages, we used two documentation tools JSDoc and Yard. Our Ruby/Yard documentation is contained in the doc directory. The JSDoc and client side code documentation is in the app/assests/javascripts/Documentation directory. 

### To run locally:
- `sudo apt-get install g++ git ruby ruby-dev make libsqlite3-dev`
- `sudo gem install bundler`
- `git clone https://github.com/MattSainz/SpeedyTyper`
- `cd SpeedyTyper && bundle install`
- `rails server`
