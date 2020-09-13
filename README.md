# covid

You'll need to be ready with your covid test registration form:
https://test-for-coronavirus.service.gov.uk/register/

Fill in all your details until you get to the point where you choose between sites that are "walk-through" and "drive-through".

Open your browser console and check the network tab, when you click to change site there's a new newtwork call to the test site availability server. 
Inspect that call (NB - make sure it's the one that asks for what you want, i.e. drive-trhough or walk-through) then:
1. copy the `x-urlcode` header and replace the value of const `X_URLCODE` in main.js
2. copy the ajax payload (from source) and add to the `PAYLOAD` const in main.js
3. adjust values in `MAX_DISTANCE_IN_MILES` & `IDEAL_DISTANCE`. If something is in your ideal distance, the mac will say "success", then ame of the place, how far it is (According to gov.uk calculations, which are quite a bit off at times, but still workable) and how many appointment slots there are. If it's not within the ideal distance, it will give you the same information, but it won't say "success". if beyond the max distance, it will simply log that there were far away places found, but won't alert you by speaking.

To run it:
`$ make run`
or
`$ node main.js`

NB - make sure the computer volume is up. When running the script it will speak out loud so you know it's started and you can confirm you can hear it.

when computer calls out "success" or anything.. go back to your browser and keep switching until you get a good response (they are often too busy and return 249 without giving an error message) and book your test :)