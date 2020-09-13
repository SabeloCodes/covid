# Help getting a COVID test appointment in the UK
If you need to get your hands on an appointment for a walk-in or drive-through COVID test in the UK, and are finding it difficult because appontments come up at random time, with no warning and then they are gone within a minute...  

This script can keep pinging the test centre availability endpoint for you and alert you (it will speak, nothing more elaborated than that) when there are spots available near your location.

### NB
This works as of 13th September 2020. Any changes in the formatting or workflow in the gov.uk service for booking a test will make this script fail, so there is no guarantee that this will keep working indefinitely. In fact, it may stop working at any time.  

### Prerequisites:
Node.js

This works fine on a mac, it should work in linux & windows, too, but I have not tried)

### How to set it up:
- check out the code
- run `$ npm install` in the root folder of the repository 

##### Set up the web form.

You'll need to be ready with your [covid test registration form](https://www.gov.uk/get-coronavirus-test) - fill in all your details until you get to the point where you choose between sites that are "walk-through" and "drive-through".

##### Set up header & payload for your request

Open your browser console and check the network tab, when you click to change site there's a new newtwork call to the test site availability server. 
Inspect that call (NB - make sure it's the one that asks for what you want, i.e. drive-through or walk-through) then:
In the file main.js
1. copy the `x-urlcode` header and replace the value of const `X_URLCODE`
2. copy the ajax payload (from source) and add to the `PAYLOAD` const

##### Adjust your distance preferences

Adjust values in `MAX_DISTANCE_IN_MILES` & `IDEAL_DISTANCE` in main.js. 
Anything beyond the MAX distance will be disregarded.
Anything below the MAX distance, will alert you with:
- name of test site, 
- how many available slots there are,
- how far it is from your location (according to tyhe gov.uk algorithms)
Anything within your ideal distance, will prepend the above information with the word `SUCCESS`!


##### Run the script
`$ node main.js`

NB - make sure the computer volume is up. When running the script, it will immediately speak out loud so you know it's started and you can confirm you can hear it. If you can't.. check volume etc...

##### Sit back and liesten out for any calls
When the script gets a response with availability near you, the computer will speak.. Be sure to be around, go back to your browser and keep switching between drive-through/walk-through until you see the available sites. At this point.. job done, continue with your booking. 

FYI - You may need to switch between options several times as when the endpoint is too busy (returns 249 - too many calls response) all you'll see is "no sites found".
Good luck!

