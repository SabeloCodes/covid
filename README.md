# covid

You'll need to be ready with your covid test registration form:
https://test-for-coronavirus.service.gov.uk/register/

Fill in all your details until you get to the point where you choose between sites that are "walk-through" and "drive-through".

Open your browser console and check the network tab, when you click to change site there's a new newtwork call to the test site availability server. 
Inspect that call (NB - make sure it's the one that asks for what you want, i.e. drive-trhough or walk-through) then:
1. copy the `x-urlcode` header and replace the value of const `xUrlcode` in main.js
2. copy the payload and replace the object in the `data` field in the axios setup code.

To run it:
`$ make run`
or
`$ node main.js`

when computer calls out "success" or anything.. go back to your browser and keep switching until you get a good response (they are often too busy and return 249 without giving an error message) and book your test :)